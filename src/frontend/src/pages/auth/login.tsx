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

const LoginPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    ...userMutations.loginUser(),
    onMutate: () => {
      showNotification({
        id: 'login',
        title: 'Logging in...',
        message: 'Please wait...',
        loading: true,
      });
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      updateNotification({
        id: 'login',
        title: 'Error',
        message: 'Could not log in',
        color: 'red',
        icon: 'error',
      });
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit(values => loginMutation.mutate(values))}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Password"
                placeholder="*****"
                required
                {...form.getInputProps('password')}
              />
            </Stack>

            <Button type="submit">Login</Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
