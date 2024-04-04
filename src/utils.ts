/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/src/utils.ts           */
/*    -------------------------------------------------------------    */
/*    Author      :  manuel serrano                                    */
/*    Creation    :  Thu Oct  6 18:40:09 2022                          */
/*    Last change :  Thu Apr  4 13:27:18 2024 (serrano)                */
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
function readJson(path: string): any {
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
function writeJson(path: string, json: any): void {
   fs.writeFileSync(path, JSON.stringify(json));
}

