/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/src/config.ts          */
/*    -------------------------------------------------------------    */
/*    Author      :  manuel serrano                                    */
/*    Creation    :  Tue Sep 27 14:19:15 2022                          */
/*    Last change :  Thu Apr  4 08:48:07 2024 (serrano)                */
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
   verbose: number;
}

/*---------------------------------------------------------------------*/
/*    cwd ...                                                          */
/*---------------------------------------------------------------------*/
const cwd = path.dirname(import.meta.url.toString().replace(/^file:\/\//, ""));

/*---------------------------------------------------------------------*/
/*    Default configuration                                            */
/*---------------------------------------------------------------------*/
export const configDefault = {
   version: readJson(cwd + "/../" + "package.json").version,
   server: "mqtt://localhost:1883",
   verbose: 1
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
