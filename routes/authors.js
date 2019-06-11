var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
	const authors = await req.context.models.Authors.find();

	res.render('index', { title: 'Authors' });
});

router.get('/:authorId', async (req, res) => 
{
	// Get all posts id with the given tagID
	var author = await req.context.models.Authors.findById(req.params.authorId);
	// Get all posts
	var posts = await req.context.models.Posts.find({ _id : { $in : author.posts}}).populate('author tags').exec();

	console.log(author);
	
	res.render('landing', { posts: posts, author: author.username});
});

module.exports = router;
