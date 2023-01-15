import { queryKeys } from '@common/queryKeys';
import userService from '@common/services/userService';
import { User } from '@common/types/user';
import { UseQueryOptions } from '@tanstack/react-query';

const userQueries = {
  getCurrentUser(): UseQueryOptions<User | null> {
    return {
      queryKey: [queryKeys.getCurrentUser],
      queryFn: () => userService.getCurrentUser(),
    };
  },
} as const;

export default userQueries;
