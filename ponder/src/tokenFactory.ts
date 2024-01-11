import { ponder } from "@/generated";

ponder.on("TokenFactory:ERC1155Created", async ({ event, context }) => {
  const { args } = event;
  const { db } = context;

  await db.TokenContract.create({
    id: args.token,
    data: {
      address: args.token,
      type: "ERC1155",
    },
  });
});

ponder.on("TokenFactory:ERC721Created", async ({ event, context }) => {
  const { args } = event;
  const { db } = context;

  await db.TokenContract.create({
    id: args.token,
    data: {
      address: args.token,
      type: "ERC721",
    },
  });
});

ponder.on("TokenFactory:ERC20Created", async ({ event, context }) => {
  const { args } = event;
  const { db } = context;

  await db.TokenContract.create({
    id: args.token,
    data: {
      address: args.token,
      type: "ERC20",
    },
  });
});
