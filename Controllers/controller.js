
const { fetchAllTopics, fetchAllEndpoints, fetchArticleById, fetchAllArticles, fetchArticleCommentsById } = require('../Models/models.js')



exports.getAllTopics = (req, res, next) => {
    fetchAllTopics().then((topics) => {
        res.status(200).send({ topics: topics })
    }).catch((err) => {
        next(err)
    })
}

exports.getAllEndpoints = (req, res, next) => {
    fetchAllEndpoints().then((endpoints) => {
        res.status(200).send({ availableEndpoints: endpoints })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleById(article_id).then((article) => {
        res.status(200).send({article: article})
    }).catch((err) => {
       next(err)
    })

}

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles().then((articles)=>{
        res.status(200).send({articles: articles})
    }).catch((err) => {
       next(err)
    })

}

exports.getArticleCommentsById = (req, res, next) => {
    const {article_id} = req.params
    fetchArticleCommentsById(article_id).then((comments) => {
        res.status(200).send({comments: comments})
    }).catch((err) => {
        next(err)
     })
}