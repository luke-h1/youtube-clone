import { User } from '@common/types/user';

export interface Video {
  id: string;
  title: string;
  description: string;
  extension: string;
  owner: User;
  ownerId: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
