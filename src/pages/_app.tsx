import "../styles/globals.css";
import type { AppProps } from "next/app";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

import { client } from "./api/api";
import { ApolloProvider } from "@apollo/client";

import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.LIVEPEER_API_KEY }),
});

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

import { ThemeProvider } from "next-themes";

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>
        <LivepeerConfig client={livepeerClient} theme={livepeerTheme}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </LivepeerConfig>
      </ApolloProvider>
    </WagmiConfig>
  );
}
