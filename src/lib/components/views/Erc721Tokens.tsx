"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  useErc721Tokens,
  useNftMetadata,
  useTokenContractName,
  useTokenContractRoute,
} from "@/lib/hooks";
import { Erc721Token, TokenConfig } from "@/lib/types";
import { AvatarAddress } from "../ui/AvatarAddress";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/TabsHorizontal";
import { TabsContent } from "@radix-ui/react-tabs";
import { DataTable } from "../DataTable";
import formatDate from "@/lib/utils";
import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import { NftLink } from "../NftLink";

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
      <div className="flex flex-col rounded-xl h-full bg-highlight items-center justify-center">
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
  console.log("metadata", metadata);

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
            {tokenContractName + " #" + token.tokenId}
          </p>
          <div className="flex flex-row space-x-2">
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
        </TabsList>
        <TabsContent value="info">
          <div className="space-y-4 mt-6">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-secondary">Owner</p>
              <AvatarAddress address={token.ownerAddress} />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-secondary">Minted At</p>
              <p>{formatDate(token.mintedAt)}</p>
            </div>
          </div>
          <div className="mt-6">
            {isFetching ? (
              <div className="flex flex-col items-center justify-center pt-4">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {metadata?.attributes?.map((trait) => (
                  <div className="flex flex-col space-y-1 w-full bg-highlightFaint justify-center items-center p-3 rounded-md">
                    <p className="text-secondary text-sm">{trait.trait_type}</p>
                    <p>{trait.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
