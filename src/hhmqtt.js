/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/hhmqtt.js                 */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 08:18:29 2024                          */
/*    Last change :  Tue Jun 11 08:11:42 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    hhmqtt example                                                   */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import minimist from 'minimist';
import * as config from "./config.js";
import mqtt from "mqtt";
import { click } from "./click.js";
import { clicktmt } from "./clicktmt.js";

/*---------------------------------------------------------------------*/
/*    usage ...                                                        */
/*---------------------------------------------------------------------*/
function usage(status) {
   console.log("Usage hhmqtt [options] click|clicktmt");
   console.log("");
   console.log("Options:");
   console.log("  -h|--help          This message.");
   console.log("  --version          Display version.");
   process.exit(status);
}

/*---------------------------------------------------------------------*/
/*    main ...                                                         */
/*---------------------------------------------------------------------*/
function main(argv) {
   const args = minimist(argv, {});
   let example;
   
   if (args.h || args.help) {
      usage(0);
   }
   
   if (args.version) {
      console.log("HHMQTT v" + config.configDefault.version);
      usage(0);
   }

   const cfg = config.init();

   if (args.v || args.verbose) {
      cfg.verbose = args.v;
   }

   switch (args._[2]) {
      case "click": example = click; break;
      case "clicktmt": example = clicktmt; break;
      default: usage(1);
   }
   
   // start the MQTT clien
   let client = mqtt.connect(cfg.server);
   
   // bind the event handler
   client.on("connect", () => {
      client.subscribe("zigbee2mqtt/bridge/devices");

      console.log("client connect to", cfg.server);
      client.on("message", (topic, message) => {
	 if (cfg.verbose >= 2) {
	    console.log("receive message: ", topic);
	 }
		     
	 if (topic === "zigbee2mqtt/bridge/devices") {
	    const devices = JSON.parse(message.toString());

	    console.log("== devices");

	    // build the hiphop program accordingly
	    devices.forEach(d => {
	       if (d.definition) {
		  const id = `zigbee2mqtt/${d.ieee_address}`;
		  console.log(" ", d.definition.vendor, d.definition.model, id);
		  console.log("   ", d.definition.exposes.map(e => e.label));

		  if (example.topics[id]) {
		     // we are interested by this device
		     if (cfg.verbose >= 1) {
			console.log("subscribing: ", id);
		     }
		     
		     client.subscribe(id);
		     if (example.topics[id].out) {
			const idset = id + "/set";
			example.mach.addEventListener(example.topics[id].out, v => client.publish(idset, JSON.stringify(v.nowval)));
		     }
		  }
	       }
	    });
	 }

	 // forward the MQTT message to HipHop
	 if (example.topics[topic]?.in) {
	    example.mach.react({[example.topics[topic].in]: JSON.parse(message.toString())});
	 } else {
	    console.log("unhandled message", topic, message.toString());
	 }
      });
   });

   // init the example.machine
   example.mach.react();
}

main(process.argv);

