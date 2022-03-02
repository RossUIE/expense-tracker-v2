import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import monthReducer from "./month/month.reducer";

export default combineReducers({
  user: userReducer,
  month: monthReducer,
});
