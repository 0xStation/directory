import { ponder } from "@/generated";
import { zeroAddress } from "viem";

ponder.on("ERC20:Transfer", async ({ event, context }) => {
  const { Erc20Owner } = context.db;

  if (event.args.from != zeroAddress) {
    await Erc20Owner.update({
      id: `${context.network.chainId}:${event.log.address}:${event.args.from}`,
      data: ({ current }) => ({
        balance: current.balance - event.args.value,
      }),
    });
  }
  if (event.args.to != zeroAddress) {
    await Erc20Owner.upsert({
      id: `${context.network.chainId}:${event.log.address}:${event.args.to}`,
      create: {
        chainId: context.network.chainId,
        contractAddress: event.log.address,
        ownerAddress: event.args.to,
        balance: event.args.value,
      },
      update: ({ current }) => ({
        balance: current.balance + event.args.value,
      }),
    });
  }
});
