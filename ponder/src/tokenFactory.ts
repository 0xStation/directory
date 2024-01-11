import { ponder } from "@/generated";

ponder.on("TokenFactory:ERC1155Created", async ({ event, context }) => {
  const { args, log, block, transaction } = event;
  const { db, network, client, contracts } = context;

  await db.Rails1155.create({
    id: args.token,
    data: {
      address: args.token,
      owner: "0x0",
    },
  });
});

ponder.on("TokenFactory:ERC721Created", async ({ event, context }) => {
  const { args, log, block, transaction } = event;
  const { db, network, client, contracts } = context;

  await db.Rails721.create({
    id: args.token,
    data: {
      address: args.token,
      owner: "0x0",
    },
  });
});
