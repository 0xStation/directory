import { GroupOsConfig } from "@/lib/types";

const config: GroupOsConfig = {
  logo: "https://groupos.xyz/_next/image?url=%2Fimages%2Fterminal_logo.png&w=96&q=75",
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
  theme: {
    backgroundColor: "#0d0e11",
    textColor: "#ffffff",
  },
};

export default config;
