import { useContext } from "react";
import Link from "next/link";
import ConfigContext from "../../context/ConfigContext";
import Image from "next/image";
import { useTokenContractName, useTokenContractRoute } from "../hooks";
import { TokenStandardPill } from "../components/TokenStandardPill";
import { pages } from "../utils";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme, logo, name } = useContext(ConfigContext);
  const tokenContract = useTokenContractRoute();
  const tokenContractName = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <header className="px-6 py-4">
        <div className="flex flex-row space-x-4 items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={36}
              height={38}
              className="flex-shrink-0 rounded-md"
            />
          </Link>
          <p className="text-2xl font-thin text-highlight">/</p>
          <Link href="/">
            <p>{name}</p>
          </Link>
          {!!tokenContract && (
            <>
              <p className="text-2xl font-thin text-highlight">/</p>
              <Link href={pages.tokenDirectory(tokenContract)}>
                <div className="flex flex-row items-center space-x-2">
                  <p>{tokenContractName}</p>
                  <TokenStandardPill
                    tokenStandard={tokenContract.tokenStandard}
                  />
                </div>
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </main>
  );
};

export default DefaultLayout;
