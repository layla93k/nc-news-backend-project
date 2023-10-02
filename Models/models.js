const db = require('../db/connection.js')
const {readFile} = require("fs/promises")

exports.fetchAllTopics = () => {
    return db.query(`SELECT * FROM topics`).then(({rows})=>{
       return rows;
    })
}

exports.fetchAllEndpoints = () => {
    return readFile('./endpoints.json', "utf-8").then((file) => {
        const allEndPoints = JSON.parse(file)
        return allEndPoints
    })


}