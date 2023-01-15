import bcrypt from 'bcrypt';
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

export async function hashPassword(candidatePassword: string): Promise<string> {
  const hash = await bcrypt.hash(candidatePassword, 10);

  return hash;
}

export async function comparePasswords(
  hashedPassword: string,
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, hashedPassword);
}
