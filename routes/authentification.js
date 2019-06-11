var express = require('express');
var session = require('express-session');
var router = express.Router();
//import session from 'express-session';

//const router = Router();

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
	if (req.session && req.session.user == "rwieruch" && req.session.admin)
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

	console.log(req.body.username);
	console.log(req.body.password);
	console.log(req);

	if (req.body.username && req.body.password)
	{
		user = await req.context.models.Authors.findByLogin(req.body.username);

		if (user != null && req.body.password == "admin")
		{
			req.session.user = req.body.username;
			req.session.admin = true;
			res.send("login success!");
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
	res.send("logout success!");
});

module.exports = router;