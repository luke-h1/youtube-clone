import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import UserContextProvider from '../context/UserContext';

type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps & {
  Component: LayoutProps;
  dehydratedState: unknown;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || (page => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Youtube clone</title>
        <meta name="description" content="YT clone" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <UserContextProvider>
                {getLayout(
                  <main>
                    <Component {...pageProps} />
                  </main>,
                )}
              </UserContextProvider>
            </Hydrate>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
