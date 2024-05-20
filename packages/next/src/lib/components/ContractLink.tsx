import { getContractUrl, truncateBytes } from "../utils";
import { Address } from "viem";
import { NetworkIcon } from "./icons/chains/NetworkIcon";
import { BoxLink } from "./BoxLink";

export function ContractLink({
  contract,
}: {
  contract?: { chainId?: number; contractAddress?: Address };
}) {
  return (
    <BoxLink
      href={getContractUrl(contract?.chainId, contract?.contractAddress)}
    >
      <NetworkIcon className="h-5 w-5" chainId={contract?.chainId} />
      <span>{truncateBytes(contract?.contractAddress)}</span>
    </BoxLink>
  );
}
