import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { appDataReducer } from "./appDataReducer";

const rootReducer = combineReducers({
  themeData: themeReducer,
  appData: appDataReducer,
});

export default rootReducer;
