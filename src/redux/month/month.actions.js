import { monthActionTypes } from "./month.types";

export const setMonth = (month) => ({
  type: monthActionTypes.SET_MONTH,
  payload: month,
});
