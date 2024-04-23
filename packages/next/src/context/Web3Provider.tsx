import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { optimism } from "viem/chains";
import { alchemyEndpointCore } from "@/lib/alchemy/hooks";
import { defaultWalletConnectProjectId } from "@/lib/constants";
import { useContext } from "react";
import ConfigContext from "./ConfigContext";

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [optimism],
    transports: {
      [optimism.id]: http(alchemyEndpointCore(optimism.id)),
    },
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
      defaultWalletConnectProjectId,
    appName: "GroupOS",
  })
);

export default function Web3Provider({ children }: { children: any }) {
  const { theme } = useContext(ConfigContext);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-body-background": theme.colors.background,
            "--ck-primary-button-color": theme.colors.primary,
            "--ck-primary-button-background": theme.colors.highlightFaint,
            "--ck-primary-button-hover-background": theme.colors.highlight,
            "--ck-secondary-button-color": theme.colors.primary,
            "--ck-secondary-button-background": theme.colors.highlightFaint,
            "--ck-secondary-button-hover-background": theme.colors.highlight,
            "--ck-spinner-color": theme.colors.action,
            "--ck-body-color": theme.colors.primary,
            "--ck-body-color-muted": theme.colors.secondary,
            "--ck-tooltip-background": theme.colors.highlightFaint,
            "--ck-focus-color": theme.colors.highlight,
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
