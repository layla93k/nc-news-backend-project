const {fetchAllTopics} = require('../Models/topics-models.js')

exports.getAllTopics = (req, res, next) => {
    fetchAllTopics().then((topics) => {
        res.status(200).send({ topics: topics })
    }).catch((err) => {
        next(err) 
    })
}