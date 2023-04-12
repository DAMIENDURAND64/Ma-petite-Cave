import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, type ColorScheme } from "@mantine/core";
import "../styles/globals.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useLocalStorage } from "@mantine/hooks";
import Layout from "~/components/layout/layout";
import ThemeProvider from "~/components/darkTheme/themeProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });
  return (
    <ThemeProvider colorScheme={colorScheme} setColorScheme={setColorScheme}>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
