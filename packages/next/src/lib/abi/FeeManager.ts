export const FeeManagerAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "_baselineFees",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "_ethDefaultFees",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FeesNotSet",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        indexed: false,
        internalType: "struct FeeManager.Fees",
        name: "fees",
        type: "tuple",
      },
    ],
    name: "BaselineFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        indexed: false,
        internalType: "struct FeeManager.Fees",
        name: "fees",
        type: "tuple",
      },
    ],
    name: "DefaultFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        indexed: false,
        internalType: "struct FeeManager.Fees",
        name: "fees",
        type: "tuple",
      },
    ],
    name: "OverrideFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "getBaselineFees",
    outputs: [
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "baselines",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getDefaultFees",
    outputs: [
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "tokenDefaults",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "unitPrice",
        type: "uint256",
      },
    ],
    name: "getFeeTotals",
    outputs: [
      {
        internalType: "uint256",
        name: "feeTotal",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getOverrideFees",
    outputs: [
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "overrides",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "newBaselineFees",
        type: "tuple",
      },
    ],
    name: "setBaselineFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "newDefaultFees",
        type: "tuple",
      },
    ],
    name: "setDefaultFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum FeeManager.FeeSetting",
            name: "setting",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "baseFee",
            type: "uint120",
          },
          {
            internalType: "uint120",
            name: "variableFee",
            type: "uint120",
          },
        ],
        internalType: "struct FeeManager.Fees",
        name: "newOverrideFees",
        type: "tuple",
      },
    ],
    name: "setOverrideFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default FeeManagerAbi;
