const mqtt = require("mqtt");
// const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const client = mqtt.connect("mqtt://localhost:1883");
const data = require('./data.json')
let index = -1;

const getIndex = () => {
  index++
  index = index == data.length ? 0 : index
  return index
}

const publish = () => {
  try {
    console.log('Sending to Broker...')
    client.publish("iot20202/parking-02", JSON.stringify(data[getIndex()]));
  } catch (error) {
    console.log('Cannot connect to MQTT Broker')
  }
}

client.on("connect", function () {
  setInterval(() => publish(), 3000);
});

client.on("message", function (topic, message) {
  // message is Buffer
  // console.log(message.toString());
  // client.end();
});

