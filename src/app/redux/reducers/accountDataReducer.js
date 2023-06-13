import * as actionTypes from "../actions/actions.types";

const initialState = {
  tenantData: undefined,
};

export function accountDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TENANT_DATA:
      return { ...state, tenantData: action.payload };
    default:
      return state;
  }
}
