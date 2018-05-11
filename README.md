#### kafka-poc

### Install Project

After cloning the project, you must execute the following command :
```
  yarn
```
or
```
  npm i
```

Once done, you will have to launch the dockers: 
```
  docker-compose up
```

Once all dockers are running and stabilized, you can run the following command to create the topic 'message' in kafka
```
  yarn kafka:topic
```
or (npm run)

:warning: If the command is not working, you manually do it yourself with
```
docker exec -it <kafka container id> kafka_2.8.0-0.8.1/bin/kafka-topics.sh --create --topic message --zookeeper kafka:2181 --replication-factor 1 --partitions 20
```

### Access the front

You can reach the calculator front at :
  https://localhost:8080/kafka-poc

(it's running under webback-dev...)

### Slack

You can reach slack at the following https://kafka-poc.slack.com
I can add as many person as you wish

### MailDev

MailDev can be accessed at this address : http://localhost:1080

### Kafka

You may have to restart kafka service when you lauching your first docker-compose up. I will have to investigate, but my guess is that Zookeeper in not instantiate when the 2 consumers are trying to connect. 
So, if you see message a like the following :  
```
 error { NO_NODE: Exception: NO_NODE[-101]
slack-service_1  |     at ConnectionManager.onSocketData (/code/node_modules/node-zookeeper-client/lib/ConnectionManager.js:570:35)
slack-service_1  |     at Socket.emit (events.js:180:13)
slack-service_1  |     at addChunk (_stream_readable.js:274:12)
slack-service_1  |     at readableAddChunk (_stream_readable.js:261:11)
slack-service_1  |     at Socket.Readable.push (_stream_readable.js:218:10)
slack-service_1  |     at TCP.onread (net.js:581:20)
slack-service_1  |   code: -101,
slack-service_1  |   name: 'NO_NODE',
slack-service_1  |   path: undefined,
slack-service_1  |   message: 'Exception: NO_NODE[-101]' }

```
It would be preferably to restart kafka
```
docker-compose restart kafka
```

### Testing the app

Once you have made a valid compute ( 1 + 1 = 2 for example)
You can click on the button "Send To Kafka"

If everything is working,
You can see that your compute has been send to slack and mail

If you kill one of the service (docker-compose stop slack-service per example) and that you continue to spam the button "Send To Kafka", only the remaining service will receive them.
But if you bring back from the dead slack-service, (docker-compose start slack-service), it should receive all the computes that it missed



