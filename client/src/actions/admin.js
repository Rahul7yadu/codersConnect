import axios from "axios";
import { authAction, alertAction,profileAction, adminAction } from "../store";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
const uri = "/api/users";
export const AdminLogin = (userData)=>{
    
  return async (dispatch)=>{

      const body = JSON.stringify(userData)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
      const res = await axios.post('/api/admin/login',body,config)
      dispatch(adminAction.registerSuccess(res.data));
        
      } catch (error) {
        
        
        const errors = error.message;
        if (errors) {
            dispatch(alertAction.setAlert({message:'invalid credentials', alertType:"danger"}))
        }
        dispatch(authAction.registerFail());
        
      }
  }
}

export const loadUsers=()=>{

  return async (dispatch)=>{

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
      const res = await axios.get('/api/admin/')
      dispatch(adminAction.getUsers(res.data));
        
      } catch (error) {
        
        
        const errors = error.message;
        if (errors) {
            dispatch(alertAction.setAlert({message:'invalid credentials', alertType:"danger"}))
        }
        dispatch(authAction.registerFail());
        
      }
  }
}
