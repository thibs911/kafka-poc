'use strict';

const kafka = require('kafka-node');
const nodemailer = require('nodemailer');

const ConsumerGroup = kafka.ConsumerGroup;
const topics = 'message';
const options = {
    host: 'kafka:2181',  // zookeeper host omit if connecting directly to broker (see kafkaHost below)
    groupId: 'consumer-1',
    id: 'mail-service',
    sessionTimeout: 15000,
    // An array of partition assignment protocols ordered by preference.
    // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
    protocol: ['roundrobin'],
  
    // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
    // equivalent to Java client's auto.offset.reset
    fromOffset: 'latest', // default
  };
const consumer = new ConsumerGroup(options, topics);

let transporter = nodemailer.createTransport({
    host: 'mail-dev',
    port: 25,
    ignoreTLS: true,
})

let mailOptions = {
    from: 'kafka-poc@kafka-poc.com',
    to: 'test@test.com',
    subject: '[kafka-poc]: Notifications',
};


consumer.on('message', function (message) {
    console.log(message);
    const mail = Object.assign(mailOptions, { text: message.value });
    transporter.sendMail(mail, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('message sent: %s', info.messageId);
    })
    

});

consumer.on('error', function (err) {
    console.log('error', err);
});

process.on('SIGINT', function () {
    consumer.close(true, function () {
        process.exit();
    });
});