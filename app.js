const express = require("express");
const data = require('./db/data/test-data/index.js')

const { getAllTopics, getAllEndpoints, getArticleById, getAllArticles } = require('./Controllers/get-controllers.js')
const {postNewComment} = require ('./Controllers/post-controllers.js')
const { handleCustomErrors, handleSQLErrors } = require('./Error handling/error-handling.js');

const app = express()

app.use(express.json())

app.get('/api/topics', getAllTopics)
app.get('/api', getAllEndpoints)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getAllArticles)


app.post('/api/articles/:article_id/comments', postNewComment)




//Error handling
app.use(handleCustomErrors)
app.use(handleSQLErrors)
app.all('/*', (req, res, next) => {
    res.status(400).send({ msg: 'Bad request' })

})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error' })
})
module.exports = app;