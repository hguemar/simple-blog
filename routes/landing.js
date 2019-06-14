var express = require('express');
var router = express.Router();

function isLoggedIn(req) {
	if (typeof req.session.user != 'undefined')
	  return true;
	else
	  return false;
}

router.get('/', async (req, res) => {
	const posts = await req.context.models.Posts.find({}).populate('author tags').exec();

	if (isLoggedIn(req))
		res.render('landing', { posts : posts, userID: req.session.userID });
	else
		res.render('landing', { posts : posts });
});

module.exports = router;