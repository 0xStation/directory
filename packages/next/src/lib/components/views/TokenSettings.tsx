import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsVertical";
import { TokenConfig } from "@/lib/types";
import { PermissionTab } from "./tabs/PermissionsTab";
import { ExtensionsTab } from "./tabs/ExtensionsTab";
import { GuardsTab } from "./tabs/GuardsTab";
import { GeneralTab } from "./tabs/GeneralTab";

export function TokenSettings({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <Tabs
      className="border-t border-highlight grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 h-[calc(100vh-70px)]"
      defaultValue="general"
    >
      <div className="col-span-1 border-r border-highlight pt-8 px-6 min-w-[25%] xl:min-w-[10%]">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guard">Guards</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 overflow-auto">
        <TabsContent value="general">
          <div className="pt-8 px-6 space-y-6 max-w-[600px]">
            <div className="text-2xl">General</div>
            <GeneralTab tokenContract={tokenContract} />
          </div>
        </TabsContent>
        <TabsContent value="permissions">
          <div className="pt-8 px-6 space-y-6 max-w-[600px]">
            <div className="text-2xl">Permissions</div>
            <PermissionTab tokenContract={tokenContract} />
          </div>
        </TabsContent>
        <TabsContent value="guard">
          <div className="pt-8 px-6 space-y-6 max-w-[600px]">
            <div className="text-2xl">Guards</div>
            <GuardsTab tokenContract={tokenContract} />
          </div>
        </TabsContent>
        <TabsContent value="extensions">
          <ExtensionsTab tokenContract={tokenContract} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
