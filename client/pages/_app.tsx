import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Epilogue } from "@next/font/google";
import Navbar from "@/shared/Navbar";
import { StateContextProvider } from "context";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

const { chains, provider } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Crowdfunding",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({ accentColor: "#8c6dfd" })}
        chains={chains}
      >
        <StateContextProvider>
          <main className={`${epilogue.variable} font-epilogue`}>
            <Navbar />
            <Component {...pageProps} />
          </main>
        </StateContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
