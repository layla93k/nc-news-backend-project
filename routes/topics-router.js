const topicsRouter = require('express').Router();

const { getAllTopics} = require('../Controllers/topics-controllers.js')

topicsRouter.get('/topics', getAllTopics)

module.exports = topicsRouter;