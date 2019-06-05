import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const posts = await req.context.models.Posts.find({}).populate('author').exec();
	res.render('landing', { posts : posts });
});

export default router;
