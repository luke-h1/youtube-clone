import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../modules/auth/auth.utils';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ''
  ).replace('Bearer ', '');

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}
