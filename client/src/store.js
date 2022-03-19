import { createStore, applyMiddleware } from "redux";
import { configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {alertSlice,authSlice} from "./reducers/index";

// const initialState = {};

const store2 = configureStore({ reducer: {alert:alertSlice.reducer,auth:authSlice.reducer}});

export const alertAction = alertSlice.actions
export const authAction = authSlice.actions
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(thunk))
// );
export default store2;
