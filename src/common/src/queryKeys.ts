export const queryKeys = {
  getCurrentUser: 'getCurrentUser',
  registerUser: 'registerUser',
  loginUser: 'loginUser',
  getVideos: 'getVideos',
  getVideo: 'getVideo',
  editVideo: 'editVideo',
  uploadVideo: 'uploadVideo',
} as const;

export type QueryKey = keyof typeof queryKeys;
