import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsVertical";
import { TokenConfig } from "@/lib/types";
import { PermissionsTab } from "./tabs/PermissionsTab";
import { ExtensionsTab } from "./tabs/ExtensionsTab";
import { GuardsTab } from "./tabs/GuardsTab";
import { GeneralTab } from "./tabs/GeneralTab";
import { MetadataTab } from "./tabs/MetadataTab";
import { MintPageTab } from "./tabs/MintPageTab";

export function TokenSettings({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <Tabs
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 h-[calc(100vh-110px)]"
      defaultValue="metadata"
    >
      <div className="col-span-1 border-r border-highlight pt-8 px-6 min-w-[25%] xl:min-w-[10%]">
        <TabsList>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guard">Guards</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
          <TabsTrigger value="mint-page">Mint Page</TabsTrigger>
        </TabsList>
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 overflow-auto">
        <TabsContent value="metadata">
          <MetadataTab tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsTab tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="guard">
          <GuardsTab tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="extensions">
          <ExtensionsTab tokenContract={tokenContract} />
        </TabsContent>
        <TabsContent value="mint-page">
          <MintPageTab tokenContract={tokenContract} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
