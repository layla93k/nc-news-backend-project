const db = require('../db/connection.js')
const {fetchArticleById} = require('./article-models.js')

exports.insertNewComment = (newComment, articleId, author) => {
   
    return fetchArticleById(articleId).then((article) => {

        const query = `INSERT INTO comments(body, article_id, author)
    VALUES ($1, $2, $3)
    RETURNING*`

        return db.query(query, [newComment, articleId, author])
            .then(({ rows }) => {
                return rows
            })
    })
}


exports.removeComment = (commentId) => {
    
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [commentId])
    .then(({rows})=>{
        
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'comment_id does not exist'})
        }
        return rows
    })
        
    }
    
    exports.editVotes = (articleId, numVotes) => {

        return fetchArticleById(articleId).then((article) => {

            return db.query(`UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING*;`, [numVotes, articleId]).then(({ rows }) => {
              return rows
            })
          })
        }
        
        