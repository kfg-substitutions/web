import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { ModalsProvider } from "@mantine/modals";
import { AuthenticationProvider } from "util/authentication";

const queryClient = new QueryClient();

function Application({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KFG Helyettesítés</title>
        <meta
          name="description"
          content="Karinthy Frigyes Gimnázium - Helyettesítés Napló"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark" }}
        >
          <ModalsProvider>
            <NavigationProgress color="red" />

            <AuthenticationProvider>
              <Component {...pageProps} />
            </AuthenticationProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default Application;
