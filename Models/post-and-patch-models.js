const { copy } = require('../app.js')
const db = require('../db/connection.js')

exports.insertNewComment = (newComment, articleId, author) => {
    
      if(isNaN(articleId)){
        return Promise.reject({ status: 400, msg: 'bad request' })
      }
    const query = `INSERT INTO comments(body, article_id, author)
    VALUES ($1, $2, $3)
    RETURNING*`
    const maxArticleQuery = `SELECT MAX(article_id) FROM articles;`

    return db.query(maxArticleQuery).then(({ rows }) => {
        const maxArticleId = rows[0].max

        if (articleId <= maxArticleId) {
            return db.query(query, [newComment, articleId, author])
                .then(({ rows }) => {
                    return rows
                })
             } 
            
        return Promise.reject({ status: 404, msg: 'article_id does not exist' })
                     
    })
}

    

