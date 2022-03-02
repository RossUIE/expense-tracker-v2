import { createSelector } from "reselect";

const selectMonth = (state) => state.month;

export const selectCurrentMonth = createSelector(
  [selectMonth],
  (month) => month
);
