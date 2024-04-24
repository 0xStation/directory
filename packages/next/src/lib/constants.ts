import { StaticImageData } from "next/image";
import pfp1 from "../../public/pfps/1.png";
import pfp2 from "../../public/pfps/2.png";
import pfp3 from "../../public/pfps/3.png";
import pfp4 from "../../public/pfps/4.png";

export const PFP_MAP = {
  0: pfp1,
  1: pfp2,
  2: pfp3,
  3: pfp4,
} as { [key: number]: StaticImageData };

export const emptyImage =
  "https://station-images.nyc3.digitaloceanspaces.com/c3e5a9f4-3ba1-4ec2-a88a-a82f54c2ef42.svg";
export const defaultWalletConnectProjectId = "bf3a6fd186e454cad2c97a7f150c03b9";

export enum Operation {
  ADMIN = "0xfd45ddde6135ec42",
  MINT = "0x38381131ea27ecba",
  BURN = "0xf951edb3fd4a16a3",
  TRANSFER = "0x5cc15eb80ba37777",
  METADATA = "0x0e5de49ee56c0bd3",
  CALL = "0x706a455ca44ffc9f",
  // permits are enabling the permission, but only through set up modules/extension logic
  // e.g. someone can approve new members to mint, but cannot circumvent the module for taking payment
  MINT_PERMIT = "0x0b6c53f325d325d3",
  BURN_PERMIT = "0x6801400fea7cd7c7",
  TRANSFER_PERMIT = "0xa994951607abf93b",
  METADATA_PERMIT = "0x2af95d8d71827d12",
}
