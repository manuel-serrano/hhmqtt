/*=====================================================================*/
/*    serrano/prgm/project/hhmqtt/hhmqtt/src/web.hop.js                */
/*    -------------------------------------------------------------    */
/*    Author      :  Manuel Serrano                                    */
/*    Creation    :  Wed Jul 10 12:38:53 2024                          */
/*    Last change :  Fri Jul 12 07:48:48 2024 (serrano)                */
/*    Copyright   :  2024 Manuel Serrano                               */
/*    -------------------------------------------------------------    */
/*    MQTT web interface                                               */
/*=====================================================================*/

/*---------------------------------------------------------------------*/
/*    The module                                                       */
/*---------------------------------------------------------------------*/
import { Hop } from "@hop/hop";
import { config } from "./config.js";

export { webServer };

/*---------------------------------------------------------------------*/
/*    hhmqtt                                                           */
/*---------------------------------------------------------------------*/
function hhmqtt() {
   return <html>
      <script type="module">
         import { server, TABLE, TD, TR } from ${this.hop.Resolver().url("./client.mjs")};

         function devicesToHtml(devices) {
            return <table>
               ${devices.map(d => <tr>
		  <td>${d.ieee_address}</td><td>${d.friendly_name}</td><td>${d.definition?.description || ""}</td>
		  </tr>)}
	    </table>;
	 }

         function setDevices(devices) {
            if (devices) {
               const con = document.getElementById("devices");
	       con.appendChild(devicesToHtml(devices));
	    }
	 }
   
         server.addEventListener("msg", e => {
            const con = document.getElementById("console");
	    con.innerHTML= con.innerHTML + "<br/>" + e.value;
	 });
         server.addEventListener("devices", e => setDevices(e.value));

         setDevices(${this.hop.devices});

      </script>

      <h1>HHMQTT</h1>
      <h2>devices</h2>
      <div id="devices">&nbsp;</div>
      <h2>console</h2>
      <div id="console">&nbsp;</div>
      
      <button onclick=~{${PingDate}().post()}>ping</button>
   </html>;
}


/*---------------------------------------------------------------------*/
/*    PingDate ...                                                     */
/*---------------------------------------------------------------------*/
let PingDate;

/*---------------------------------------------------------------------*/
/*    webServer ...                                                    */
/*---------------------------------------------------------------------*/
function webServer() {
   const hop = new Hop({ ports: config.webPorts, users: config.webUsers });
   const svc = hop.Service(hhmqtt);
   hop.listen().then(() => console.log(`${svc()} ready...`));

   hop.setDevices = devices => {
      // store the device list for future clients
      hop.devices = devices;
      
      // notify the clients already connected
      hop.broadcast("devices", devices);
   };
   
   PingDate = hop.Service(() => {
      hop.broadcast("msg", Date());
   });
			
   return hop;
}
   
