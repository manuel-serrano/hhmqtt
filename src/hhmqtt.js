/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/hhmqtt.js                 */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 08:18:29 2024                          */
/*    Last change :  Fri Jul 12 07:50:31 2024 (serrano)                */
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
import { webServer } from "./web.js";

/*---------------------------------------------------------------------*/
/*    usage ...                                                        */
/*---------------------------------------------------------------------*/
function usage(status) {
   console.log("Usage hhmqtt [options] click|clicktmt");
   console.log("");
   console.log("Options:");
   console.log("  -h|--help   This message.");
   console.log("  --version   Display version.");
   console.log("  --noweb     Don'Do not start a web server.");
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
   
   // start the HTTP server
   let hop = args.noweb ? false : webServer();
   
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
	    // broadcast to web clients
	    if (hop) hop.setDevices(devices);
	    
	    // build the hiphop program accordingly
	    devices.forEach(d => {
	       if (d.definition) {
		  const id = `zigbee2mqtt/${d.friendly_name || d.ieee_address}`;
		  console.log(" ", d.definition.vendor, d.definition.model, id);
		  console.log("   ", d.definition.exposes.map(e => e.label));

		  if (example.topics[id] && example.topics[id].in) {
		     // we are interested by this device
		     if (cfg.verbose >= 1) {
			console.log("subscribing: ", id);
		     }
		     
		     client.subscribe(id);
		  }
		  
		  if (example.topics[id] && example.topics[id].out) {
		     const idset = id + "/set";

		     example.mach.addEventListener(example.topics[id].out, v => {
			if (cfg.verbose >= 1) {
			   console.log("publishing, idset: ", idset, "value:", JSON.stringify(v.nowval));
			}
			client.publish(idset, JSON.stringify(v.nowval));
		     });
		  }
	       }
	    });
	 }

	 // forward the MQTT message to Hop
	 if (hop) {
	    hop.broadcast("msg", example);
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

