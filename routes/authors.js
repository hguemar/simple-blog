var express = require('express');
var router = express.Router();

function isLoggedIn(req) {
	if (typeof req.session.user != 'undefined')
	  return true;
	else
	  return false;
}

router.get('/', async (req, res) => {
	const authors = await req.context.models.Authors.find();

	res.send(authors);
});

router.get('/:authorId', async (req, res) => 
{
	// Get all posts id with the given tagID
	var author = await req.context.models.Authors.findById(req.params.authorId);
	// Get all posts
	var posts = await req.context.models.Posts.find({ _id : { $in : author.posts}}).populate('author tags').exec();

	if (isLoggedIn(req))
		res.render('landing', { posts: posts, author: author.username, userID: req.session.userID});
	else
	res.render('landing', { posts: posts, author: author.username});
});

module.exports = router;
