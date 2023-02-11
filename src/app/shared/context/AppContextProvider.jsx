import { useState } from "react";
import { AppContext } from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    css: {
      isPushedFull: false,
    },
  });

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
