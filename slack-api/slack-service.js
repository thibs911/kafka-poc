'use strict';
const kafka = require('kafka-node');
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = "test";

const ConsumerGroup = kafka.ConsumerGroup;
const topics = 'ultimate';
const options = {
    host: 'kafka:2181',  // zookeeper host omit if connecting directly to broker (see kafkaHost below)
    groupId: 'consumer-2',
    id: 'osef2',
    sessionTimeout: 15000,
    // An array of partition assignment protocols ordered by preference.
    // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
    protocol: ['roundrobin'],
  
    // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
    // equivalent to Java client's auto.offset.reset
    fromOffset: 'latest', // default
  };
const consumer = new ConsumerGroup(options, topics);

consumer.on('message', function (message) {
    console.log(message);
    web.chat.postMessage({ channel: conversationId, text: message.value })
        .then(res => {
            console.log('Message sent to Slack :', res.ts)
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
