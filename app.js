const express = require("express");
const data = require('./db/data/test-data/index.js')

const {getAllUsers} = require ('./Controllers/users-controllers.js')
const { getAllEndpoints, getArticleById, getAllArticles} = require('./Controllers/articles-controllers.js')
const { getAllTopics} = require('./Controllers/topics-controllers.js')
const {deleteComment, postNewComment, patchVotes, getArticleCommentsById} = require ('./Controllers/comments-controllers.js')


const { handleCustomErrors, handleSQLErrors } = require('./Error handling/error-handling.js');

const app = express()

app.use(express.json())

app.get('/api/topics', getAllTopics)
app.get('/api', getAllEndpoints)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getArticleCommentsById)
app.get('/api/users', getAllUsers)


app.post('/api/articles/:article_id/comments', postNewComment)

app.delete('/api/comments/:comment_id', deleteComment)

app.patch('/api/articles/:article_id', patchVotes)



app.use(handleCustomErrors)
app.use(handleSQLErrors)
app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Not found' })

})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error' })
})
module.exports = app;