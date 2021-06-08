const amqplib = require("amqplib");

const BROKER_HOST = "localhost";
const BROKER_USERNAME = "guest";
const BROKER_PASSWORD = "guest";
const BROKER_PORT = "5672";
const BROKER_QUEUE = "BTT3";

async function createChannel() {
  const conn = await amqplib.connect(
    `amqp://${BROKER_USERNAME}:${BROKER_PASSWORD}@${BROKER_HOST}:${BROKER_PORT}`
  );
  return conn.createChannel();
}

async function main() {
  const channel = await createChannel();
  setInterval(() => {
    subscribe(channel);
    console.log("subscribe");
  }, 1000);
}

function subscribe(channel) {
  return channel
    .assertQueue(BROKER_QUEUE, { durable: true, autoDelete: false })
    .then(function (ok) {
      return channel.consume(BROKER_QUEUE, function (msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          channel.ack(msg);
        }
      });
    });
}

main();
