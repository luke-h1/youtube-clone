import { AppShell, Navbar, Header, Box, Anchor } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import UploadVideo from '../components/UploadVideo';
import { useUser } from '../context/UserContext';
import VideoContextProvider from '../context/VideoContext';

interface Props {
  children: ReactNode;
}

const HomePageLayout = ({ children }: Props) => {
  const { user } = useUser();

  return (
    <VideoContextProvider>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            Side items
          </Navbar>
        }
        header={
          <Header height={90} p="xs">
            <Box sx={() => ({ display: 'flex' })}>
              <Box sx={() => ({ flex: '1' })}>
                <Image src="/logo.png" alt="logo" width={100} height={40} />
              </Box>
              {!user ? (
                <>
                  <Link href="/auth/login" passHref>
                    <Anchor>Login</Anchor>
                  </Link>
                  <Link href="/auth/register" passHref>
                    <Anchor>Register</Anchor>
                  </Link>
                </>
              ) : (
                <UploadVideo />
              )}{' '}
            </Box>
          </Header>
        }
      >
        {children}
      </AppShell>
    </VideoContextProvider>
  );
};
export default HomePageLayout;
