import { ponder } from "@/generated";
import { ExtensionAbi } from "../abis";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

ponder.on("Rails1155:ExtensionUpdated", async ({ event, context }) => {
  const { args, log } = event;
  const { db, client } = context;

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
  const { args, log } = event;
  const { db } = context;

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

ponder.on("Rails1155:TransferSingle", async ({ event, context }) => {
  const { args, log } = event;
  const { db } = context;
  console.log(event);

  // if this is the first mint -- create a new token
  if (args.from === ZERO_ADDRESS) {
    await db.ERC1155Token.create({
      id: `${log.address}-${args.id}`,
      data: {
        tokenId: args.id.toString(),
        contractAddress: log.address,
      },
    });
  }

  const existingTokenHolder = await db.ERC1155Owner.findUnique({
    id: `${log.address}-${args.to}`,
  });

  const existingTokenSender = await db.ERC1155Owner.findUnique({
    id: `${log.address}-${args.from}`,
  });

  // update the owner and sender owner records
  await db.ERC1155Owner.upsert({
    id: `${log.address}-${args.to}`,
    create: {
      ownerAddress: args.to,
      quantity: parseInt(args.value.toString()),
      token: `${log.address}-${args.id}`,
      contractAddress: log.address,
    },
    update: {
      quantity: existingTokenHolder
        ? existingTokenHolder.quantity + parseInt(args.value.toString())
        : parseInt(args.value.toString()),
    },
  });

  await db.ERC1155Owner.upsert({
    id: `${log.address}-${args.from}`,
    create: {
      ownerAddress: args.from,
      quantity: parseInt(args.value.toString()),
      token: `${log.address}-${args.id}`,
      contractAddress: log.address,
    },
    update: {
      quantity: existingTokenSender
        ? existingTokenSender.quantity - parseInt(args.value.toString())
        : -1 * parseInt(args.value.toString()),
    },
  });
});
