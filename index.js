const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

var Excel = require('exceljs');

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
        workbook.xlsx.readFile(filename).then(function() {
    // edit worksheet
            var worksheet = workbook.getWorksheet("My Sheet");
            worksheet.getCell("A1") = rate;})
            .then(function() {
            return workbook.xlsx.writeFile(filename)
             }).then(function() {console.log("Done");});
        agent.add("thanks for your rating" + rate)
    }

    let intentMap = new Map();
    intentMap.set("testintent", sayHello)
    intentMap.set("rate fast", saveToDB)
    agent.handleRequest(intentMap)

}