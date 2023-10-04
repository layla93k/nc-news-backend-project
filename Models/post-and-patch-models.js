const { copy } = require('../app.js')
const db = require('../db/connection.js')
const { fetchArticleById } = require('./get-models.js')

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