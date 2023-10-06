const articleRouter = require('express').Router();

const { getAllEndpoints, getArticleById, getAllArticles, postNewArticle} = require('../Controllers/articles-controllers.js')


articleRouter.get('', getAllEndpoints)
articleRouter.get('/articles/:article_id', getArticleById)
articleRouter.get('/articles', getAllArticles)
articleRouter.post('/articles', postNewArticle)

module.exports = articleRouter;


