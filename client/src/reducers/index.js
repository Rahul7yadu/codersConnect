import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
 import alertSlice from './alert2'
 import {authSlice} from './auth'
 import profileSlice from './profile'
import postSlice from './posts'
import adminSlice from "./admin";
export   {alertSlice}
export {authSlice} 
export {profileSlice}
export {postSlice}
export {adminSlice}
// export default configureStore({reducer:{alert:alertSlice.reducer}})