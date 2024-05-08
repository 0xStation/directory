import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Erc20Owner: p.createTable({
    id: p.string(),
    chainId: p.int(),
    contractAddress: p.hex(),
    ownerAddress: p.hex(),
    balance: p.bigint(),
  }),
  Erc721Token: p.createTable({
    id: p.string(),
    chainId: p.int(),
    contractAddress: p.hex(),
    tokenId: p.bigint(),
    ownerAddress: p.hex(),
    mintedAt: p.bigint(),
    tbaAddress: p.hex().optional(),
  }),
  Erc1155Owner: p.createTable({
    id: p.string(),
    chainId: p.int(),
    contractAddress: p.hex(),
    tokenId: p.bigint(),
    ownerAddress: p.hex(),
    balance: p.bigint(),
  }),
}));
