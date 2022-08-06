import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <NavigationProgress color="red" />

      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
