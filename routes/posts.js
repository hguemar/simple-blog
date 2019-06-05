import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await req.context.models.Posts.find();
  return res.send(posts);
});

router.get('/:postId', async (req, res) => 
{
	const post = await req.context.models.Posts.findById(req.params.postId,);

	res.render('posts', post);
});

router.post('/', async (req, res) => 
{
	const post = await req.context.models.Posts.create(
		{
			title: req.body.title,
			text: req.body.textArea,
			author: req.context.me.id,
		});

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

export default router;
