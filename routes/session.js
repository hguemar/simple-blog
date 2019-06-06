import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const author = await req.context.models.Authors.findByLogin(
    req.session.user,
  );
  console.log(author);
  return res.send(author);
});

export default router;
