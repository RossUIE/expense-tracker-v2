import { monthActionTypes } from "./month.types";

const d = new Date();

const INITIAL_STATE = {
  month: d.getMonth(),
};

const monthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case monthActionTypes.SET_MONTH:
      return {
        ...state,
        month: action.payload,
      };
    default:
      return state;
  }
};

export default monthReducer;
