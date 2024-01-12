import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "@/context/ConfigContext";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const themeConfig = {
  theme: {
    backgroundColor: "#FFF",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider config={themeConfig}>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
