import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
 import alertSlice from './alert2'
 import {authSlice} from './auth'
export   {alertSlice}
export {authSlice} 
// export default configureStore({reducer:{alert:alertSlice.reducer}})