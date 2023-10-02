const express = require("express");
const data = require('./db/data/test-data/index.js')
const {getAllTopics, getAllEndpoints} = require('./Controllers/controller.js')

const app = express()



app.get('/api/topics', getAllTopics)
app.get('/api', getAllEndpoints)

app.all('/*', (req, res, next) => {
    res.status(400).send({msg: 'Bad request'})
})

app.use((err,req, res, next) => {
res.status(500).send({msg: 'Internal server error'})
})

module.exports = app;