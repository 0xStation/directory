import { Hex } from "viem";
import TextLink from "./TextLink";
import { getTransactionUrl } from "../utils";

export function TransactionLink({
  chainId,
  hash,
}: {
  chainId?: number;
  hash?: Hex;
}) {
  const url = getTransactionUrl(chainId, hash);
  return <TextLink href={url}>View Transaction</TextLink>;
}
