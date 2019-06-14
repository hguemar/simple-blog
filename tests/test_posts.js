var app = require("../server.js");
var supertest = require("supertest");
var assert = require("chai").assert;

describe("Test blog GET Endpoint", function() {
  describe("GET /api/article/all", function() {
    it("Should have empty array or array of articles", function(done) {
      supertest(app)
        .get("/api/article/all")
        .set("User-Agent", "API testing")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .end(done);
    });
  })
})


describe("Test blog POST Endpoint", function() {
  describe("POST /api/article", function() {
    it('Should create an article', function(done) {
        supertest(app)
          .post('/api/article')
          .send({"type":"CREATE", "article":{"title":"Test title", "author": "Test author", "date": new Date(), "content": "Test content"}})
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);

             });
          done();
      });
  })
})
