import youtubeApi from '@common/services/clients/youtubeApi';
import { User } from '@common/types/user';

const userService = {
  async registerUser(payload: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<string> {
    const res = await youtubeApi.post('/api/v1/users', payload);
    return res.data;
  },

  async loginUser(payload: {
    email: string;
    password: string;
  }): Promise<string> {
    const res = await youtubeApi.post('/api/v1/auth', payload, {
      withCredentials: true,
    });
    return res.data;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await youtubeApi.get('/api/v1/users', {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      return null;
    }
  },
};

export default userService;
