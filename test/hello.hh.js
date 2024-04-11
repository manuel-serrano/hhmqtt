import * as hh from "@hop/hiphop";
import * as config from "../dist/config.js";
import mqtt from "mqtt";

describe('HHMQTT', function () {
  describe('hello()', function () {
    it('mqtt connection', async  () => {
       const cfg = config.init();
       const client = mqtt.connect(cfg.server);
       return new Promise((res, rej) => {
	  client.on("connect", () => res(true));
	  client.on("error", () => rej(true));
       });
    });
  });
});
