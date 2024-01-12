import Image from "next/image";
import ConfigContext from "../context/ConfigContext";
import { useContext } from "react";
import Home from "./home";

export default function App() {
  const { theme } = useContext(ConfigContext);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <Home />
    </main>
  );
}
