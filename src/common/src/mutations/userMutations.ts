import { queryKeys } from '@common/queryKeys';
import userService, { RegisterUserPayload } from '@common/services/userService';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const userMutations = {
  registerUser(): UseMutationOptions<string, AxiosError, RegisterUserPayload> {
    return {
      mutationFn: payload => userService.registerUser(payload),
      mutationKey: [queryKeys.registerUser],
    };
  },
  loginUser(): UseMutationOptions<
    string,
    AxiosError,
    Omit<RegisterUserPayload, 'confirmPassword' | 'username'>
  > {
    return {
      mutationFn: payload => userService.loginUser(payload),
      mutationKey: [queryKeys.loginUser],
    };
  },
} as const;
export default userMutations;
