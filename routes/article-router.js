const articleRouter = require('express').Router();

const { getAllEndpoints, getArticleById, getAllArticles} = require('../Controllers/articles-controllers.js')


articleRouter.get('', getAllEndpoints)
articleRouter.get('/articles/:article_id', getArticleById)
articleRouter.get('/articles', getAllArticles)

module.exports = articleRouter;


