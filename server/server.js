'use strict';
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.post('/api/messages', (req, res) => {

  const HighLevelProducer = kafka.HighLevelProducer;
  const Client = kafka.Client;
  const client = new Client('kafka:2181', 'my-client-id', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 0
  });
  // For this demo we just log client errors to the console.
  client.on('error', (error) => {
    console.error(error); // eslint-disable-line
  });
  const producer = new HighLevelProducer(client);

  producer.on('ready', () => {
    const payload = [
      {
        topic: 'message',
        messages: [req.body.message],
        attributes: 1
      }
    ];

    //Send payload to Kafka and log result/error
    producer.send(payload, (error, result) => {
      console.info('Sent payload to Kafka: ', payload); // eslint-disable-line
      if (error) {
        console.error(error); // eslint-disable-line
        res.status(500);  // eslint-disable-line
        res.send({ message: 'Oups, something went wrong'});

      } else {
        console.log('result: ', result) // eslint-disable-line
        client.close();
        res.send({ message: 'Send To Kafka' });
      }
    });
  });

  // For this demo we just log producer errors to the console.
  producer.on('error', (error) => {
    console.error(error); // eslint-disable-line
  });
});


app.listen(3000, () => { // eslint-disable-line
  console.log('listening on 3000'); // eslint-disable-line
});
