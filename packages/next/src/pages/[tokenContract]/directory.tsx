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
import { pages } from "@/lib/utils";
import Link from "next/link";

const TokenDirectoryPage = () => {
  const tokenContract = useTokenContractRoute();

  return (
    <Tabs defaultValue="directory">
      <div className="z-20 border-b border-b-highlight px-6">
        <TabsList>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <Link href={pages.settings(tokenContract)}>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </Link>
        </TabsList>
      </div>
      <TabsContent value="directory">
        <TokenDirectory />
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
      return <div className="p-4">Coming soon...</div>;
  }
}

export default TokenDirectoryPage;
