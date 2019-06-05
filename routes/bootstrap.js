import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	res.render('default');
});

export default router;
