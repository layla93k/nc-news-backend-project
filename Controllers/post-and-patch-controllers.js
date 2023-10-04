const {insertNewComment} = require('../Models/post-and-patch-models.js')


exports.postNewComment = (req, res, next) => {
    const {article_id} = req.params
    const newComment = req.body.body
    const author = req.body.username
insertNewComment(newComment, article_id, author)
.then((newComment)=>{
res.status(201).send({yourNewComment: newComment[0].body})
})
.catch((err) => {
    next(err)
})
}
