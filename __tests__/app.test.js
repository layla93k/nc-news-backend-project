const app = require('../app.js')
const request = require("supertest")
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    db.end()
})

describe('GET /api/topics', () => {
    it('returns a 200 status code and an array of topic objects with the slug and description property', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                expect(body.topics.length).toBe(3)
                body.topics.forEach((topic) => {
                    expect(typeof topic.description).toBe('string')
                    expect(typeof topic.slug).toBe('string')
                })
            })
    })
    it('GET:400 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/api/not-a-route')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    })
})

describe.only('GET /api', () => {
    it('returns a 200 status code and a JSON object describing all the available endpoints on this API', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({ body }) => {
                expect(typeof body).toBe('object')
                expect(body.hasOwnProperty('availableEndpoints')).toBe(true)
                expect(typeof body.availableEndpoints).toBe('object');
                (Object.values(body.availableEndpoints)).forEach((endpoint) => {
                    expect(typeof endpoint.description).toBe('string')
                    expect(typeof endpoint.queries).toBe('object')
                    expect(typeof endpoint.exampleResponse).toBe('object')
                })


            })
    })
    it('GET:400 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/not-a-route')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
    })
})

describe.only('GET /api/articles/:article_id', () => {
    it('returns a 200 status code and an article object depending on which article id is specified in the endpoint', () => {
        return request(app)
            .get(`/api/articles/3`)
            .expect(200)
            .then(({ body }) => {
                expect(typeof body).toBe('object')
                expect(body.article[0].title).toBe("Eight pug gifs that remind me of mitch")
                expect(body.article[0].article_id).toBe(3)
                expect(body.article[0].author).toBe("icellusedkars")
                expect(body.article[0].body).toBe("some gifs")
                expect(body.article[0].created_at).toBe('2020-11-03T09:12:00.000Z')
                expect(body.article[0].votes).toBe(0)
                expect(body.article[0].article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
            })
           
          })
          test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
            return request(app)
              .get('/api/articles/1111')
              .expect(404)
              .then(({body}) => {
                expect(body.msg).toBe('article does not exist');
              });
          });
          test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
            return request(app)
              .get('/api/articles/not-an-id')
              .expect(400)
              .then((response) => {
                expect(response.body.msg).toBe('Bad request');
              });
    })
})
