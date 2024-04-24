import Link from "next/link";
import { getContractUrl, truncateBytes } from "../utils";
import { Address } from "viem";
import { NetworkIcon } from "./icons/chains/NetworkIcon";

export function ContractLink({
  contract,
}: {
  contract?: { chainId: number; contractAddress: Address };
}) {
  return (
    <Link
      className="px-2 py-1 rounded border border-highlight hover:bg-white/10 flex flex-row items-center space-x-2"
      href={getContractUrl(contract?.chainId, contract?.contractAddress)}
      target="_blank"
    >
      <NetworkIcon className="h-5 w-5" chainId={contract?.chainId} />
      <span>{truncateBytes(contract?.contractAddress)}</span>
    </Link>
  );
}
