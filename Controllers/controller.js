const {fetchAllTopics} = require('../Models/models.js')


exports.getAllTopics = (req, res, next) => {
    fetchAllTopics().then((topics) => {
        res.status(200).send(topics)
    }).catch((err)=>{
            console.log(err)
            next(err)
    })
}