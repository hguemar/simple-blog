import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const author = await req.context.models.Authors.findByLogin(req.session.user,);

	if (author != null && req.session.user == author && req.session.admin == true)
	{
		console.log(author);
		return res.send(author);
	}		
	else
		return res.send(401);
});

export default router;
