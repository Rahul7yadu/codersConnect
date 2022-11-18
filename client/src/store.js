import { configureStore} from "@reduxjs/toolkit";
import {alertSlice,authSlice,profileSlice,postSlice} from "./reducers/index";

// const initialState = {};

const store2 = configureStore({ reducer: {alert:alertSlice.reducer,auth:authSlice.reducer,profile:profileSlice.reducer,post:postSlice.reducer}});

export const alertAction = alertSlice.actions
export const authAction = authSlice.actions
export const profileAction  = profileSlice.actions
export const postAction = postSlice.actions
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(thunk))
// );
export default store2;
