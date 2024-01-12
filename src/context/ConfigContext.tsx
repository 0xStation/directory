import React, { createContext } from "react";
import config from "../../groupos.config";
import { GroupOsConfig } from "@/lib/types";

const defaultConfig: GroupOsConfig = {
  logo: "",
  name: "Default Collection",
  theme: {
    backgroundColor: "#FFF",
    textColor: "#000",
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
