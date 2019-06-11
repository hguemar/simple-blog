var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
	const posts = await req.context.models.Posts.find({}).populate('author tags').exec();
	res.render('landing', { posts : posts });
});

module.exports = router;