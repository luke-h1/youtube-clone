import { Request, Response } from 'express';
import omit from 'lodash/omit';
import { findUserByEmail } from '../user/user.service';
import { LoginSchema } from './auth.schema';
import { comparePasswords, signJwt } from './auth.utils';

export async function loginHandler(
  req: Request<{}, {}, LoginSchema>,
  res: Response,
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  const valid = await comparePasswords(user.password, password);

  if (!valid) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  const payload = omit(user, ['password']);

  const jwt = signJwt(payload);

  res.cookie('accessToken', jwt, {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    httpOnly: true, // not accessible via JS
    domain: process.env.NODE_ENV === 'production' ? '' : 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json({
    jwt,
  });
}
