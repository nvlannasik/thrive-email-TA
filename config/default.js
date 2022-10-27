require("dotenv").config();
const confidence = require("confidence");

const config = {
  $meta: "This file configures the plot device.",
  projectName: "thrive-ecommerce",
  rabbitmq: {
    host: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    exchange: process.env.RABBITMQ_EXCHANGE,
    routingKey: process.env.RABBITMQ_ROUTINGKEY,
    queue: process.env.RABBITMQ_QUEUE,
    vhost: process.env.RABBITMQ_VHOST,
    silent: true,
  },
};

const store = new confidence.Store(config);

exports.get = function (key) {
  return store.get(key);
};
