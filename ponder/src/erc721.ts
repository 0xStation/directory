import { ponder } from "@/generated";
import { zeroAddress } from "viem";

ponder.on("ERC721:Transfer", async ({ event, context }) => {
  const { Erc721Token } = context.db;

  await Erc721Token.upsert({
    id: `${context.network.chainId}:${event.log.address}:${event.args.tokenId}`,
    create: {
      chainId: context.network.chainId,
      contractAddress: event.log.address,
      tokenId: event.args.tokenId,
      ownerAddress: event.args.to,
      mintedAt: event.block.timestamp
    },
    update: {
      ownerAddress: event.args.to,
    },
  });
});
