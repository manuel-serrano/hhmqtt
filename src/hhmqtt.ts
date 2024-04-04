/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/src/hhmqtt.ts          */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 08:18:29 2024                          */
/*    Last change :  Thu Apr  4 10:00:31 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    hhmqtt example                                                   */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import mqtt from "mqtt";
import minimist from 'minimist';
import * as config from "./config.js";
import { mach } from "./mqtt.js";

/*---------------------------------------------------------------------*/
/*    main ...                                                         */
/*---------------------------------------------------------------------*/
function main(argv) {
   const args = minimist(argv, {});
   
    if (args.h || args.help) {
      console.log("Usage gallery [options] [dir]");
      console.log("");
      console.log("Options:");
      console.log("  -h|--help          This message.");
      console.log("  --version          Display version.");
      process.exit(0);
   }
   
   if (args.version) {
      console.log("Gallery v" + config.configDefault.version);
      process.exit(0);
   }

   const cfg = config.init();

   if (args.v || args.verbose) {
      cfg.verbose = args.v;
   }

   let client = mqtt.connect(cfg.server);

   client.on("connect", () => {
      console.log("connected...");
      client.subscribe("zigbee2mqtt/bridge/devices");
      client.publish("presence", "Hello mqtt");
   });

   mach.react();
   
   client.on("message", (topic, message) => {
      console.log("got ", topic);
      mach.react({message: {topic, message}});
   });

}

main(process.argv);

