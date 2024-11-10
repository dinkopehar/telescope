import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import headerSlice from "./headerSlice";
import modalSlice from "./modalSlice";
import rightDrawerSlice from "./rightDrawerSlice";
import portfolioSlice from "../features/portfolios/portfolioSlice";
import propertiesSlice from "../features/properties/propertiesSlice";

const rootReducer = combineReducers({
  user: userSlice,
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  portfolio: portfolioSlice,
  properties: propertiesSlice,
});

export default rootReducer;
