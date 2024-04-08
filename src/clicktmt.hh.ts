/*=====================================================================*/
/*    serrano/prgm/project/hiphop/hhmqtt/hhmqtt/src/clicktmt.hh.ts     */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 09:07:35 2024                          */
/*    Last change :  Mon Apr  8 10:14:15 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    HipHop MQTT example                                              */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import { ReactiveMachine } from "@hop/hiphop";
import { timeout } from "@hop/hiphop/modules/timeout.js";
export { clicktmt };

/*---------------------------------------------------------------------*/
/*    Topics ...                                                       */
/*---------------------------------------------------------------------*/
interface Topics {
   [propName: string]: { in?: string; out?: string; }
}

/*---------------------------------------------------------------------*/
/*    topics                                                           */
/*---------------------------------------------------------------------*/
//const topics: Topics = {
const topics = {
   "zigbee2mqtt/bridge/devices": { in: "newDevices" },
   "zigbee2mqtt/0x00124b00246cd6a7": { in: "switch1" },
   "zigbee2mqtt/0x00124b0024c27d98": { in: "plug1", out: "plug1Out" }
}

/*---------------------------------------------------------------------*/
/*    stateFlip ...                                                    */
/*---------------------------------------------------------------------*/
function stateFlip(v) {
   if (!v) {
      return { state: "ON" };
   } else if (v.state === "ON") {
      return { state: "OFF" };
   } else {
      return { state: "ON" };
   }
}
/*---------------------------------------------------------------------*/
/*    mqtt ...                                                         */
/*---------------------------------------------------------------------*/
const mqtt = hiphop module(cfg) {
   in ... ${Object.keys(topics).filter(k => topics[k].in).map(k => topics[k].in)};
   out ... ${Object.keys(topics).filter(k => topics[k].out).map(k => topics[k].out)};
   
   every (switch1.now) {
      pragma { console.log("switch1", switch1.nowval); }
      if (switch1.nowval.action === "single") {
	 emit plug1Out(stateFlip(plug1.nowval));
      } else if (switch1.nowval.action === "double") {
	 pragma { console.log("switch on..."); }
	 emit plug1Out({ state: "ON" });
	 run timeout(2 * 1000) {};
	 pragma { console.log("switch off..."); }
	 emit plug1Out({ state: "OFF" });
      }
   }
}

/*---------------------------------------------------------------------*/
/*    mach ...                                                         */
/*---------------------------------------------------------------------*/
const mach = new ReactiveMachine(mqtt, { name: "mqtt", sweep: false });

/*---------------------------------------------------------------------*/
/*    click ...                                                        */
/*---------------------------------------------------------------------*/
const clicktmt = { mach, topics };
