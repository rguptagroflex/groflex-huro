import * as types from "../actions/actions.types";

const initialState = {
  loginToken: "",
};

export function appDataReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN_TOKEN:
      return { ...state, loginToken: action.payload };
    default:
      return state;
  }
}
