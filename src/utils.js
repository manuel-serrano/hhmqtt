/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/utils.js                  */
/*    -------------------------------------------------------------    */
/*    Author      :  manuel serrano                                    */
/*    Creation    :  Thu Oct  6 18:40:09 2022                          */
/*    Last change :  Mon Jun 10 19:10:28 2024 (serrano)                */
/*    Copyright   :  2022-24 manuel serrano                            */
/*    -------------------------------------------------------------    */
/*    Utility functions                                                */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import * as fs from "fs";
export { readJson, writeJson };

/*---------------------------------------------------------------------*/
/*    readJson ...                                                     */
/*---------------------------------------------------------------------*/
function readJson(path) {
   try {
      const res = fs.readFileSync(path, { encoding: "utf8" });
      return JSON.parse(res);
   } catch(e) {
      console.error(`hhmqtt: cannot read json file "${path}"`);
      throw e;
   }
}

/*---------------------------------------------------------------------*/
/*    writeJson ...                                                    */
/*---------------------------------------------------------------------*/
function writeJson(path, json) {
   fs.writeFileSync(path, JSON.stringify(json));
}

