const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
var sheetdb = require('sheetdb-node');

// create a config file
var config = {
  address: '8jb1q0tui9ikn',
};

// Create new client
var client = sheetdb(config);


const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function sayHello(agent){
        agent.add("hi, this response is coming from heroku")
    }

    function saveToDB(agent) {
        const rate = request.body.queryResult.parameters.number;
        client.create({ rating: rate, time:Date.now }).then(function(data) {
            console.log(data);
          }, function(err){
            console.log(err);
          });
        agent.add("thanks for your rating" + rate)
    }

    let intentMap = new Map();
    intentMap.set("testintent", sayHello)
    intentMap.set("rate fast", saveToDB)
    agent.handleRequest(intentMap)

}