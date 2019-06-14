const app = require("../server");
const supertest = require("supertest");
const assert = require("chai").assert;

// FIXME Le test échoue
// Je ne sais pas écrire les tests unitaires
describe("Test get all posts", () => {
    describe("GET /posts", () => {
        it('should return array of posts', function (done) {
            supertest(app)
                .get('/posts')
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200)
                .end(done);
        });
    })
});
