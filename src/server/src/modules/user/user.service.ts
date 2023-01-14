import { User } from '@prisma/client';
import { prisma } from '../../db/prisma';

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function createUser(
  user: Omit<User, 'createdAt' | 'updatedAt' | 'videos' | 'id'>,
) {
  return prisma.user.create({
    data: user,
  });
}
