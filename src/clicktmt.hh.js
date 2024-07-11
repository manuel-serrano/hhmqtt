/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/clicktmt.hh.js            */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 09:07:35 2024                          */
/*    Last change :  Wed Jul 10 12:35:23 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    HipHop MQTT example                                              */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import { ReactiveMachine } from "@hop/hiphop";
import { timeout } from "@hop/hiphop/modules/timeout.js";
import { topics } from "./topics.js";
export { clicktmt };

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
      if (switch1.nowval.action === "single") {
	 emit plug1Out(stateFlip(plug1.nowval));
      } else if (switch1.nowval.action === "double") {
	 emit plug1Out({ state: "ON" });
	 run timeout(2 * 1000) {};
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
