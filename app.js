const express = require("express");
const data = require('./db/data/test-data/index.js')
const {getAllTopics} = require('./Controllers/controller.js')

const app = express()

app.use(express.json())

app.get('/api/topics', getAllTopics)


app.all('/*', (req, res, next) => {
    res.status(400).send({msg: 'Bad request'})
})

module.exports = app;