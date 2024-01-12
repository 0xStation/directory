import React, { createContext } from "react";
import config from "../../groupos.config";

const defaultConfig = {
  theme: {
    backgroundColor: "#FFF",
    textColor: "#000",
  },
};

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({ children }: { children: any }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigContext;
