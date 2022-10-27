const winston = require("winston");
const { format } = winston;
var winstonFastRabbitMq = require("winston-fast-rabbitmq");
require("dotenv").config();
const config = require("../config/default");

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logstashConfig = {
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => {
      return `${msg.timestamp} - [${msg.level}] ${msg.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winstonFastRabbitMq(config.get("/rabbitmq")),
  ],
};

const logger = new winston.createLogger(logstashConfig);

module.exports = logger;
