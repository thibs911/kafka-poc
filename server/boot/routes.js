'use strict';

const kafka = require('kafka-node');
const bodyParser = require('body-parser');



module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.post('/api/messages', (req, res) => {

        var HighLevelProducer = kafka.HighLevelProducer;
        var KeyedMessage = kafka.KeyedMessage;
        var Client = kafka.Client;
        var client = new Client('kafka:2181', 'my-client-id', {
            sessionTimeout: 300,
            spinDelay: 100,
            retries: 0
        });
        // For this demo we just log client errors to the console.
        client.on('error', function (error) {
            console.error(error);
        });
        var producer = new HighLevelProducer(client);

        producer.on('ready', function () {
            var payload = [
             {   
                topic: 'ultimate',
                messages: ['Example pour So'],
                attributes: 1,
             }
            ];

            //Send payload to Kafka and log result/error
            producer.send(payload, function (error, result) {
                console.info('Sent payload to Kafka: ', payload);
                if (error) {
                    console.error(error);
                } else {
                    var formattedResult = result[0];
                    console.log('result: ', result)
                    client.close();
                }
            });
        });

        // For this demo we just log producer errors to the console.
        producer.on('error', function (error) {
            console.error(error);
        });
    });
};