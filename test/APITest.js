var app = require('../app');
var request = require('supertest')(app);

describe('Test Route exists', function() {

	it('404 error', function(done) {
		request
			.get('/bob')
			.expect(404, done);
	});

	it('Root', function(done) {
		request
			.get('/')
			.expect('Content-Type', 'text\/html; charset=utf-8', done);
	});

	it('Login', function(done) {
		request
			.get('/auth/login')
			.expect('Content-Type', 'text\/html; charset=utf-8', done);
	});

	it('List authors', function(done) {
		request
			.get('/authors')
			.expect('Content-Type', 'application/json; charset=utf-8', done);
	});

	it('List tags', function(done) {
		request
			.get('/tags')
			.expect('Content-Type', 'application/json; charset=utf-8', done);
	});

	it('List posts', function(done) {
		request
			.get('/posts')
			.expect('Content-Type', 'text\/html; charset=utf-8', done);
	});

	it('POST request', function(done) {
		var user = {username: 'admin', password:'admin'};
		request
			.post('/auth/login')
			.send(user)
			.expect('Content-Type', 'text\/html; charset=utf-8', done);
	});

	it('POST request with error', function(done) {
		var user = {username: 'admin', password:'admin1'};
		request
			.post('/auth/login')
			.send(user)
			.expect('Content-Type', 'text\/html; charset=utf-8', done);
	});


});