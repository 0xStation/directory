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
      <div className="bg-black z-20 border-b border-b-highlight px-6">
        <TabsList>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="directory">Directory</TabsContent>
      <TabsContent value="settings">
        <TokenSettings />
      </TabsContent>
    </Tabs>
  );
};

export default TokenDirectoryPage;
