/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/hhmqtt.hh.ts           */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 08:18:29 2024                          */
/*    Last change :  Thu Apr  4 08:30:25 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    hhmqtt example                                                   */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import mqtt from "mqtt";
import minimist from 'minimist';
import { ReactiveMachine } from "@hop/hiphop";
import config from "../dist/config.js";

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

   if (args.v || args.verbose) {
      hopConfig.verbose = args.v;
   }

   const cfg = config.init();

   let client = mqtt.connect(cfg.server);
}


