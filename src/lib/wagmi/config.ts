import { http, createConfig } from "@wagmi/core";
import {
  mainnet,
  sepolia,
  base,
  optimism,
  arbitrum,
  linea,
  polygon,
} from "@wagmi/core/chains";
import { alchemyEndpointCore } from "../alchemy/hooks";

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, linea, arbitrum, polygon],
  transports: {
    [mainnet.id]: http(alchemyEndpointCore(mainnet.id)),
    [sepolia.id]: http(alchemyEndpointCore(sepolia.id)),
    [base.id]: http(alchemyEndpointCore(base.id)),
    [optimism.id]: http(alchemyEndpointCore(optimism.id)),
    [arbitrum.id]: http(alchemyEndpointCore(arbitrum.id)),
    [linea.id]: http(),
    [polygon.id]: http(alchemyEndpointCore(polygon.id)),
  },
});
