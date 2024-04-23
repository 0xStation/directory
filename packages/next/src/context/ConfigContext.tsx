import React, { createContext } from "react";
import config from "../../groupos.config";
import { defaultConfig } from "@/lib/config";

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({ children }: { children: any }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigContext;
