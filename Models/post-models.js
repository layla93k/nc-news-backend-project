const db = require('../db/connection.js')

exports.insertNewComment = (newComment, articleId, author) => {
    
    return db.query(`INSERT INTO comments(body, article_id, author)
    VALUES ($1, $2, $3)
    RETURNING*`, [newComment, articleId, author]).then(({rows})=>{
        console.log(rows)
    })

}