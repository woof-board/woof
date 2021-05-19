import { useReducer } from "react";
import {
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_USER_ARR_FIELD
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
    default:
      return state;
  }
};

export function useRootReducer(initialState) {
  return useReducer(reducer, initialState)
}