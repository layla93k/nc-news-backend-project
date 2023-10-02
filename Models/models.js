const db = require('../db/connection.js')

exports.fetchAllTopics = () => {
    console.log('in model')
    return db.query(`SELECT * FROM topics`).then(({rows})=>{
       return rows;
    })
}