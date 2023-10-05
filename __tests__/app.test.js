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

})

describe('GET /api/articles/:article_id', () => {
    it('returns a 200 status code and an article object depending on which article id is specified in the endpoint', () => {
        return request(app)
            .get(`/api/articles/3`)
            .expect(200)
            .then(({ body }) => {
                expect(typeof body).toBe('object')
                const desiredObj = 
                    {   article_id: 3,
                        title: "Eight pug gifs that remind me of mitch",
                        topic: "mitch",
                        author: "icellusedkars",
                        body: "some gifs",
                        created_at: '2020-11-03T09:12:00.000Z',
                        votes: 0,
                        article_img_url:
                          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                      }
                      expect(body.article[0]).toMatchObject(desiredObj)
            })

    })
    it('will return a 200 status code and an article object that includes comment count', ()=>{
        return request(app)
        .get(`/api/articles/3`)
        .expect(200)
        .then(({ body }) => {
           expect(body.article[0]).toEqual (expect.objectContaining({
            comment_count: '2'
          }))
    })
})
    test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
            .get('/api/articles/1111')
            .expect(404)
            .then(({ body }) => {
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
                });

            })
    })

})

describe('404 not found status code sent when incorrect endpoint', () => {
    it('GET:404 sends an appropriate status and error message when given an invalid endpoint', () => {
        return request(app)
            .get('/api/not-a-route')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            })
    })
})



describe('GET /api/articles/:article_id/comments', () => {
    it('returns a 200 status code and an array of comments for the given article_id', () => {
        return request(app)
            .get(`/api/articles/3/comments`)
            .expect(200)
            .then(({ body }) => {
                expect(typeof body).toBe('object')
                expect(body.comments.length).toBe(2)
                expect(body.comments).toBeSortedBy('created_at', {
                    descending: true,
                })
                const desiredObj = {
                    "comments": [
                        {
                            comment_id: 11,
                            votes: 0,
                            created_at: '2020-09-19T23:10:00.000Z',
                            author: 'icellusedkars',
                            body: 'Ambidextrous marsupial',
                            article_id: 3
                        },
                        {
                            comment_id: 10,
                            votes: 0,
                            created_at: '2020-06-20T07:24:00.000Z',
                            author: 'icellusedkars',
                            body: 'git push origin master',
                            article_id: 3
                        }
                    ]
                }
                expect(body).toMatchObject(desiredObj)

            })


    })


    it('GET: 200 status code and returns an empty array when receives a valid id but no comments', () => {
        return request(app)
            .get('/api/articles/13/comments')
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual({ "comments": [] })
            })
    })
    it('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
            .get('/api/articles/1111/comments')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('article_id does not exist');
            });
    });
    it('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
            .get('/api/articles/not-an-id/comments')
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
            .then(({ body }) => {
                expect(body).toEqual({ yourNewComment: 'Testing my post endpoint.' })
            })
    })
    it('POST: returns 400 status code if there is a malformed body, i.e it is missing required fields', () => {
        const newComment = {}
        return request(app)
            .post('/api/articles/4/comments')
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
    it('POST: returns 400 status code if there is invalid properties in the body', () => {
        const newComment = {
            rating: 10,
            nickname: 'butter'
        }
        return request(app)
            .post('/api/articles/4/comments')
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })

    it('POST: returns 400 status code if invalid article_id given', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'Testing my post endpoint.'
        }
        return request(app)
            .post('/api/articles/not-an-id/comments')
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })

    it('POST: returns 404 status code if tries to post to an article_id that does not exist', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'Testing my post endpoint.'
        }
        return request(app)
            .post('/api/articles/11111/comments')
            .send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('article_id does not exist')
            })
    })
    it('POST: returns 404 status code if the username does not exist in the database', () => {
        const newComment = {
            username: 'layla_kawafi',
            body: 'Testing my post endpoint.'
        }
        return request(app)
            .post('/api/articles/4/comments')
            .send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('username not found')
            })
    })
})



