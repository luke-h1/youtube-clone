import z from 'zod';

export const registerUserSchema = {
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      password: z.string({
        required_error: 'Password is required',
      }),

      confirmPassword: z.string({
        required_error: 'Confirm password is required',
      }),

      username: z.string({
        required_error: 'Username is required',
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
};
export type RegisterUserSchema = z.infer<(typeof registerUserSchema)['body']>;
