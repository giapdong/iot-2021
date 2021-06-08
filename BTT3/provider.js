const amqplib = require("amqplib");

const BROKER_HOST = "localhost";
const BROKER_USERNAME = "guest";
const BROKER_PASSWORD = "guest";
const BROKER_PORT = "5672";
const BROKER_QUEUE = "BTT3";

async function createChannel() {
  const conn = await amqplib.connect(`amqp://${BROKER_USERNAME}:${BROKER_PASSWORD}@${BROKER_HOST}:${BROKER_PORT}`);
  return conn.createChannel();
}

async function main() {
  const channel = await createChannel();
  publish(channel);
}

function publish(channel) {
  channel.assertQueue(BROKER_QUEUE, { durable: true, autoDelete: false }).then(function (ok) {
    return channel.sendToQueue(
      BROKER_QUEUE,
      Buffer.from(
        JSON.stringify({
          id: 11,
          packet_no: 126,
          temperature: 30,
          humidity: 60,
          tds: 1100,
          pH: 5.0
        })
      )
    );
  });
  console.log("Published");

  setTimeout(() => publish(channel), Math.random() * 1000 * 5);
}

main();
