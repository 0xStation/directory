export const PermissionsAbi = [
  {
    inputs: [
      {
        internalType: "bytes8",
        name: "operation",
        type: "bytes8",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "PermissionAlreadyExists",
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
        name: "account",
        type: "address",
      },
    ],
    name: "PermissionDoesNotExist",
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
        name: "account",
        type: "address",
      },
    ],
    name: "PermissionAdded",
    type: "event",
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
        name: "account",
        type: "address",
      },
    ],
    name: "PermissionRemoved",
    type: "event",
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
        name: "account",
        type: "address",
      },
    ],
    name: "addPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPermissions",
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
            name: "account",
            type: "address",
          },
          {
            internalType: "uint40",
            name: "updatedAt",
            type: "uint40",
          },
        ],
        internalType: "struct IPermissionsInternal.Permission[]",
        name: "permissions",
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
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasPermission",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "hashOperation",
    outputs: [
      {
        internalType: "bytes8",
        name: "",
        type: "bytes8",
      },
    ],
    stateMutability: "pure",
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
        name: "account",
        type: "address",
      },
    ],
    name: "removePermission",
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
