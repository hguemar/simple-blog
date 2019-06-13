var app = require('../server.js');
var supertest = require('supertest');
var assert = require('chai').assert;

describe('test blog posts endpoint', () => {
  describe('GET /post/create', () => {
    it('should have content-type text/html', (done) => {
      supertest(app)
        .get('/post/create')
        .set('User-Agent', 'API testing')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .end(done);
    });
    it('should have a form', (done) => {
      supertest(app)
        .get('/post/create')
        .set('User-Agent', 'API testing')
        .expect((res) => {
          console.log(res.text);
          assert(res.text.search('<form method="post" action="/post/create">.*</form>') != -1);
        })
        .expect(200)
        .end(done);
    });
  });
  describe('POST /post/create', () => {
    it('should redirect to home when post is created', (done) => {
      supertest(app)
        .post('/post/create')
        .send({
          title: 'title',
          body: 'body',
          author: 'author'
        })
        .set('User-Agent', 'API testing')
        .expect('Location', '/')
        .expect(302)
        .end(done);
    })
  });
  describe('GET /post/:id', () => {
    it('should return 404 on incorrect id', (done) => {
      supertest(app)
        .get('/post/this-is-a-fake-id')
        .set('User-Agent', 'API testing')
        .expect((res) => {
          assert(res.text.includes('Post not found'));
        })
        .expect(404)
        .end(done);
    });
  });

  describe('POST /post/:id', () => {
    it('should redirect to post when comment is created', (done) => {
      supertest(app)
        .post('/post/01323655486')
        .send({ comment: 'comment' })
        .set('User-Agent', 'API testing')
        .expect('Location', '/post/01323655486')
        .expect(302)
        .end(done);
    });
  });

  describe('DELETE /post/:id', () => {
    it('should return "Post deleted"', (done) => {
      supertest(app)
        .delete('/post/0535613131')
        .set('User-Agent', 'API testing')
        .expect((res) => {
          assert(res.text.includes('Post deleted'));
        })
        .expect(200)
        .end(done);
    });
  });
});
