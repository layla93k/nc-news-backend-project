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
    it('GET:404 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/api/not-a-route')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
    })
})

describe('GET /api', () => {
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
    it('GET:404 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/not-a-route')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
    })
})


describe('GET /api/articles/:article_id', () => {
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
                expect(body.msg).toBe('article_id does not exist');
              });
          });
          test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
            return request(app)
              .get('/api/articles/not-an-id')
              .expect(400)
              .then((response) => {
                expect(response.body.msg).toBe('bad request');
              });
    })
})

describe('GET /api/articles', () => {
    it('returns a 200 status code and responds with an articles array of article objects', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                expect(body.articles.length).toBe(13)
                body.articles.forEach((article) => {
                    expect(typeof article.author).toBe('string')
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.article_id).toBe('number')
                    expect(typeof article.topic).toBe('string')
                    expect(typeof article.created_at).toBe('string')
                    expect(typeof article.votes).toBe('number')
                    expect(typeof article.article_img_url).toBe('string')
                    expect(typeof article.comment_count).toBe('string')
                }) 
                expect(body.articles).toBeSortedBy('created_at', {
                    descending: true,
                    coerce: true,
                  });

            })
    })
    it('GET:404 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/api/not-a-route')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
    })
})

describe('GET /api/articles/:article_id', () => {
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
                expect(body.msg).toBe('article_id does not exist');
              });
          });
          test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
            return request(app)
              .get('/api/articles/not-an-id')
              .expect(400)
              .then((response) => {
                expect(response.body.msg).toBe('bad request');
              });
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    it('returns a 201 status code and the comment that is posted at the specific article_id, where the request only accepts a body with a username and body property', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'Testing my post endpoint.'
        }
       return request(app)
       .post('/api/articles/4/comments')
       .send(newComment)
       .expect(201)
       .then(({body}) =>{
        expect(body).toEqual({ yourNewComment: 'Testing my post endpoint.'})
       })
    })
    it('POST: returns 400 status code if there is a malformed body, i.e it is missing required fields', ()=>{
        const newComment = {}
    return request(app)
    .post('/api/articles/4/comments')
    .send(newComment)
    .expect(400)
    .then(({body})=>{
        expect(body.msg).toBe('bad request')
    })
    })
    it('POST: returns 400 status code if there is invalid properties in the body', ()=>{
        const newComment = {
            rating: 10,
            nickname: 'butter'
        }
    return request(app)
    .post('/api/articles/4/comments')
    .send(newComment)
    .expect(400)
    .then(({body})=>{
        expect(body.msg).toBe('bad request')
    })
})
})
