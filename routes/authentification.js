var express = require('express');
var session = require('express-session');
var router = express.Router();

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
	if (req.session && req.session.user != null && req.session.admin)
	  return next();
	else
	  return res.sendStatus(401);
  };

router.get('/', auth, (req, res) => {
	res.send("You can only see this after you've logged in.");
});

// Login endpoint
router.get('/login', function (req, res) {
	res.render('login');
});

 // Login endpoint
router.post('/login', async function (req, res) {

	var user;
	if (req.body.username && req.body.password)
	{
		user = await req.context.models.Authors.findByLogin(req.body.username);

		if (user != null && req.body.password == "admin")
		{
			req.session.user = req.body.username;
			req.session.userID = user._id;
			req.session.admin = true;
			res.redirect('/');
		}
		else
			res.send("login error");
	}
	else
		res.send('login failed !');
});

// Get content endpoint
router.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

// Logout endpoint
router.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;