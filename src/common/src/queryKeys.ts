export const queryKeys = {
  getCurrentUser: 'getCurrentUser',
  registerUser: 'registerUser',
  loginUser: 'loginUser',
} as const;

export type QueryKey = keyof typeof queryKeys;
