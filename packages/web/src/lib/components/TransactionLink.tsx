import { Hex } from "viem";
import TextLink from "./TextLink";
import { cn, getTransactionUrl } from "../utils";

export function TransactionLink({
  chainId,
  hash,
}: {
  chainId?: number;
  hash?: Hex;
}) {
  const url = getTransactionUrl(chainId, hash);
  return (
    <TextLink href={url} className={cn(!hash && "hidden")}>
      View Transaction
    </TextLink>
  );
}
