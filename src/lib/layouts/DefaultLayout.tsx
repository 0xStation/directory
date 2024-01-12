import { useContext } from "react";
import Link from "next/link";
import ConfigContext from "../../context/ConfigContext";
import { Button } from "@/lib/components/ui/Button";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme } = useContext(ConfigContext);
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <header className="px-6 border-b border-[#1A1A1A] py-6">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <span className="h-6 w-6 bg-gray-300 rounded-full"></span>
          <Link href="/" className="text-violet-100 text-base-sm font-bold">
            Dashboard
          </Link>
        </div>
      </header>
      <nav className="z-20 border-b border-[#1A1A1A] py-2 px-6">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <h2>Tokens</h2>
          <div className="hidden md:block">
            <Button>+ New token</Button>
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
};

export default DefaultLayout;
