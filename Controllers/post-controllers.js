const {insertNewComment} = require('../Models/post-models.js')


exports.postNewComment = (req, res, next) => {
    const {article_id} = req.params
    const newComment = req.body.body
    const author = req.body.username
insertNewComment(newComment, article_id, author)
}