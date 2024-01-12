import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "./context/ConfigContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
