const app = require('../server.js');
const supertest = require('supertest');
const assert = require('chai').assert;

describe('test blog index endpoint', () => {
  it('should have content-type text/html', (done) => {
    supertest(app)
      .get('/')
      .set('User-Agent', 'API testing')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .end(done);
  });
  it('should have title "Simple Blog"', (done) => {
    supertest(app)
      .get('/')
      .set('User-Agent', 'API testing')
      .expect((res) => {
        assert(res.text.includes('<a class="navbar-brand" href="/">Simple blog</a>'));
      })
      .expect(200)
      .end(done);
  });
  it('should contain one card article', (done) => {
    supertest(app)
      .get('/')
      .set('User-Agent', 'API testing')
      .expect((res) => {
        assert(rest.text.includes('<div class="card">.*</div>'))
      })
      .expect(200)
      .end(done);
  });

});
describe('test wrong path', () => {
  it('should return 404 on bad url', (done) => {
    supertest(app)
      .get('/path/that/doesnt/exist')
      .set('User-Agent', 'API testing')
      .expect((res) => {
        assert(res.text.include('Page not found'))
      })
      .expect(404)
      .end(done);
  });
});
