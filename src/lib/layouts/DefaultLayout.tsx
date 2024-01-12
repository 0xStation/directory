import ConfigContext from "../../context/ConfigContext";
import { useContext } from "react";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme } = useContext(ConfigContext);
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col max-w-content mx-auto items-stretch overflow-auto`}
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <div className="z-20 border-b border-gray-700 py-4 px-6">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <h2>Tokens</h2>
          <div className="hidden md:block">
            <button>button</button>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
};

export default DefaultLayout;
