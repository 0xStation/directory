import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "@/context/ConfigContext";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DefaultLayout from "@/lib/layouts/DefaultLayout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
