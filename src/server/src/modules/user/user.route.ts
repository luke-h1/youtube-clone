import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import { registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.post(
  '/',
  processRequestBody(registerUserSchema.body),
  registerUserHandler,
);

router.get('/', requireUser, (_req: Request, res: Response) => {
  return res.status(200).send(res.locals.user);
});

export default router;
