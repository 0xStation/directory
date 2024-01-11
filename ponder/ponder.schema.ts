import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  TokenType: p.createEnum(["ERC20", "ERC721", "ERC1155"]),
  TokenContract: p.createTable({
    id: p.string(),
    address: p.string(),
    type: p.enum("TokenType"),
    admins: p.many("RailsAdmin.contractAddress"),
    extensions: p.many("RailsExtension.contractAddress"),
  }),
  RailsAdmin: p.createTable({
    id: p.string(),
    adminAddress: p.string(),
    contractAddress: p.string().references("TokenContract.id"),
  }),
  RailsExtension: p.createTable({
    id: p.string(),
    contractAddress: p.string().references("TokenContract.id"),
    signature: p.string(),
    selector: p.string(),
  }),
  ERC1155Owner: p.createTable({
    id: p.string(),
    ownerAddress: p.string(),
    quantity: p.int(),
    token: p.string().references("ERC1155Token.id"),
    contractAddress: p.string().references("TokenContract.id"),
  }),
  ERC1155Token: p.createTable({
    id: p.string(),
    tokenId: p.string(),
    contractAddress: p.string().references("TokenContract.id"),
  }),
}));
