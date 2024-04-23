import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "@/context/ConfigContext";
import DefaultLayout from "@/lib/layouts/DefaultLayout";
import Web3Provider from "@/context/Web3Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Web3Provider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </Web3Provider>
    </ConfigProvider>
  );
}
