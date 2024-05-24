import { ComputedTraitType } from "../src/lib/types";
import { createConfig } from "../src/lib/config";

export default createConfig({
  logo: "/images/bytexplorer/logo.webp",
  name: "Bytexplorers",
  tokenContracts: [
    {
      slug: "passport",
      image: "/images/bytexplorer/nft-image.png",
      tokenStandard: "ERC721",
      chainId: 10,
      contractAddress: "0x9c46fe757ea200dfba1a77d1300f77289d8314cd",
      addTokenboundAccounts: true,
      creationBlock: 18629889,
      description:
        "Learn onchain analytics while building onchain reputation - with friends!",
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
        background: "/images/bytexplorer/mint-bg.png",
      },
    },
    {
      slug: "tiers",
      image:
        "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/trainee.png",
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
            description: "earned at least 1 guild token",
            traits: [
              {
                name: "tier",
                value: "trainee",
              },
            ],
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
        "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/guild.png",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0xa014f6649667c73b108f611413916324e9276eab",
      creationBlock: 18629889,
      description: "",
      nftMetadata: {
        tokens: {
          "1": {
            name: "multichain maxi",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/guild.png",
            description: "guild token for participating in weekly quests",
          },
          "2": {
            name: "Optimism",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/op_sunny.jpg",
            description: "Optimism Numba Nerds guild token",
            traits: [
              {
                name: "tier",
                value: "Optimism",
              },
            ],
          },
        },
      },
    },
    {
      slug: "byteinsight",
      image:
        "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/bytesight.PNG",
      tokenStandard: "ERC1155",
      chainId: 10,
      contractAddress: "0x022c7a578dc7c9731d5264661f8486e807dc2a6b",
      creationBlock: 116293558,
      description: "",
      nftMetadata: {
        tokens: {
          "1": {
            name: "basic",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/bytesight.PNG",
            description: "for answering basic ByteSight questions",
            traits: [
              {
                name: "tier",
                value: "basic",
              },
            ],
          },
        },
      },
    },
    {
      slug: "bytelight",
      image:
        "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/bytelight.PNG",
      tokenStandard: "ERC1155",
      chainId: 8453,
      contractAddress: "0x4fc7be21c4437f6d56df01b1ba38f8b361aee9e4",
      creationBlock: 11272516,
      description: "",
      nftMetadata: {
        tokens: {
          "1": {
            name: "basic",
            image:
              "https://media.cryptodatabytes.com/andrewhong5297-team-bucket/bytelight.PNG",
            description: "for asking basic ByteLight questions",
            traits: [
              {
                name: "tier",
                value: "basic",
              },
            ],
          },
        },
      },
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
