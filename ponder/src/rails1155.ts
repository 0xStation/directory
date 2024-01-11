import { ponder } from "@/generated";
import { ExtensionAbi } from "../abis";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

ponder.on("Rails1155:ExtensionUpdated", async ({ event, context }) => {
  const { args, log, block, transaction } = event;
  const { db, network, client, contracts } = context;

  if (args.newExtension !== ZERO_ADDRESS) {
    const signature = await client.readContract({
      abi: ExtensionAbi,
      address: args.newExtension,
      functionName: "signatureOf",
      args: [args.selector],
    });

    await db.RailsExtension.create({
      id: `${log.address}-${args.selector}`,
      data: {
        signature,
        selector: args.selector,
        contractAddress: log.address,
      },
    });
  }
});

ponder.on("Rails1155:PermissionAdded", async ({ event, context }) => {
  const { args, log, block, transaction } = event;
  const { db, network, client, contracts } = context;

  // admin operation
  if (args.operation === "0xfd45ddde6135ec42") {
    await db.RailsAdmin.create({
      id: args.account,
      data: {
        adminAddress: args.account,
        contractAddress: log.address,
      },
    });
  }
});

ponder.on("Rails1155:OwnershipTransferred", async ({ event, context }) => {
  const { args, log, block, transaction } = event;
  const { db, network, client, contracts } = context;
  console.log(event);

  // await db.ERC1155Token.upsert({
  //   id: log.address, // contract address
  //   create: {
  //     address: log.address,
  //     owner: args.newOwner,
  //   },
  //   update: {},
  // });
});
