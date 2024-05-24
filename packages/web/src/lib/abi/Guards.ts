export const GuardsAbi = [
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
    ],
    name: "GuardDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        internalType: "address",
        name: "guard",
        type: "address",
      },
    ],
    name: "GuardRejected",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        internalType: "address",
        name: "oldImplementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "GuardUnchanged",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "InvalidContract",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldGuard",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newGuard",
        type: "address",
      },
    ],
    name: "GuardUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guard",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "checkBeforeData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "executionData",
        type: "bytes",
      },
    ],
    name: "checkGuardAfter",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "checkGuardBefore",
    outputs: [
      {
        internalType: "address",
        name: "guard",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "checkBeforeData",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllGuards",
    outputs: [
      {
        components: [
          {
            internalType: "bytes8",
            name: "operation",
            type: "bytes8",
          },
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "updatedAt",
            type: "uint40",
          },
        ],
        internalType: "struct IGuardsInternal.Guard[]",
        name: "guards",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
    ],
    name: "guardOf",
    outputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
    ],
    name: "removeGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "setGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
