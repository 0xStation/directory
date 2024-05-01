import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/TabsHorizontal";
import { TokenSettings } from "@/lib/components/views/TokenSettings";
import { useTokenContractRoute } from "@/lib/hooks";
import { pages } from "@/lib/utils";
import Link from "next/link";

const TokenContractSettingsPage = () => {
  const tokenContract = useTokenContractRoute();

  return (
    <Tabs defaultValue="settings">
      <div className="z-20 border-b border-b-highlight px-6">
        <TabsList>
          <Link href={pages.tokenDirectory(tokenContract)}>
            <TabsTrigger value="directory">Directory</TabsTrigger>
          </Link>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="directory"></TabsContent>
      <TabsContent value="settings">
        <TokenSettings tokenContract={tokenContract} />
      </TabsContent>
    </Tabs>
  );
};

export default TokenContractSettingsPage;
