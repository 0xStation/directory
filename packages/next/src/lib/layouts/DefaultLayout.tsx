import { useContext, useEffect } from "react";
import Link from "next/link";
import ConfigContext from "../../context/ConfigContext";
import Image from "next/image";
import { useTokenContractName, useTokenContractRoute } from "../hooks";
import { TokenStandardPill } from "../components/TokenStandardPill";
import { pages } from "../utils";
import { useRouter } from "next/router";
import Head from "next/head";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme, logo, name } = useContext(ConfigContext);
  const tokenContract = useTokenContractRoute();
  const tokenContractName = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );

  const router = useRouter();
  const excludePathnames = ["/[tokenContract]/mint"];

  // Inject background color into html and body elements for overscroll
  useEffect(() => {
    document.documentElement.style.backgroundColor = theme.colors.background;
    document.body.style.backgroundColor = theme.colors.background;
  }, []);

  return (
    <>
      <Head>
        <title>{name}</title>
        {/* <meta name="description" content="description" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href={logo} />

        {/* Open Graph tags */}
        {/* <meta property="og:title" content="title" /> */}
        {/* <meta property="og:description" content="description" /> */}
        {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
        {/* <meta property="og:url" content="https://example.com" /> */}
        {/* <meta property="og:type" content="website" /> */}

        {/* Twitter Card tags */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        {/* <meta name="twitter:title" content="title" /> */}
        {/* <meta name="twitter:description" content="description" /> */}
        {/* <meta name="twitter:image" content="https://example.com/image.jpg" /> */}
      </Head>
      <main
        className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.primary,
        }}
      >
        {!excludePathnames.some((exclude) =>
          router.pathname.includes(exclude)
        ) && (
          <header className="px-6 py-4">
            <div className="flex flex-row space-x-4 items-center">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  height={36}
                  width={36}
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
        )}
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
