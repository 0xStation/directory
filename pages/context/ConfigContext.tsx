import React, { createContext } from "react";
import config from "../../groupos.config.js";

const defaultConfig = {
  theme: {
    backgroundColor: "#FFF",
  },
};

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({ children }: { children: any }) => {
  return (
    <ConfigContext.Provider value={{ theme: config.theme }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
