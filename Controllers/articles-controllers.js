
const {fetchAllEndpoints, fetchArticleById, fetchAllArticles, fetchArticleCommentsById, editVotes} = require('../Models/article-models.js')



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
    const {topic} = req.query
    fetchAllArticles(topic).then((articles)=>{
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

exports.patchVotes = (req, res, next) => {
    const {article_id} = req.params
  const incVoteNum = req.body.inc_votes
  editVotes(article_id, incVoteNum).then((editedArticle)=>{
    console.log(editedArticle)
      res.status(200).send({updatedArticle: editedArticle[0] })
  })
  .catch((err) => {
      next(err)
  })
  }
