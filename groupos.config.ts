import { GroupOsConfig } from "@/lib/types";

const config: GroupOsConfig = {
  logo: "https://groupos.xyz/_next/image?url=%2Fimages%2Fterminal_logo.png&w=96&q=75",
  name: "Station Arcade",
  tokenContracts: [
    {
      slug: "0xpacman",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/8273df44-20d2-4006-9c81-8e778a6a7430",
      tokenStandard: "ERC721",
      chainId: 10,
      contractAddress: "0x006114ef647d42c11b6b3dc257280f720307bb03",
    },
    {
      slug: "arcade-tickets",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/4e9495d5-45eb-473c-b636-8ee22ddbcf49",
      tokenStandard: "ERC20",
      chainId: 10,
      contractAddress: "0xd333a2155a212af4c1f154d31b663fbf88c30481",
    },
    {
      slug: "daily-champions",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/42faf71e-dd40-4709-8205-32724e851cc6",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xc333266f3a93572a1a628f433e4a86c0b2053b0c",
    },
  ],
  theme: {
    colors: {
      // accents
      action: "#AD72FF",
      red: "#FF5650",
      green: "#63EBAF",
      blue: "#5F6FFF",
      orange: "#FF9956",
      yellow: "#CEDC4B",
      purple: "#AD72FF",
      // dark mode
      primary: "#ffffff",
      secondary: "#858585",
      highlight: "#2E2E2E",
      highlightFaint: "#1A1A1A",
      background: "#000000",
      // light mode
      // primary: "#010101",
      // secondary: "#858585",
      // highlight: "#E4E4E4",
      // highlightFaint: "#EEEEEE",
      // background: "#FAFAFA",
    },
  },
};

export default config;
