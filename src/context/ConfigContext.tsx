import React, { createContext } from "react";
import config from "../../groupos.config";
import { GroupOsConfig } from "@/lib/types";

const defaultConfig: GroupOsConfig = {
  logo: "",
  name: "Default Collection",
  theme: {
    colors: {
      // accents
      action: "#AD72FF",
      red: "#FF5650",
      green: "#63EBAF",
      blue: "#5F6FFF",
      orange: "#FF9956",
      yellow: "#CEDC4B",
      purple: "#AD72FF",
      // dark mode
      primary: "#ffffff",
      secondary: "#858585",
      highlight: "#2E2E2E",
      highlightFaint: "#1A1A1A",
      background: "#000000",
    },
  },
  tokenContracts: [],
};

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({ children }: { children: any }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigContext;
