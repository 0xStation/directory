import {
  concat,
  encodeAbiParameters,
  getAddress,
  getContractAddress,
} from "viem";
import groupos from "../../../groupos.config";

export function computeTbaAddress({
  tokenChainId,
  tokenContractAddress,
  tokenId,
}: {
  tokenChainId: number;
  tokenContractAddress: `0x${string}`;
  tokenId: string;
}) {
  const registryAddress = groupos.tokenboundAccounts?.registry;
  const implementationAddress = groupos.tokenboundAccounts?.implementation;
  const salt = groupos.tokenboundAccounts?.salt;

  const creationCode = getCreationCode(
    implementationAddress,
    tokenChainId,
    tokenContractAddress,
    tokenId,
    salt
  );

  return getContractAddress({
    bytecode: creationCode,
    from: getAddress(registryAddress),
    opcode: "CREATE2",
    salt,
  });
}

function getCreationCode(
  implementation: `0x${string}`,
  chainId: number,
  tokenContractAddress: string,
  tokenId: string,
  salt: string
): Uint8Array {
  const types = [
    { type: "bytes32" },
    { type: "uint256" },
    { type: "address" },
    { type: "uint256" },
  ];
  const values: (string | bigint)[] = [
    salt,
    BigInt(chainId),
    tokenContractAddress,
    tokenId,
  ];
  const encodedABI = encodeAbiParameters(types, values);
  const hexImplementation = implementation as `0x${string}`;

  const hexCreationCode = concat([
    "0x3d60ad80600a3d3981f3363d3d373d3d3d363d73",
    hexImplementation,
    "0x5af43d82803e903d91602b57fd5bf3",
    encodedABI,
  ]);

  const creationCode = addressToUint8Array(hexCreationCode);

  return creationCode;
}

function addressToUint8Array(address: `0x${string}`): Uint8Array {
  // Remove '0x' prefix
  const cleanAddress = address.slice(2);

  // Convert hex string to Uint8Array
  const array = new Uint8Array(cleanAddress.length / 2);

  for (let i = 0; i < cleanAddress.length; i += 2) {
    array[i / 2] = parseInt(cleanAddress.substr(i, 2), 16);
  }

  return array;
}