describe('DELETE/api/comments/:comments_id', () => {
    it('returns a 204 status code and no content', () => {
        return request(app)
            .delete('/api/comments/4')
            .expect(204)
            .then(({ body }) => {
                expect(body).toEqual({})
            })
    })
    it('DELETE: returns 404 status code if tries to delete a comment_id that does not exist', () => {
        return request(app)
            .delete('/api/comments/11111')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('comment_id does not exist')
            })
    })
    it('DELETE: returns 404 status code if tries to delete a comment_id that does not exist', () => {
        return request(app)
            .delete('/api/comments/not-a-comment-id')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
})
describe('PATCH /api/articles/article_id', () => {
    it('will return a 200 status code and an updated article with the vote count incremented', () => {
        const votePatch = { inc_votes: 20 }
        return request(app)
            .patch('/api/articles/4')
            .send(votePatch)
            .expect(200)
            .then(({ body }) => {
                const desiredObj = {
                    title: "Student SUES Mitch!",
                    topic: "mitch",
                    author: "rogersop",
                    body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
                    created_at: "2020-05-06T01:14:00.000Z",
                    votes: 20,
                    article_img_url:
                        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                }
                expect(body).toMatchObject({ updatedArticle: desiredObj })
            })
    })


    it('PATCH: will return a 400 status code if missing required fields in the body', () => {
        const votePatch = {}
        return request(app)
            .patch('/api/articles/4')
            .send(votePatch)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })
    it('PATCH: will return a 400 status code if the body inc_votes is not a number', () => {
        const votePatch = { inc_votes: 'not-a-num' }
        return request(app)
            .patch('/api/articles/4')
            .send(votePatch)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })

    it('PATCH: returns 404 status code if tries to edit an article with an article_id that does not exist', () => {
        const votePatch = { inc_votes: 20 }
        return request(app)
            .patch('/api/articles/1111')
            .send(votePatch)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('article_id does not exist')
            })
    })
    it('PATCH: returns 400 status code if tries to edit an article with an invalid id', () => {
        const votePatch = { inc_votes: 20 }
        return request(app)
            .patch('/api/articles/not-an-id')
            .send(votePatch)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('bad request')
            })
    })

})


describe('GET /api/users', () => {
    it('should return an array of user objects', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
                expect(body.allUsers.length).toBe(4)
                body.allUsers.forEach((article) => {
                    expect(typeof article.username).toBe('string')
                    expect(typeof article.name).toBe('string')
                    expect(typeof article.avatar_url).toBe('string')

                })

            })
    })
})

describe('GET /api/articles?topic=topicname', ()=>{
    it('GET: should filter the articles and only return the articles that include the topic specified', ()=>{
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({body})=> {
            expect(body.articles.length).toBe(12)
            body.articles.forEach((article)=>{
                expect(article.topic).toBe('mitch')
            })
        })
    })
    it('GET: should return 200 and an empty array if given valid topic but there are no articles associated with this topic', ()=>{
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(({body})=> {
            expect(body.articles.length).toBe(0)
                expect(body.articles).toEqual([])
            })
        })
    
    it('GET: should return 404 not found if user inputs topic which does not exist', ()=>{
        return request(app)
        .get('/api/articles?topic=not-a-topic')
        .expect(404)
        .then(({body})=> {
                expect(body.msg).toBe('invalid topic')
            })
        })
    })

describe('GET: api/articles?sortby=:column_name', ()=> {
    it('GET: sortby query should allow for the articles to be sorted by any column provided', ()=> {
        return request(app)
        .get('/api/articles?sortby=author')
        .expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy('author')
        })
    })
    it('GET: should return 400 if user inputs column which does not exist into the sortby', ()=>{
        return request(app)
        .get('/api/articles?sortby=not-a-column')
        .expect(400)
        .then(({body})=> {
                expect(body.msg).toBe('invalid sortby query')
            })
        })
        it('should order the sortby appropriately by ascending or descending depending on what is specified', ()=> {
            return request(app)
        .get('/api/articles?sortby=author&orderby=asc')
        .expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy('author', {
                descending: false,
            })
        })
        })
        it('should return 404 not found if entering an incorrect orderby', ()=> {
            return request(app)
        .get('/api/articles?sortby=author&orderby=not-an-order')
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe('not found')
            })
        })
        })

describe.only('GET: /api/users/:username', ()=>{
    it('should return 200 and a user object corresponding to correct username', ()=>{
    return request(app)
    .get('/api/users/butter_bridge')
    .expect(200)
    .then(({body})=>{
        expect(body.user).toMatchObject({
            username: 'butter_bridge',
            name: 'jonny',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
          })
        })

    })
    test('GET:404 sends an appropriate status and error message when given a valid but non-existent username', () => {
        return request(app)
            .get('/api/users/valid_username')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('username does not exist');
            });
    })
  
    })

