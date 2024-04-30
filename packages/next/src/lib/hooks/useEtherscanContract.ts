import { useQuery } from "@tanstack/react-query";
import { Abi, AbiItem, Address } from "viem";

export function useEtherscanContract({
  chainId,
  contractAddress,
}: {
  chainId?: number;
  contractAddress?: Address;
}) {
  // Fetch ABI from Etherscan API
  const fetchAbi = async () => {
    if (!contractAddress) {
      throw new Error("Contract address is required");
    }
    let apiKey;
    let domain;
    switch (chainId) {
      case 8453:
        domain = "api.basescan.org";
        apiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY;
        break;
      case 10:
        domain = "api-optimistic.etherscan.io";
        apiKey = process.env.NEXT_PUBLIC_OPSCAN_API_KEY;
        break;
      case 11155111:
        domain = "api-sepolia.etherscan.io";
        apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
        break;
      default:
        domain = "api.etherscan.io";
        apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    }
    const url = `https://${domain}/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const abi = JSON.parse(data.result?.[0]?.ABI) as Abi;
    const name = data.result?.[0]?.ContractName;
    return { name, abi };
  };

  return useQuery({
    queryKey: ["contractAbi", contractAddress],
    queryFn: fetchAbi,
    enabled: !!contractAddress,
  });
}
