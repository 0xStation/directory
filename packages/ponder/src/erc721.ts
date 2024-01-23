import { ponder } from "@/generated";
import { computeTbaAddress } from "../../directory/src/lib/erc6551";

ponder.on("ERC721:Transfer", async ({ event, context }) => {
  const { Erc721Token } = context.db;

  await Erc721Token.upsert({
    id: `${context.network.chainId}:${event.log.address}:${event.args.tokenId}`,
    create: {
      chainId: context.network.chainId,
      contractAddress: event.log.address,
      tokenId: event.args.tokenId,
      ownerAddress: event.args.to,
      mintedAt: event.block.timestamp,
      tbaAddress: computeTbaAddress({
        tokenChainId: context.network.chainId,
        tokenContractAddress: event.log.address,
        tokenId: event.args.tokenId,
      }),
    },
    update: {
      ownerAddress: event.args.to,
    },
  });
});
