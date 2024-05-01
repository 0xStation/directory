"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  useNftMetadata,
  useTokenContractName,
  useTokenContractRoute,
  useTokenInventory,
} from "@/lib/hooks";
import { Erc721Token, TokenConfig } from "@/lib/types";
import { AvatarAddress } from "../ui/AvatarAddress";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/TabsHorizontal";
import { TabsContent } from "@radix-ui/react-tabs";
import { DataTable } from "../DataTable";
import formatDate, { cn, getContractUrl, truncateBytes } from "@/lib/utils";
import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import { NftLink } from "../NftLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import { Wallet } from "../icons/Wallet";
import { useErc721Tokens } from "@/lib/api/hooks";
import { formatUnits, zeroAddress } from "viem";
import { Pill } from "../ui/Pill";
import { Etherscan } from "../icons/Etherscan";
import { emptyImage } from "@/lib/constants";

const columns: ColumnDef<Erc721Token>[] = [
  {
    accessorKey: "tokenId",
    header: "Token ID",
    cell: ({ row }) => row.original.tokenId,
  },
  {
    accessorKey: "ownerAddress",
    header: "Owner",
    minSize: 150,
    cell: ({ row }) => <AvatarAddress address={row.original.ownerAddress} />,
  },
  {
    accessorKey: "mintedAt",
    header: "Minted At",
    cell: ({ row }) => formatDate(row.original.mintedAt),
  },
];

export function Erc721Tokens({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { status, data, error, isFetching } = useErc721Tokens(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    state: {
      rowSelection, //pass the row selection state back to the table instance
    },
    getRowId: (row) => row.id,
  });

  return table.getRowModel().rows?.length ? (
    <div className="grid grid-cols-3 h-[calc(100vh-110px)]">
      <div className="h-[calc(100vh-110px)] overflow-y-scroll col-span-2 border-r border-highlight px-6">
        <DataTable table={table} />
      </div>
      <div className="col-span-1 pt-8 px-6">
        <SelectedRowDetails
          token={data?.find((v) => v.id === Object.keys(rowSelection)[0])}
        />
      </div>
    </div>
  ) : (
    <div className="px-6 py-8 h-[calc(100vh-110px)]">
      <div className="flex flex-col rounded-xl h-full bg-highlightFaint items-center justify-center">
        <h1 className="text-xl font-bold">No owners</h1>
        <p className="text-sm text-secondary">
          Owners of this token will be displayed here.
        </p>
      </div>
    </div>
  );
}

function SelectedRowDetails({ token }: { token?: Erc721Token | null }) {
  const tokenContract = useTokenContractRoute();
  const tokenContractName = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const {
    status,
    data: metadata,
    error,
    isFetching,
  } = useNftMetadata(tokenContract, token?.tokenId);
  const {
    tokens,
    nfts,
    isFetching: isFetchingTokenInvetory,
  } = useTokenInventory({
    chainId: tokenContract?.chainId,
    address: token?.tbaAddress,
  });

  if (!token) return null;
  return (
    <div className="space-y-6">
      <div className="flex flex-row gap-6 items-center">
        {isFetching ? (
          <div className="flex flex-col w-[80px] h-[80px] rounded-md border border-highlight items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Image
            className="bg-highlightFaint rounded-md border border-highlight cursor-pointer"
            width={80}
            height={80}
            src={metadata?.image ?? ""}
            alt="nft"
          />
        )}
        <div className="flex flex-col gap-2 overflow-hidden">
          <p className="text-lg font-bold">
            {metadata?.name
              ? metadata.name
              : tokenContractName + " #" + token.tokenId}
          </p>
          <div className="flex flex-row space-x-2">
            {tokenContract?.addTokenboundAccounts && (
              <span
                className="px-3 py-1 rounded border border-highlight flex flex-row items-center space-x-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(token.tbaAddress).then(() => {
                    console.log("Contract address copied to clipboard");
                  });
                }}
              >
                <Wallet className="h-4 w-4" />
                <span>{truncateBytes(token.tbaAddress)}</span>
              </span>
            )}
            <NftLink
              chainId={tokenContract?.chainId}
              contractAddress={tokenContract?.contractAddress}
              tokenId={token.tokenId}
            />
          </div>
        </div>
      </div>
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          {tokenContract?.addTokenboundAccounts && (
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="info">
          <div className="space-y-4 mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-secondary">Token ID</p>
              <p>#{token.tokenId}</p>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-secondary">Owner</p>
              <AvatarAddress address={token.ownerAddress} />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-secondary">Minted At</p>
              <p>{formatDate(token.mintedAt)}</p>
            </div>
            {isFetching ? (
              <div className="flex flex-col items-center justify-center pt-4">
                <LoadingSpinner />
              </div>
            ) : (
              <Accordion
                type="multiple"
                defaultValue={["description", "traits"]}
                className="space-y-4 w-full"
              >
                <AccordionItem value="description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {metadata?.description ? (
                      <p>{metadata?.description}</p>
                    ) : (
                      <div className="flex flex-col rounded-md bg-highlightFaint justify-center items-center py-2 text-secondary">
                        No description
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="traits">
                  <AccordionTrigger>Traits</AccordionTrigger>
                  <AccordionContent>
                    {metadata?.attributes && metadata?.attributes.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {metadata?.attributes?.map((trait) => (
                          <div className="flex flex-col space-y-1 w-full bg-highlightFaint justify-center items-center p-3 rounded-md">
                            <p className="text-secondary text-sm">
                              {trait.trait_type}
                            </p>
                            <p>{trait.value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col rounded-md bg-highlightFaint justify-center items-center py-2 text-secondary">
                        No traits
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tokens">
          <div className="flex flex-col gap-6 mt-4">
            {!nfts ? (
              <div>loading</div>
            ) : (
              nfts.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {nfts.map((nft: any, i: number) => (
                    <div
                      className="relative group w-full h-full aspect-square rounded-lg border border-highlight"
                      key={`nft-${i}`}
                    >
                      <Image
                        src={nft.image ?? emptyImage}
                        fill
                        alt=""
                        className="rounded-lg"
                      />
                      {/* {getNft && (
                      <a
                        className="absolute bottom-1 right-1 group-hover:block hidden p-2 bg-gray-90 rounded cursor-pointer"
                        target="_blank"
                        rel="noreferrer"
                        href={openseaLink}
                      >
                        <Opensea className={cn("h-5 w-5")} />
                      </a>
                    )} */}
                    </div>
                  ))}
                </div>
              )
            )}
            <div className="space-y-4">
              {tokens.map((token) => {
                const formattedBalance = formatUnits(
                  BigInt(token.balance),
                  token.decimals
                );
                return (
                  <div className="rounded-lg text-primary text-base flex w-full justify-between px-4 py-5 gap-4 bg-highlightFaint">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {token.contractAddress == zeroAddress
                          ? token.name
                          : "$" + token.symbol}
                      </p>
                      <Pill>ERC20</Pill>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                      <p>
                        {parseFloat(formattedBalance) === 0
                          ? "< 1"
                          : formattedBalance}
                      </p>
                      <div>
                        <a
                          href={getContractUrl(
                            tokenContract?.chainId,
                            token.contractAddress
                          )}
                          target="_blank"
                          className={cn(
                            token.contractAddress !== zeroAddress
                              ? ""
                              : "invisible"
                          )}
                        >
                          <Etherscan className="text-primary h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
