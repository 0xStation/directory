"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import { useErc20Owners } from "@/lib/hooks";
import { Erc20Owner, TokenConfig } from "@/lib/types";
import { AvatarAddress } from "../ui/AvatarAddress";
import { formatUnits } from "viem";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/TabsHorizontal";
import { TabsContent } from "@radix-ui/react-tabs";
import { DataTable } from "../DataTable";

const columns: ColumnDef<Erc20Owner>[] = [
  {
    accessorKey: "ownerAddress",
    header: "Account",
    minSize: 150,
    cell: ({ row }) => {
      const ownerAddress = row.getValue("ownerAddress");
      return <AvatarAddress address={ownerAddress as string} />;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.getValue("balance");
      const formattedBalance = formatUnits(BigInt(balance as string), 18);
      return <div>{formattedBalance}</div>;
    },
  },
];

export function Erc20Owners({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { status, data, error, isFetching } = useErc20Owners(
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
          owner={data?.find((v) => v.id === Object.keys(rowSelection)[0])}
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

function SelectedRowDetails({ owner }: { owner?: Erc20Owner | null }) {
  if (!owner) return null;

  return (
    <div className="space-y-6">
      <AvatarAddress size="lg" address={owner.ownerAddress} />
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="mt-6 flex flex-row justify-between items-center">
            <p className="text-secondary">Balance</p>
            <p>{formatUnits(BigInt(owner.balance), 18)}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
