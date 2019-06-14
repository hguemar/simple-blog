var app = require("../server.js");
var supertest = require("supertest");
var assert = require("chai").assert;

describe("test blog index endpoint", function() {
  it("should have content-type text/html", function(done) {
    supertest(app)
      .get("/")
      .set("User-Agent", "API testing")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .end(done);
  });
  it("should have title \"Blog\"", function(done) {
      supertest(app)
      .get("/")
      .set("User-Agent", "API testing")
      .expect(function(res) {
        assert(res.text.includes("<title>Blog</title>"));
      })
      .expect(200)
      .end(done);
    });
  it('should have a "Nouveau" button', function(done){
     supertest(app)
         .get("/")
         .set("User-Agent", "API testing")
         .expect(function(res){
             assert(res.text.includes('<button type="submit" class="btn btn-light" method="get\>Nouveau</button>'))
         })
         .expect(200)
         .end(done);
  });
  it("should have list of article", function (done) {
     supertest(app)
         .get("/")
         .set("User-Agent", "API testing")
         .expect(function(res) {
             assert(res.text.includes('<ul class="list-group">.*</ul>'));
         })
         .expect(200)
         .end(done);
  });
})
