import { ComputedTraitType } from "../src/lib/types";
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
      addTokenboundAccounts: true,
      creationBlock: 18629889,
      description: "",
      nftMetadata: {
        image: "https://svg.cryptodatabytes.com/token_svg/{tokenId}", // replaces {tokenId}
        computedTraits: [
          {
            name: "Guild Tokens",
            sourceContractAddress: "0xa014f6649667c73b108f611413916324e9276eab",
            type: ComputedTraitType.ERC1155Balance,
            data: {
              tokenIdSpecifier: "ALL",
            },
          },
          {
            name: "Explorer Tier",
            sourceContractAddress: "0xcbd623f16e92023660549b130529b3876f6893b9",
            type: ComputedTraitType.ERC1155Tier,
            data: {
              tiers: [
                {
                  tokenId: "4",
                },
                {
                  tokenId: "3",
                },
                {
                  tokenId: "2",
                },
                {
                  tokenId: "1",
                },
              ],
            },
          },
        ],
      },
      mintPage: {
        controller: "0xb336c2c5568b310ec5774cb6c577280c14c4dac2",
        background:
          "https://station-images.nyc3.digitaloceanspaces.com/9b4b21b0-2e9c-4d5d-842f-25baa66b8a25",
      },
    },
    {
      slug: "tiers",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/0eca5972-795a-48d7-a9e4-b88e059cf91e",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xcbd623f16e92023660549b130529b3876f6893b9",
      creationBlock: 18629889,
      description: "",
      nftMetadata: {
        tokens: {
          "1": {
            name: "trainee",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/trainee.png",
            traits: [
              {
                name: "tier",
                value: "trainee",
              },
            ],
            description: "earned at least 1 guild token",
          },
          "2": {
            name: "scout",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/scout.png",
            traits: [
              {
                name: "tier",
                value: "scout",
              },
            ],
            description: "earned at least 5 guild tokens",
          },
          "3": {
            name: "trailblazer",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/trailblazer.png",
            traits: [
              {
                name: "tier",
                value: "trailblazer",
              },
            ],
            description: "earned at least 50 guild tokens",
          },
          "4": {
            name: "captain",
            image:
              "media.cryptodatabytes.com/andrewhong5297-team-bucket/captain.png",
            traits: [
              {
                name: "tier",
                value: "captain",
              },
            ],
            description:
              "earned at least 100 guild tokens and 100 byteinsight tokens, and maintained a monthly streak",
          },
        },
      },
    },
    {
      slug: "guild-tokens",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/7d556928-9f74-46ad-82bc-d87e6b5c47b2",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xa014f6649667c73b108f611413916324e9276eab",
      creationBlock: 18629889,
      description: "",
    },
    {
      slug: "byteinsight",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/d1451266-df23-4753-b0bb-4a4657ade9e0",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0x022c7a578dc7c9731d5264661f8486e807dc2a6b",
      creationBlock: 116293558,
      description: "",
    },
    {
      slug: "bytelight",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/aa125701-68ae-4cfc-b1d5-6d1a9162c556",
      tokenStandard: "ERC1155",
      chainId: 8453,
      contractAddress: "0x4fc7be21c4437f6d56df01b1ba38f8b361aee9e4",
      creationBlock: 11272516,
      description: "",
    },
  ],
  theme: {
    colors: {
      // accents
      action: "#ffffff",
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
      // primary: "#ffffff",
      // secondary: "#858585",
      // highlight: "#2E2E2E",
      // highlightFaint: "#1A1A1A",
      // background: "#000000",
    },
  },
});
