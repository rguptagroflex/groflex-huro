import * as actionTypes from "../actions/actions.types";

const initialState = {
  tenantData: undefined,
  userData: undefined,
};

export function accountDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TENANT_DATA:
      return { ...state, tenantData: action.payload };
    case actionTypes.SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
