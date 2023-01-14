import { NextFunction, Request, Response } from 'express';

export default function requireUser(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user } = res.locals;

  if (!user) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  return next();
}
