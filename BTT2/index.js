const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const payload = {
  id: 11,
  packet_no: 126,
  temperature: 30,
  humidity: 60,
  tds: 1100,
  pH: 5.0,
};

client.on("connect", function () {
  client.subscribe("/iot2021", function (err) {
    if (!err) {
      client.publish("/iot2021", JSON.stringify(payload));
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
