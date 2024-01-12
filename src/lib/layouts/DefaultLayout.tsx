import { useContext } from "react";
import Link from "next/link";
import ConfigContext from "../../context/ConfigContext";
import Image from "next/image";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme, logo } = useContext(ConfigContext);
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <header className="px-6 border-b border-[#1A1A1A] py-4">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={36}
            height={38}
            className="flex-shrink-0"
          />
          <Link href="/" className="text-violet-100 text-base-sm font-bold">
            Dashboard
          </Link>
        </div>
      </header>
      {children}
    </main>
  );
};

export default DefaultLayout;
