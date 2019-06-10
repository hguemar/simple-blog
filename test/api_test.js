//simport app from '../app.js';


var app = require("../bin/www");
var supertest = require("supertest");
describe("plain text response", function() {
  it("returns a plain text response", function(done) {
    supertest(app)
      .get("/bob")
      .set("User-Agent", "API testing")
      .set("Accept", "text/plain")
      .expect("Content-Type", "text\/plain; charset=utf-8")
      .expect(200)
      .end(done)
  });
it("returns \"Hello Bob\"", function(done) {
    supertest(app)
      .get("/bob")
      .set("User-Agent", "API testing")
      .set("Accept", "text/plain")
      .expect(function(res) {
        if (res.text !== "Hello Bob") {
          throw new Error("Does not return \"Hello Bob\" but " + res.text);
        }
      })
	  .end(done)
	});
});