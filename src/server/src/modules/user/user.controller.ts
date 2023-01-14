import { Request, Response } from 'express';
import { RegisterUserSchema } from './user.schema';
import { createUser } from './user.service';

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserSchema>,
  res: Response,
) {
  const { username, email, password } = req.body;

  try {
    await createUser({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'User created',
    });
  } catch (e) {
    if (e.code === 'P2002') {
      return res.status(409).json({
        error: 'User already',
      });
    }

    return res.status(500).json({
      message: e.message,
    });
  }
}
