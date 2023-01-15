export const queryKeys = {
  getCurrentUser: 'getCurrentUser',
} as const;

export type QueryKey = keyof typeof queryKeys;
