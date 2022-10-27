var nodemailer = require("nodemailer");
const ampq = require("amqplib/callback_api");
const logger = require("./utils/logger");
require("dotenv").config();

//CONNECTION TO GMAIL
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

ampq.connect(
  {
    protocol: "amqp",
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
  },
  (err, conn) => {
    conn.createChannel((err, ch) => {
      const queue = process.env.RABBITMQ_QUEUE_EMAIL;
      ch.assertQueue(queue, { durable: false });
      ch.consume(queue, (msg) => {
        console.log(msg.content.toString());
        transporter.sendMail(
          JSON.parse(msg.content.toString()),
          (err, info) => {
            if (err) throw err;
            logger.info(`Email sent: ${info.response}`);
          }
        );
        ch.ack(msg);
      });
    });
    logger.info(`Waiting for messages in ${process.env.RABBITMQ_QUEUE_EMAIL}`);
  }
);
