import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
});

export default router;
