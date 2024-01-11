import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Rails1155: p.createTable({
    id: p.string(),
    address: p.string(),
    owner: p.string(),
    admins: p.many("Rails1155Admins.contractAddress"),
    extensions: p.many("Rails1155Extension.contractAddress"),
  }),
  Rails721: p.createTable({
    id: p.string(),
    address: p.string(),
    owner: p.string(),
  }),
  Rails1155Admins: p.createTable({
    id: p.string(),
    adminAddress: p.string(),
    contractAddress: p.string().references("Rails1155.id"),
  }),
  Rails1155Extension: p.createTable({
    id: p.string(),
    contractAddress: p.string().references("Rails1155.id"),
    signature: p.string(),
    selector: p.string(),
  }),
}));
