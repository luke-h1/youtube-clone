import { Video } from '@common/types/video';

export interface User {
  id: string;
  username: string;
  email: string;
  videos: Video[];
  createdAt: string;
  updatedAt: string;
}
