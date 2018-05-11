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

### Testing the app

Once you have made a valid compute ( 1 + 1 = 2 for example)
You can click on the button "Send To Kafka"

If everything is working,
You can see that your compute has been send to slack and mail

If you kill one of the service (docker-compose stop slack-service per example) and that you continue to spam the button "Send To Kafka", only the remaining service will receive them.
But if you bring back from the dead slack-service, (docker-compose start slack-service), it should receive all the computes that it missed



