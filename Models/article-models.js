const db = require('../db/connection.js')
const { readFile } = require("fs/promises")
const { fetchAllTopics } = require('../Models/topics-models.js')


exports.fetchAllEndpoints = () => {
  return readFile('./endpoints.json', "utf-8").then((file) => {
    const allEndPoints = JSON.parse(file)
    return allEndPoints
  })
}

exports.fetchArticleById = (article_id) => {

  return db.query(`SELECT articles.*, COUNT(comments.comment_id) AS comment_count
   FROM articles 
   LEFT JOIN comments on articles.article_id = comments.article_id
   WHERE articles.article_id = $1
   GROUP BY articles.article_id;`, [
    article_id
  ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'article_id does not exist' })
      }

      return rows

    })
}



exports.fetchAllArticles = (topicQuery, sortby, orderby = 'DESC') => {
  
   if(sortby === undefined && topicQuery === undefined) {
    let query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(articles.article_id) AS comment_count
    FROM articles GROUP BY articles.article_id ORDER BY articles.created_at DESC;`
    return db.query(query).then(({ rows }) => {
      return rows
    })
  } else if (topicQuery ) {
    return fetchAllTopics().then((topics) => {
      const validTopics = topics.map((topic) => topic.slug)

      if (validTopics.includes(topicQuery)) {

        let query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(articles.article_id) AS comment_count
    FROM articles`

        let values = []

        if (validTopics.includes(topicQuery)) {
          query += ` WHERE topic = $1`
          values.push(topicQuery)
        }

        query += ` GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`

        return db.query(query, values).then(({ rows }) => {
          return rows
        })

      }
      return Promise.reject({ status: 404, msg: 'invalid topic' })
    })
  } else if (sortby) {
    const validSortbyQueries = {
      title: 'title',
      topic: 'topic',
      author: 'author',
      body: 'body',
      created_at: 'created_at',
      votes: 'votes',
      article_img_url: 'img_url'
    }

    if (!(sortby in validSortbyQueries)) {
      return Promise.reject({ status: 400, msg: 'invalid sortby query' })
    }
    const descRegex = /^(desc)$/i
    const ascRegex = /^(asc)$/i
    if(ascRegex.test(orderby) === false && descRegex.test(orderby)=== false) {
      console.log('here')
  
      return Promise.reject({ status: 404, msg: 'not found' })
  
    }
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(articles.article_id) AS comment_count
    FROM articles GROUP BY articles.article_id ORDER BY articles.${validSortbyQueries[sortby]}, $1;`,[orderby])
    .then(({ rows }) => {
      return rows
    })
  
  }
}




