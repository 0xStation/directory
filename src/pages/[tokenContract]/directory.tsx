import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsHorizontal";
import { TokenSettings } from "@/lib/components/views/TokenSettings";
import { useErc20Owners } from "@/lib/hooks";

const TokenDirectoryPage = () => {
  return (
    <Tabs defaultValue="directory">
      <div className="z-20 border-b border-b-highlight px-6">
        <TabsList>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="directory">
        <TokenDirectory />
      </TabsContent>
      <TabsContent value="settings">
        <TokenSettings />
      </TabsContent>
    </Tabs>
  );
};

function TokenDirectory() {
  const { status, data, error, isFetching } = useErc20Owners();
  console.log(status, data, error, isFetching);
  return <div className="px-6 pt-8">Directory</div>;
}

export default TokenDirectoryPage;
