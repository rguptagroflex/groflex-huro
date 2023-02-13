import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContextProvider from "./app/shared/context/AppContextProvider";
import jquery from 'jquery'
window.$ = window.jQuery = jquery
// import function from "../src/assets/js/functions";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
