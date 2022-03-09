const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

var Excel = require('exceljs');
var workbook = new Excel.Workbook

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
        workbook.xlsx.readFile('rating.xlsx').then(function(){
            var worksheet = workbook.getWorksheet(1)
            var row =[rate]
            worksheet.addRow(row)
            return workbook.xlsx.writeFile('rating.xlsx')})
        agent.add("thanks for your rating check 1 " + rate)
    }

    let intentMap = new Map();
    intentMap.set("testintent", sayHello)
    intentMap.set("rate fast", saveToDB)
    agent.handleRequest(intentMap)

}