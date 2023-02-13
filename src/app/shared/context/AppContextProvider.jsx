import { useState } from "react";
import { AppContext } from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [cssContext, setCssContext] = useState({
    isPushedFull: false,
    theme: "light",
  });

  return (
    <AppContext.Provider value={{ cssContext, setCssContext }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
