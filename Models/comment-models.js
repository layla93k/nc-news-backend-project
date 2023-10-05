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
        
        exports.fetchArticleCommentsById = (article_id) => {
            const query = `SELECT comments.comment_id, 
              comments.votes, comments.created_at, comments.author, comments.body, comments.article_id
              FROM comments
              WHERE comments.article_id = $1
              ORDER BY comments.created_at DESC;`
          
            const maxArticleQuery = `SELECT MAX(article_id) FROM articles;`
          
            return Promise.all([
              db.query(query, [article_id]),
              db.query(maxArticleQuery)
            ]).then(([commentsResult, maxArticleNum]) => {
          
              const maxArticleId = maxArticleNum.rows[0].max
          
              if (article_id <= maxArticleId) {
                return commentsResult.rows
              }
              return Promise.reject({ status: 404, msg: 'article_id does not exist' })
            })
          }
          
          
          