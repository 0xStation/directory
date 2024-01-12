import { GroupOsConfig } from "@/lib/config/types";

const config: Partial<GroupOsConfig> = {
  name: "Station Arcade",
  tokenContracts: [
    {
      slug: "0xpacman",
      image: "./public/tokenContracts/0xpacman.gif",
      tokenStandard: "ERC721",
      chainId: 10,
      contractAddress: "0x006114ef647d42c11b6b3dc257280f720307bb03",
    },
    {
      slug: "arcade-tickets",
      image: "./public/tokenContracts/arcade-ticket.svg",
      tokenStandard: "ERC20",
      chainId: 10,
      contractAddress: "0xd333a2155a212af4c1f154d31b663fbf88c30481",
    },
  ],
};

export default config;
