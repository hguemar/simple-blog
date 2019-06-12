var app = require("../bin/www");
var supertest = require("supertest");

describe("Test routes", function() 
{
	it("returns error 404 page", function(done) 
	{
		supertest(app)
			.get("/bob")
			.set("User-Agent", "API testing")
			.set("Accept", "text/html")
			.expect("Content-Type", "text\/html; charset=utf-8")
			.expect(404)
			.end(done)
	});
	
	it("returns code 200", function(done) 
	{
		supertest(app)
			.get("/auth/login")
			.set("User-Agent", "API testing")
			.set("Accept", "text/html")
			.expect("Content-Type", "text\/html; charset=utf-8")
			.expect(200)
			.end(done)
	});

	it('/ should exist', function() {
		return supertest(app).get('/').expect(200);
	});

	it('/auth/login should exist', function() {
		return supertest(app).get('/auth/login').expect(200);
	});

	it('/authors should exist', function() {
		return supertest(app).get('/authors').expect(200);
	});

	it('/tags should exist', function() {
		return supertest(app).get('/tags').expect(200);
	});

	it('/session should exist', function() {
		return supertest(app).get('/session').expect(200);
	});

	it('/posts should exist', function() {
		return supertest(app).get('/posts').expect(200);
	});
});