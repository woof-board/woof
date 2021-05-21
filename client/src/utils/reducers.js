import { useReducer } from "react";
import {
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_USER_ARR_FIELD,
    UPDATE_CURRENT_USER_ORDERS
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case UPDATE_CURRENT_USER_ARR_FIELD:
        let oldUserState = { ...state.currentUser};
        oldUserState[action.fieldName] = [...action.fieldValue];
        return {
            ...state,
            currentUser: oldUserState
        };
    case UPDATE_CURRENT_USER_ORDERS:
        return {
            ...state,
            currentUserOrders: [...action.orders]
        };
    default:
      return state;
  }
};

export function useRootReducer(initialState) {
  return useReducer(reducer, initialState)
}