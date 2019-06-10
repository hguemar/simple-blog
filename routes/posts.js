import { Router } from 'express';

const router = Router();

function isLoggedIn(req) {
	if (typeof req.session.user != 'undefined')
	  return true;
	else
	  return false;
}

var loggedIn = function(req, res, next) {
	if (typeof req.session.user != 'undefined')
	  return next();
	else
	  return res.sendStatus(401);
}

router.get('/', async (req, res) => {
	const post = await req.context.models.Posts.find().populate('author tags').exec();
	res.render('posts', { post: post, loggedIn: isLoggedIn(req) });
});

// Get a post without logged in
router.get('/:postId', async (req, res) => 
{
	const post = await req.context.models.Posts.findById(req.params.postId,).populate('author tags').exec();

	res.render('posts', { post: post, loggedIn: isLoggedIn(req) });
});


///////////////////////////////////////////
//                                       //
// Need to be logged in after this point //
//                                       //
///////////////////////////////////////////

router.get('/createPost', loggedIn, async (req, res) => 
{
	res.render('newPost', { post: post, loggedIn: loggedIn });
});

/*router.get('/:postId', async (req, res) => 
{
	const post = await req.context.models.Posts.findById(req.params.postId,).populate('author tags').exec();

	res.render('posts', { post: post, loggedIn: loggedIn });
});*/

router.post('/:postId?', loggedIn, async (req, res) => 
{
	var post;
	if (!req.params.postId)
	{
		post = await req.context.models.Posts.create(
			{
				title: req.body.title,
				text: req.body.textArea,
				author: req.session.user,
			});
	}
	else
	{
		console.log(req.session);
		console.log(req.session.user);

		if (req.session.user != 'undefined')
		{
			var updatePost = await req.context.models.Posts.findById(req.params.postId, function(err, doc)
			{
				doc.title = req.body.title;
				doc.text = req.body.textArea;
				doc.author = req.session.user;
				doc.save();
			});
		}
	}

	post = await req.context.models.Posts.findById(req.params.postId).populate('author tags').exec();

	res.render('posts', post);
});

router.delete('/:postId', async (req, res) => {
  const post = await req.context.models.Posts.findById(
    req.params.postId,
  );

  let result = null;
  if (post) {
    result = await post.remove();
  }

  return res.send(result);
});

router.post('/:postId/createComment', async(req, res) => {

	console.log(req.session);

	if (req.session.user != 'undefined')
	{
		var updatePost = await req.context.models.Posts.findById(req.params.postId, function(err, doc)
		{
			var comment = 
			{
				author: req.session.user,
				comment: req.body.commentText
			};
			doc.comments.push(comment);
			doc.save();
		});
	
		var post = await req.context.models.Posts.findById(req.params.postId).populate('author tags').exec();
		
		res.render('posts', post);
	}
	else
		res.redirect('/session');	
});

export default router;
