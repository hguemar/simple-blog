const session = require('./session');
const authors = require('./authors');
const posts = require('./posts');
const landing = require('./landing');
const tags = require('./tags');
const auth = require('./authentification');

module.exports = {
	session,
	authors,
	posts,
	tags,
	landing,
	auth,
};

