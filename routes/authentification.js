import { Router } from 'express';
import session from 'express-session';

const router = Router();



// Authentication and Authorization Middleware
var auth = function(req, res, next) {
	if (req.session && req.session.user === "rwieruch" && req.session.admin)
	  return next();
	else
	  return res.sendStatus(401);
  };

router.get('/', auth, (req, res) => {
	res.send("You can only see this after you've logged in.");
});

// Login endpoint
router.get('/login', async function (req, res) {

	var user;

	if (req.query.username && req.query.password)
	{
		user = await req.context.models.Authors.findByLogin(req.query.username);

		if (user != null && req.query.password === "amyspassword")
		{
			req.session.user = req.query.username;
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

export default router;