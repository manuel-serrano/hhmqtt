/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/config.js                 */
/*    -------------------------------------------------------------    */
/*    Author      :  manuel serrano                                    */
/*    Creation    :  Tue Sep 27 14:19:15 2022                          */
/*    Last change :  Fri Jul 12 08:34:51 2024 (serrano)                */
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

/*---------------------------------------------------------------------*/
/*    cwd ...                                                          */
/*---------------------------------------------------------------------*/
const cwd = path.dirname(import.meta.url.toString().replace(/^file:\/\//, ""));

/*---------------------------------------------------------------------*/
/*    Default configuration                                            */
/*---------------------------------------------------------------------*/
export const configDefault = {
   version: readJson(cwd + "/../" + "package.json").version,
   verbose: 1,
   mqqtServer: "mqtt://localhost:1883",
   webPorts: { http: 7777 },
   webUsers: [ { name: "anonymous", services: "*", events: "*" } ]
}

/*---------------------------------------------------------------------*/
/*    User configuration                                               */
/*---------------------------------------------------------------------*/
const config = configDefault;

/*---------------------------------------------------------------------*/
/*    rcFile ...                                                       */
/*---------------------------------------------------------------------*/
let rcFile = false;

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
