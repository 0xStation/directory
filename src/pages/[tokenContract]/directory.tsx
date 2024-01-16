import { AvatarAddress } from "@/lib/components/ui/AvatarAddress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/Table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsHorizontal";
import { Erc20Owners } from "@/lib/components/views/Erc20Owners";
import { TokenSettings } from "@/lib/components/views/TokenSettings";
import { useErc20Owners, useTokenContractRoute } from "@/lib/hooks";
import { ColumnDef } from "@tanstack/react-table";

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
  const tokenContract = useTokenContractRoute()
  return <Erc20Owners tokenContract={tokenContract}/>;
}

export default TokenDirectoryPage;
