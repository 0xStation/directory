import { ponder } from "@/generated";
import { zeroAddress } from "viem";

ponder.on("ERC1155:TransferSingle", async ({ event, context }) => {
  const { Erc1155Owner } = context.db;

  if (event.args.from != zeroAddress) {
    await Erc1155Owner.update({
      id: `${context.network.chainId}:${event.log.address}:${event.args.id}:${event.args.from}`,
      data: ({ current }) => ({
        balance: current.balance - event.args.value,
      }),
    });
  }
  if (event.args.to != zeroAddress) {
    await Erc1155Owner.upsert({
      id: `${context.network.chainId}:${event.log.address}:${event.args.id}:${event.args.to}`,
      create: {
        chainId: context.network.chainId,
        contractAddress: event.log.address,
        tokenId: event.args.id,
        ownerAddress: event.args.to,
        balance: event.args.value,
      },
      update: ({ current }) => ({
        balance: current.balance + event.args.value,
      }),
    });
  }
});

ponder.on("ERC1155:TransferBatch", async ({ event, context }) => {
  const { Erc1155Owner } = context.db;

  if (event.args.from != zeroAddress) {
    const promises = event.args.ids.map((tokenId, i) =>
      Erc1155Owner.update({
        id: `${context.network.chainId}:${event.log.address}:${tokenId}:${event.args.from}`,
        data: ({ current }) => ({
          balance: current.balance - event.args.values[i],
        }),
      })
    );
    await Promise.all(promises);
  }
  if (event.args.to != zeroAddress) {
    const promises = event.args.ids.map((tokenId, i) =>
      Erc1155Owner.upsert({
        id: `${context.network.chainId}:${event.log.address}:${tokenId}:${event.args.to}`,
        create: {
          chainId: context.network.chainId,
          contractAddress: event.log.address,
          tokenId: event.args.id,
          ownerAddress: event.args.to,
          balance: event.args.values[i],
        },
        update: ({ current }) => ({
          balance: current.balance + event.args.values[i],
        }),
      })
    );
    await Promise.all(promises);
  }
});
