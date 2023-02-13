import React from "react";
import { useContext } from "react";
import { AppContext } from "../../shared/context/AppContext";

const useThemeSwitch = () => {
  /*
   * Returns a function that switches the theme from light to dark and vice-versa, also adds/removes "is-dark"
   * class from body element. Takes no parameters
   **/
  const { cssContext, setCssContext } = useContext(AppContext);
  const useThemeSwitch = () => {
    if (cssContext.theme === "light") {
      document.body.classList.add("is-dark");
      setCssContext({
        ...cssContext,
        theme: "dark",
      });
    } else {
      document.body.classList.remove("is-dark");
      setCssContext({
        ...cssContext,
        theme: "light",
      });
    }
  };
  return useThemeSwitch;
};

export default useThemeSwitch;
