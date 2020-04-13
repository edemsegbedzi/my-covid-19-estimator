import express from "express"
import bodyParser from "body-parser"
import  xml from 'object-to-xml'
import fs from 'fs'

import covid19ImpactEstimator from '../src/estimator.js'
const app = express()
const port = 3000
const fileName = 'log.txt'

const log = (req,res) => {
    const duration = Date.now() - req.body.start;
    fs.appendFile(fileName,`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms\n`, function (err) {
        if (err) return console.log(err);
    })
}

app.get("/api/v1/on-covid-19/logs", (req,res) => {    
    const logs = fs.readFileSync(fileName);
    res.type("text/plain")
    return res.send(logs)
})


app.use(bodyParser.json({ extended: true }));

app.use("/", (req,res,next) => {
    req.body.start = Date.now()
    next();
})

app.post(['/api/v1/on-covid-19','/api/v1/on-covid-19/json'], (req, res,next) => {
    const body = req.body;
    res.on("finish",() => {
       log(req,res)
    })
    return res.json(covid19ImpactEstimator(req.body));

})

app.post('/api/v1/on-covid-19/xml', (req, res,next) => {
    res.type('application/xml');
    log(req,res)
    return res.send(xml(covid19ImpactEstimator(req.body)))
})


app.use((req,res) => {
    res.status(400)
    log(req,res)
   return res.send("Not found")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))