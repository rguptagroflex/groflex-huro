import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocalizationProvider>
  // </React.StrictMode>
);
