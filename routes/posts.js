import { Router } from 'express';
import { read } from 'fs';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await req.context.models.Posts.find();
  return res.send(posts);
});

router.get('/createPost', async (req, res) => 
{
	res.render('posts');
});

router.get('/:postId', async (req, res) => 
{
	const post = await req.context.models.Posts.findById(req.params.postId,);

	res.render('posts', post);
});

router.post('/:postId?', async (req, res) => 
{
	var post;
	if (!req.params.postId)
	{
		post = await req.context.models.Posts.create(
			{
				title: req.body.title,
				text: req.body.textArea,
				author: req.context.me.id,
			});
	}
	else
	{
		var updatePost = req.context.models.Posts.findById(req.params.postId, function(err, doc)
		{
			doc.title = req.body.title;
			doc.text = req.body.textArea;
			doc.author = req.context.me.id;
			doc.save();
		});

		post = await req.context.models.Posts.findById(req.params.postId);
	}

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

	var updatePost = await req.context.models.Posts.findById(req.params.postId, function(err, doc)
	{
		var comment = {author: req.context.me.id,
		comment: req.body.commentText};
		doc.comments.push(comment);
		doc.save();
	});

	var post = await req.context.models.Posts.findById(req.params.postId);

	res.render('posts', post);

	
});

export default router;
