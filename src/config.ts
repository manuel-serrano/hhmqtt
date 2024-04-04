/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/src/config.ts          */
/*    -------------------------------------------------------------    */
/*    Author      :  manuel serrano                                    */
/*    Creation    :  Tue Sep 27 14:19:15 2022                          */
/*    Last change :  Thu Apr  4 08:28:48 2024 (serrano)                */
/*    Copyright   :  2022-24 manuel serrano                            */
/*    -------------------------------------------------------------    */
/*    Hophhmqtt configuration                                         */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import * as fs from "fs";
import * as path from "path";
import { readJson } from "./utils.js";

export { config };
export { Configuration };

/*---------------------------------------------------------------------*/
/*    Configuration                                                    */
/*---------------------------------------------------------------------*/
interface Configuration {
   version: string;
   server: string;
}

/*---------------------------------------------------------------------*/
/*    Default configuration                                            */
/*---------------------------------------------------------------------*/
export const configDefault = {
   server: "mqtt://localhost:1883"
}

/*---------------------------------------------------------------------*/
/*    User configuration                                               */
/*---------------------------------------------------------------------*/
const config: Configuration = configDefault;

/*---------------------------------------------------------------------*/
/*    rcFile ...                                                       */
/*---------------------------------------------------------------------*/
let rcFile: false | string = false;

/*---------------------------------------------------------------------*/
/*    init ...                                                         */
/*---------------------------------------------------------------------*/
export function init() {
   rcFile = path.join(process.env.HOME, ".config", "hhmqtt", "hhmqttrc.json");

   if (fs.existsSync(rcFile)) {
      Object.assign(config, readJson(rcFile));
   }

   return config;
}
