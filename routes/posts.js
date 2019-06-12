var express = require('express');
var router = express.Router();

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

router.get('/:postId?', async (req, res) => 
{
	if (req.params.postId == 'createPost')
	{
		res.render('newPost', { loggedIn: isLoggedIn(req) });
	}
	else
	{
		var posts;
		if (typeof req.params.postId == 'undefined')
			posts = await req.context.models.Posts.find({}).populate('author tags comments.author').exec();
		else
			posts = await req.context.models.Posts.findById(req.params.postId).populate('author tags comments.author').exec();

		console.log(posts.comments);

		var autoriseModif = false;
		if (posts.author.username == req.session.user)
			autoriseModif = true;

		res.render('posts', { posts: posts, loggedIn: isLoggedIn(req), autoriseModif: autoriseModif, userID: req.session.userID });
	}

});

// Get a post without logged in
/*router.get('/:postId', async (req, res) => 
{
	const posts = await req.context.models.Posts.findById(req.params.postId,).populate('author tags').exec();

	console.log(posts);

	var autoriseModif = false;
	if (posts.author.username == req.session.user)
		autoriseModif = true;

	res.render('posts', { posts: posts, loggedIn: isLoggedIn(req), autoriseModif: autoriseModif });
});*/


///////////////////////////////////////////
//                                       //
// Need to be logged in after this point //
//                                       //
///////////////////////////////////////////

router.get('/createPost', loggedIn, async (req, res) => 
{
	res.render('newPost');
});

/*router.get('/:postId', async (req, res) => 
{
	const post = await req.context.models.Posts.findById(req.params.postId,).populate('author tags').exec();

	res.render('posts', { post: post, loggedIn: loggedIn });
});*/

router.post('/:postId?', loggedIn, async (req, res) => 
{
	var post;
	// Creation post
	if (!req.params.postId)
	{
		var tags = req.body.tags.split(",");

		for (var i = 0, len = tags.length; i < len; i++) 
		{
			if (await req.context.models.Tags.getTagID(tags[i]) == null)
				await req.context.models.Tags.create({tag: tags[i]});

			tags[i] = await req.context.models.Tags.getTagID(tags[i]);
		}

		post = await req.context.models.Posts.create(
			{
				title: req.body.title,
				text: req.body.textArea,
				author: req.session.userID
			});
		
		for (var i = 0, len = tags.length; i < len; i++) 
		{
			var tag = await req.context.models.Tags.findById(tags[i]);
			post.tags.push(tags[i]);
			tag.posts.push(post.id);
			tag.save();
		}

		post.save();

		// Ajout au posts de l'author
		var author = await req.context.models.Authors.findById(req.session.userID);
		author.posts.push(post.id);
		author.save();
	}
	else
	{
		// Modif post
		var tags = req.body.tags.split(",");

		for (var i = 0, len = tags.length; i < len; i++) 
		{
			if (await req.context.models.Tags.getTagID(tags[i]) == null)
				await req.context.models.Tags.create({tag: tags[i]});

			tags[i] = await req.context.models.Tags.getTagID(tags[i]);
		}

		if (req.session.user != 'undefined')
		{
			var updatePost = await req.context.models.Posts.findById(req.params.postId, function(err, doc)
			{
				doc.title = req.body.title;
				doc.text = req.body.textArea;
				doc.author = req.session.userID;
				doc.save();
			});
		}

		for (var i = 0, len = tags.length; i < len; i++) 
		{
			var tag = await req.context.models.Tags.findById(tags[i]);
			updatePost.tags.push(tags[i]);
			tag.posts.push(updatePost.id);
			tag.save();
		}

		updatePost.save();
	}

	//posts = await req.context.models.Posts.findById(req.params.postId).populate('author tags').exec();

	res.redirect('/');
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
				author: req.session.userID,
				comment: req.body.commentText
			};
			doc.comments.push(comment);
			doc.save();
		});
	
		var post = await req.context.models.Posts.findById(req.params.postId).populate('author tags').exec();
		
		res.redirect('/posts/'+ req.params.postId);
	}
	else
		res.redirect('/session');	
});

module.exports = router;
