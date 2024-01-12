import { GroupOsConfig } from "./types";

const config: Partial<GroupOsConfig> = {
  name: "Station Arcade",
  tokenContracts: [
    {
      slug: "0xpacman",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/8273df44-20d2-4006-9c81-8e778a6a7430",
      tokenStandard: "ERC-721",
      chainId: 10,
      contractAddress: "0x006114ef647d42c11b6b3dc257280f720307bb03",
    },
    {
      slug: "arcade-tickets",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/4e9495d5-45eb-473c-b636-8ee22ddbcf49",
      tokenStandard: "ERC-20",
      chainId: 10,
      contractAddress: "0xd333a2155a212af4c1f154d31b663fbf88c30481",
    },
  ],
};

export default config;
