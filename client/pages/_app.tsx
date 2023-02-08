import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Epilogue } from "@next/font/google";
import Navbar from "@/shared/Navbar";
import { StateContextProvider } from "context";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <main className={`${epilogue.variable} font-epilogue`}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </StateContextProvider>
  );
}
