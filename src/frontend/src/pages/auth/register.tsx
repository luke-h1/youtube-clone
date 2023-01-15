import userMutations from '@common/mutations/userMutations';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    ...userMutations.registerUser(),
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Creating account...',
        message: 'Please wait...',
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Account created',
        message: 'You can now login',
        color: 'teal',
        icon: 'check',
      });
      router.push('/auth/login');
    },
    onError: () => {
      updateNotification({
        id: 'register',
        title: 'Error',
        message: 'Could not create account',
        color: 'red',
        icon: 'error',
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit(values => registerMutation.mutate(values))}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Username"
                placeholder="jane"
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label="Password"
                placeholder="*****"
                required
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="*****"
                required
                {...form.getInputProps('confirmPassword')}
                mb="md"
              />
            </Stack>

            <Button type="submit">Register</Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};
export default RegisterPage;
