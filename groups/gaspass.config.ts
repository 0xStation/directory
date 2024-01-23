import { createConfig } from "../src/lib/config";

export default createConfig({
  logo: "https://pbs.twimg.com/profile_images/1639402103486521344/erDLnbwE_400x400.jpg",
  name: "Linea Gas Pass",
  tokenContracts: [
    {
      slug: "gaspass",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/3d59b8a5-b79a-4124-bc89-801e27344264",
      tokenStandard: "ERC721",
      chainId: 59144,
      contractAddress: "0xe286d24eafef04ea1eafc7f3de605b684dd6a4bf",
      creationBlock: 18629889,
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
