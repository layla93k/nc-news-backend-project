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
        return Promise.reject({status: 404, msg: 'article does not exist'})
      }
    return rows
  })
    
}