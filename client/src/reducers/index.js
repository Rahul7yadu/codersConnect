import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
 import alertSlice from './alert2'
 import {authSlice} from './auth'
 import profileSlice from './profile'
import postSlice from './posts'
export   {alertSlice}
export {authSlice} 
export {profileSlice}
export {postSlice}
// export default configureStore({reducer:{alert:alertSlice.reducer}})