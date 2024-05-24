import {
  Chain,
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  Transport,
} from "viem";
import { mainnet, optimism, sepolia, base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { alchemyEndpointCore } from "../alchemy/hooks";

const chains = [mainnet, sepolia, base, optimism];

export const getChain = (chainId: number) =>
  chains.find((chain) => chain.id === chainId);

export const getClient = (chainId: number) =>
  createPublicClient(getClientArgs(chainId));

export function getClientArgs(chainId: number) {
  const map: Record<number, { chain: Chain; transport: Transport }> =
    chains.reduce((acc, chain) => {
      // @ts-ignore
      acc[chain.id] = {
        chain,
        transport: http(alchemyEndpointCore(chain.id)),
      };
      return acc;
    }, {});

  if (!map[chainId]) throw Error(`invalid chainId for client: ${chainId}`);
  return map[chainId];
}

export const getApiWalletClient = (chainId: number) =>
  apiAccount
    ? createWalletClient({
        account: apiAccount,
        chain: getChain(chainId),
        transport: http(alchemyEndpointCore(chainId)),
      })
    : null;

const apiAccount = process.env.API_PRIVATE_KEY
  ? privateKeyToAccount(process.env.API_PRIVATE_KEY as Hex)
  : null;
