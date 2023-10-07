
const {fetchAllEndpoints, fetchArticleById, fetchAllArticles, fetchArticleCommentsById, editVotes, insertNewArticle} = require('../Models/article-models.js')
const { response } = require('../app.js')
const { paginateData } = require('../db/seeds/utils.js')



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
      if(req.query.p  === undefined && req.query.limit  === undefined) {
       const {sortby} = req.query
    const {topic} = req.query
    const {orderby} = req.query
    fetchAllArticles(topic, sortby, orderby).then((articles)=>{
        res.status(200).send({articles: articles})
    }).catch((err) => {
       next(err)
    })
  } else {
    
    const pageNum = parseInt(req.query.p) || 1
    const responseLimit = parseInt(req.query.limit) || 10 
   
    fetchAllArticles().then((articles)=>{
        const paginatedArticles = paginateData(articles, pageNum, responseLimit)
       console.log(paginatedArticles)
        res.status(200).json(paginatedArticles)
    })
  }
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

  exports.postNewArticle = (req, res, next)=>{
    const newArticle = req.body
   
    insertNewArticle(newArticle).then((newArticle)=>{
        res.status(201).send({yourNewArticle: newArticle[0]})
    }).catch((err) => {
        next(err)
    })
  }