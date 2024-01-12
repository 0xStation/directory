import { http, createConfig } from "@wagmi/core";
import {
  mainnet,
  sepolia,
  optimism,
  linea,
  arbitrum,
  polygon,
} from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, linea, arbitrum, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [linea.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
});
