import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useTokenContractName } from "@/lib/hooks";
import { emptyImage } from "@/lib/constants";
import { getContractUrl, truncateBytes } from "@/lib/utils";
import { NetworkIcon } from "@/lib/components/icons/chains/NetworkIcon";
import MintButton from "@/lib/components/MintButton";
import { TokenConfig } from "@/lib/types";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { NotFound } from "./404";
import { ContractLink } from "../ContractLink";

export function Erc721Mint({ tokenContract }: { tokenContract?: TokenConfig }) {
  const name = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const { logo } = useContext(ConfigContext);

  const title = `Mint ${name}`;
  return (
    <>
      {!tokenContract?.mintPage ? (
        <NotFound />
      ) : (
        <>
          <Head>
            <title>{title}</title>
            <meta name="theme-color" content="#000000" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={tokenContract?.image} />
            <meta property="twitter:card" content="summary_large_image" />
            <link rel="apple-touch-icon" href={logo} />
          </Head>
          <main
            className="flex items-center justify-center w-full h-screen"
            {...(tokenContract?.mintPage?.background && {
              style: {
                backgroundImage: `url(${tokenContract?.mintPage?.background})`,
                backgroundSize: "cover",
              },
            })}
          >
            <section className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-24 items-center">
              <section>
                <Image
                  priority={true}
                  width={500}
                  height={500}
                  alt="ERC721 NFT"
                  className="rounded"
                  src={tokenContract?.image ?? emptyImage}
                />
              </section>
              <section className="py-4 px-5 bg-highlightFaint text-sm rounded-lg h-fit w-full max-w-[500px] sm:w-[425px] sm:justify-self-end">
                <h2 className="mb-2 text-2xl">{name}</h2>
                <div className="flex flex-row space-x-2 items-center mb-8">
                  <ContractLink contract={tokenContract} />
                </div>
                <div className="flex justify-center">
                  <MintButton tokenContract={tokenContract} />
                </div>
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default Erc721Mint;
