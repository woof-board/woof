import { useReducer } from "react";
import {
    UPDATE_CURRENT_USER
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    default:
      return state;
  }
};

export function useRootReducer(initialState) {
  return useReducer(reducer, initialState)
}