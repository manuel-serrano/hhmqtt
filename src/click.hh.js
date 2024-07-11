/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/click.hh.js               */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Thu Apr  4 09:07:35 2024                          */
/*    Last change :  Wed Jul 10 12:34:32 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    HipHop MQTT                                                      */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import { ReactiveMachine } from "@hop/hiphop";
import { topics } from "./topics.js";
export { click };

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
      emit plug1Out(stateFlip(plug1.nowval));
   }
}

/*---------------------------------------------------------------------*/
/*    mach ...                                                         */
/*---------------------------------------------------------------------*/
const mach = new ReactiveMachine(mqtt, { name: "mqtt", sweep: false });

/*---------------------------------------------------------------------*/
/*    click ...                                                        */
/*---------------------------------------------------------------------*/
const click = { mach, topics };
