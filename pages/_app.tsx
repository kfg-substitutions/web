import Head from "next/head";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { AuthenticationProvider } from "util/authentication";

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

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <NavigationProgress color="red" />

        <AuthenticationProvider>
          <Component {...pageProps} />
        </AuthenticationProvider>
      </MantineProvider>
    </>
  );
}

export default Application;
