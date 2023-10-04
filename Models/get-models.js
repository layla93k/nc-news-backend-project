const db = require('../db/connection.js')
const { readFile } = require("fs/promises")

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then(({ rows }) => {
        return rows;
    })
}

exports.fetchAllEndpoints = () => {
    return readFile('./endpoints.json', "utf-8").then((file) => {
        const allEndPoints = JSON.parse(file)
        return allEndPoints
    })
}

exports.fetchArticleById = (article_id) => {
   return db.query(`SELECT * FROM articles WHERE articles.article_id = $1;`, [
    article_id
  ])
  .then(({rows})=>{
    if(rows.length === 0) {
        return Promise.reject({status: 404, msg: 'article_id does not exist'})
      }
      
    return rows
  })
   
  }


exports.fetchAllArticles = () => {
    const query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(articles.article_id) AS comment_count
    FROM articles
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`    
    return db.query(query).then(({rows})=>{
      return rows
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

      if(article_id <= maxArticleId){
      return commentsResult.rows
      }
      return Promise.reject({status: 404, msg: 'article_id does not exist'})
    })
  }
     
    

    
        
        
      
    
  
