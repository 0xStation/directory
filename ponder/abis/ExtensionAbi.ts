export const ExtensionAbi = [
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSelectors",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "selectors",
        type: "bytes4[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSignatures",
    outputs: [
      {
        internalType: "string[]",
        name: "signatures",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "signatureOf",
    outputs: [
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;
