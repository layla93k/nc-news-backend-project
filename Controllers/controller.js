const { fetchAllTopics, fetchAllEndpoints } = require('../Models/models.js')


exports.getAllTopics = (req, res, next) => {
    fetchAllTopics().then((topics) => {
        res.status(200).send({ topics: topics })
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}


exports.getAllEndpoints = (req, res, next) => {
    fetchAllEndpoints().then((endpoints) => {
        res.status(200).send({ availableEndpoints: endpoints })
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}