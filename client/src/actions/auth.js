import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { REGISTER_FAIL } from "./type";
import { REGISTER_SUCCESS } from "./type";
import { authAction, alertAction } from "../store";
import {setAlert} from './alert'
const uri = 'http://localhost:5000/api/users'
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    let  body = {name,email,password}
    body  = JSON.stringify(body)
    const config = {
      
          headers: {
            'Content-type' : 'application/json'
          }
    
      
    }
    try {
      let response = await axios.post(uri,body,config);
      dispatch(authAction.registerSuccess(response.data));
        

    } catch (error) {
      const errors = error.response.data.error
      if(errors){

        errors.forEach(error=>dispatch(alertAction.setAlert(setAlert(error.message,'danger')))) 
      }
      dispatch(authAction.registerFail())
      
    }
  };
};
