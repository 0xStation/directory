import { createConfig } from "../src/lib/config";

export default createConfig({
  logo: "https://station-images.nyc3.digitaloceanspaces.com/121828d1-8c4a-448c-be52-4f7f57d29422",
  name: "Bytexplorers",
  tokenContracts: [
    {
      slug: "passport",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/image_2024-01-05_13-57-09.png",
      tokenStandard: "ERC721",
      chainId: 10,
      contractAddress: "0x9c46fe757ea200dfba1a77d1300f77289d8314cd",
    },
    {
      slug: "guild-tokens",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/7d556928-9f74-46ad-82bc-d87e6b5c47b2",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xa014f6649667c73b108f611413916324e9276eab",
    },
    {
      slug: "tiers",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/0eca5972-795a-48d7-a9e4-b88e059cf91e",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xcbd623f16e92023660549b130529b3876f6893b9",
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
    },
  },
});
