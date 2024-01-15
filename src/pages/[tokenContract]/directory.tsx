import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsHorizontal";
import { TokenSettings } from "@/lib/components/views/TokenSettings";

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
  return <div className="px-6 pt-8">Directory</div>;
}

export default TokenDirectoryPage;
