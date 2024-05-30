export const InitializeAccountControllerAbi = [
  {
    inputs: [],
    name: "InvalidPermission",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "NonceAlreadyUsed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "PermitCallFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "PermitCallUnprotected",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint48",
        name: "expiration",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "current",
        type: "uint48",
      },
    ],
    name: "PermitExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "permitHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "PermitInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "expected",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "PermitSenderMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "PermitSignerInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "Reentrancy",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "NonceUsed",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "expiration",
            type: "uint48",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct PermitController.Permit",
        name: "permit",
        type: "tuple",
      },
    ],
    name: "callWithPermit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
      {
        internalType: "address",
        name: "accountProxy",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "accountImpl",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initData",
        type: "bytes",
      },
    ],
    name: "createAndInitializeAccount",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "isNonceUsed",
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
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "requirePermits",
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
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "context",
        type: "bytes",
      },
    ],
    name: "signerCanPermit",
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
