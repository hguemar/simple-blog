var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
	const authors = await req.context.models.Authors.find();

	res.render('index', { title: 'Authors' });
});

router.get('/:authorId', async (req, res) => 
{
	// Get all posts id with the given tagID
	var authorsposts = await req.context.models.Authors.findById(req.params.authorId,);
	// Get all posts
	var posts = await req.context.models.Posts.find({ _id : { $in : authorsposts.posts}}).populate('author tags').exec();
	
	res.render('landing', { posts: posts });
});

export default router;
