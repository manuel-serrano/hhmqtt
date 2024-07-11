/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/topics.mjs                */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Wed Jul 10 12:34:49 2024                          */
/*    Last change :  Wed Jul 10 12:34:57 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    ZB devices and their interfaces                                  */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    topics                                                           */
/*---------------------------------------------------------------------*/
export const topics = {
   "zigbee2mqtt/bridge/devices": { in: "newDevices" },
   "zigbee2mqtt/0x00124b00246cd6a7": { in: "switch1" },
   "zigbee2mqtt/0x00124b0024c27d98": { in: "plug1", out: "plug1Out" }
}

