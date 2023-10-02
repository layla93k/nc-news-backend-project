const app = require('../app.js')
const request = require("supertest")
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')

beforeEach(() => {
    return seed(data)
})

afterAll(()=>{
    db.end()
})

describe('GET /api/topics', ()=>{
    it('returns a 200 status code and an array of topic objects with the slug and description property', ()=>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body})=>{
            expect(body.length).toBe(3)
            body.forEach((topic)=>{
                expect(typeof topic.description).toBe('string')
                expect(typeof topic.slug).toBe('string')
            })
        })
    })
    it('GET:400 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
          .get('/api/not-a-route')
          .expect(400)
          .then(({body}) => {
            expect(body.msg).toBe('Bad request');
          });
})
})