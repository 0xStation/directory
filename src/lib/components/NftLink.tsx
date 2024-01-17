import Link from "next/link";
import { getNftUrl } from "../utils";
import { Opensea } from "./icons/Opensea";

export function NftLink(props: {
  chainId?: number;
  contractAddress?: string;
  tokenId?: string;
}) {
  return (
    <Link
      href={getNftUrl(props.chainId, props.contractAddress, props.tokenId)}
      target="_blank"
    >
      <div className="p-2 bg-highlightFaint rounded">
        <Opensea className="text-primary h-5 w-5" />
      </div>
    </Link>
  );
}
