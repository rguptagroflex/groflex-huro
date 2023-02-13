import React, { useContext } from "react";
import { AppContext } from "../../shared/context/AppContext";

const useToggleSidebar = () => {
  /*
   * Returns a function that toggles the sidebar, takes no parameters
   **/
  const { cssContext, setCssContext } = useContext(AppContext);
  const useToggleSidebar = () => {
    setCssContext({
      ...cssContext,
      isPushedFull: !cssContext?.isPushedFull,
    });
  };
  return useToggleSidebar;
};

export default useToggleSidebar;
