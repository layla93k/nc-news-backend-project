const commentsRouter = require('express').Router();

const {deleteComment, postNewComment, patchVotes, getArticleCommentsById} = require ('../Controllers/comments-controllers.js')


commentsRouter.get('/articles/:article_id/comments', getArticleCommentsById)

commentsRouter.post('/articles/:article_id/comments', postNewComment)

commentsRouter.delete('/comments/:comment_id', deleteComment)

commentsRouter.patch('/articles/:article_id', patchVotes)

module.exports = commentsRouter;