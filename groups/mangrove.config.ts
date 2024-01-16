import { GroupOsConfig } from "@/lib/types";

const config: GroupOsConfig = {
  logo: "https://pbs.twimg.com/profile_images/1660360628941324290/GQYSBPow_400x400.jpg",
  name: "Mangrove DAO",
  tokenContracts: [
    {
      slug: "builders",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/960cdd2f-fcb7-4059-a683-c1f5025d6434",
      tokenStandard: "ERC721",
      chainId: 1,
      contractAddress: "0x33dbde2e093b7cf8446d9ac0de79220d42423501",
    },
    {
      slug: "pods",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/e9cbf9a4-7384-45ae-aa43-c33613a4277e",
      tokenStandard: "ERC721",
      chainId: 1,
      contractAddress: "0x9763a9d2b17756b6531ecbf6c7097f7225e22da7",
    },
    {
      slug: "protocol-council",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/e60107e8-8c09-4a36-94c1-3f4e760c1f1c",
      tokenStandard: "ERC721",
      chainId: 1,
      contractAddress: "0x760559c824db794a307f3c98e03a87d1b10c12db",
    },
    {
      slug: "ecosystem-council",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/fed156cb-20c7-444d-a23a-9cc9adf919be",
      tokenStandard: "ERC721",
      chainId: 1,
      contractAddress: "0x93cf0a3b67962d475d9514d9955fe6621a26d42c",
    },
    {
      slug: "builder-score",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/b58d181b-6831-4119-b08b-8278d27db39b",
      tokenStandard: "ERC20",
      chainId: 1,
      contractAddress: "0x5f120453dfd0c55f55370d1f718089ae0fcf6387",
    },
    {
      slug: "pod-score",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/a97ec388-9644-4a17-86f1-bde3b7764cf9",
      tokenStandard: "ERC20",
      chainId: 1,
      contractAddress: "0xd0805e6b373223322e341018cb8c024c3baa98b0",
    },
    {
      slug: "active-builders",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/a4db9135-02e2-4b5d-a570-c06fee48312b",
      tokenStandard: "ERC1155",
      chainId: 1,
      contractAddress: "0xd1502a7659eaad60278ae3ef27edea849504f4da",
    },
    {
      slug: "active-pods",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/a4db9135-02e2-4b5d-a570-c06fee48312b",
      tokenStandard: "ERC1155",
      chainId: 1,
      contractAddress: "0xa2956d29d879ab7b9a1d16723e376d9e2be5c911",
    },
    {
      slug: "active-protocol-council",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/a4db9135-02e2-4b5d-a570-c06fee48312b",
      tokenStandard: "ERC1155",
      chainId: 1,
      contractAddress: "0xcb42f61a0e42eacd0091b9ffc6a182cdcec7bd4a",
    },
    {
      slug: "active-ecosystem-council",
      image:
        "https://station-images.nyc3.digitaloceanspaces.com/a4db9135-02e2-4b5d-a570-c06fee48312b",
      tokenStandard: "ERC1155",
      chainId: 1,
      contractAddress: "0x7c49ef1e6565af0e112f3727005f85208f81ba91",
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
      // light mode
      primary: "#010101",
      secondary: "#858585",
      highlight: "#E4E4E4",
      highlightFaint: "#EEEEEE",
      background: "#FAFAFA",
    },
  },
};

export default config;
