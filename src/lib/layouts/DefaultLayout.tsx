import ConfigContext from "../../context/ConfigContext";
import { useContext } from "react";

const DefaultLayout = ({ children }: { children: any }) => {
  const { theme } = useContext(ConfigContext);
  return (
    <main
      className={`flex min-h-[100vh] h-screen flex-col lg:flex-row max-w-content mx-auto items-stretch overflow-auto`}
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      {children}
    </main>
  );
};

export default DefaultLayout;
