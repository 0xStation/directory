import { useContext } from "react";
import Link from "next/link";
import ConfigContext from "../../context/ConfigContext";
import Image from "next/image";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme, logo } = useContext(ConfigContext);
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <header className="px-6 border-b border-highlight py-4">
        <Link href="/" className="text-violet-100 text-base-sm font-bold">
          <Image
            src={logo}
            alt="logo"
            width={36}
            height={38}
            className="flex-shrink-0"
          />
        </Link>
      </header>
      {children}
    </main>
  );
};

export default DefaultLayout;
