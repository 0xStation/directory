export const PublicInitializeAccountControllerAbi = [
  {
    type: "function",
    name: "createAndInitializeAccount",
    inputs: [
      { name: "registry", type: "address", internalType: "address" },
      { name: "accountProxy", type: "address", internalType: "address" },
      { name: "salt", type: "bytes32", internalType: "bytes32" },
      { name: "chainId", type: "uint256", internalType: "uint256" },
      { name: "tokenContract", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "accountImpl", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "account", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
] as const;
