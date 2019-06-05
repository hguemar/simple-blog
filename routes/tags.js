import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const tags = await req.context.models.Tags.find();
  return res.send(tags);
});

router.get('/:tagId', async (req, res) => 
{
	// Get all posts id with the given tagID
	var tagsposts = await req.context.models.Tags.findById(req.params.tagId);
	// Get all posts
	var posts = await req.context.models.Posts.find({ _id : { $in : tagsposts.posts}}).populate('author tags').exec();

	res.render('landing', { posts: posts });
});

router.post('/', async (req, res) => 
{
	const tag = await req.context.models.Tags.create(
		{
			tag: req.body.tag,
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
