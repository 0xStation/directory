import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsHorizontal";
import { Erc20Owners } from "@/lib/components/views/Erc20Owners";
import { Erc721Tokens } from "@/lib/components/views/Erc721Tokens";
import { TokenSettings } from "@/lib/components/views/TokenSettings";
import { useTokenContractRoute } from "@/lib/hooks";

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
  const tokenContract = useTokenContractRoute();
  switch (tokenContract?.tokenStandard) {
    case "ERC20":
      return <Erc20Owners tokenContract={tokenContract} />;
    case "ERC721":
      return <Erc721Tokens tokenContract={tokenContract} />;
    default:
      return <div>token</div>;
  }
}

export default TokenDirectoryPage;
