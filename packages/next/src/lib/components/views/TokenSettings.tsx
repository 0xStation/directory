import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsVertical";
import { emptyImage } from "@/lib/constants";
import { useTokenContractName, useTokenContractSymbol } from "@/lib/hooks";
import { TokenConfig } from "@/lib/types";
import Image from "next/image";
import { NetworkIcon } from "../icons/chains/NetworkIcon";
import { truncateBytes } from "@/lib/utils";
import { ContractLink } from "../ContractLink";
import { PermissionTab } from "./tabs/PermissionsTab";
import { ExtensionsTab } from "./tabs/ExtensionsTab";
import { useToken } from "wagmi";
import { GuardsTab } from "./tabs/GuardsTab";

export function TokenSettings({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <Tabs className="border-t border-highlight grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 h-[calc(100vh-110px)]">
      <div className="col-span-1 border-r border-highlight pt-8 px-6 min-w-[25%] xl:min-w-[10%]">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guard">Guards</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 pt-8 px-6">
        <TabsContent value="general">
          <General tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="permissions">
          <Permissions tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="guard">
          <Guards tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="extensions">
          <Extensions tokenContract={tokenContract} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function General({ tokenContract }: { tokenContract?: TokenConfig }) {
  const name = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const symbol = useTokenContractSymbol(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  return (
    <div className="space-y-6">
      <div className="text-2xl">General</div>
      <div className="flex flex-row space-x-4">
        <div className="relative self-start h-[132px] w-[132px]">
          <Image
            src={tokenContract?.image ?? emptyImage}
            width={132}
            height={132}
            alt="image"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex flex-row items-center space-x-2">
            <ContractLink contract={tokenContract} />
            <span className="bg-highlight text-sm rounded-full px-3 py-1.5">
              ${symbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Permissions({ tokenContract }: { tokenContract?: TokenConfig }) {
  return (
    <div className="space-y-6">
      <div className="text-2xl">Permissions</div>
      <PermissionTab tokenContract={tokenContract} />
    </div>
  );
}

function Guards({ tokenContract }: { tokenContract?: TokenConfig }) {
  return (
    <div className="space-y-6 max-w-[600px]">
      <div className="text-2xl">Guards</div>
      <GuardsTab tokenContract={tokenContract} />
    </div>
  );
}

function Extensions({ tokenContract }: { tokenContract?: TokenConfig }) {
  return (
    <div className="space-y-6">
      <div className="text-2xl">Extensions</div>
      <ExtensionsTab tokenContract={tokenContract} />
    </div>
  );
}
