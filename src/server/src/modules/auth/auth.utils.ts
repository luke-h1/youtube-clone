import argon2 from 'argon2';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'changeme';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signJwt(payload: string | Buffer | object): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function verifyJwt(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return argon2.verify(hashedPassword, candidatePassword);
}
