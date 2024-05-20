import { createConfig } from "../src/lib/config";

export default createConfig({
  logo: "https://station-images.nyc3.digitaloceanspaces.com/89181649-3290-4a13-bc75-77214373ee89",
  name: "Noms",
  githubRepo: "0xStation/directory",
  tokenContracts: [
    {
      slug: "noms",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/89181649-3290-4a13-bc75-77214373ee89",
      tokenStandard: "ERC721",
      chainId: 11155111,
      contractAddress: "0xbbceba4fed5acb04ce285f351e5f92f38c49016f",
      addTokenboundAccounts: true,
      creationBlock: 5823204,
      description: "",
      mintPage: {
        controller: "0xb336c2c5568b310ec5774cb6c577280c14c4dac2",
        background:
          "https://station-images.nyc3.digitaloceanspaces.com/9b4b21b0-2e9c-4d5d-842f-25baa66b8a25",
      },
      nftMetadata: {
        tokens: {
          "1": {
            // name: "Conner",
            description: "I like symmetry",
            image:
              "https://pbs.twimg.com/profile_images/1781398184515796992/ReDeMEue_400x400.jpg",
            traits: [
              {
                name: "Height",
                value: `5' 11"`,
              },
            ],
          },
        },
      },
    },
    {
      slug: "traits",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/966971a3-635e-4701-89bb-2d4d64831ccc",
      tokenStandard: "ERC1155",
      chainId: 11155111,
      contractAddress: "0x9f8148627d6f56dc4e501a6aca3a367c390f1476",
      creationBlock: 5823204,
      description: "",
    },
    {
      slug: "points",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/e2593b0d-39b3-4b10-9562-fae443d0d314",
      tokenStandard: "ERC20",
      chainId: 11155111,
      contractAddress: "0x39e44726c3bc93a361b4ccfbd6bb9077a84a940f",
      creationBlock: 5823204,
      description: "",
    },
  ],
  theme: {
    colors: {
      // accents
      action: "#fff",
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
      // primary: "#000000",
      // secondary: "#858585",
      // highlight: "#DFDFDF",
      // highlightFaint: "#ECECEC",
      // background: "#ffffff",
    },
  },
});
