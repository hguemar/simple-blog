var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
	const authors = await req.context.models.Authors.find();

	res.render('index', { title: 'Authors' });
});

router.get('/:authorId', async (req, res) => 
{
	const author = await req.context.models.Authors.findById(req.params.authorId,);

	res.render('author', author);
});

export default router;
