import axios from "axios";
import { authAction, alertAction,profileAction } from "../store";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
const uri = "/api/users";
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    let body = { name, email, password };
    body = JSON.stringify(body);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      let response = await axios.post(uri, body, config);
      dispatch(authAction.registerSuccess(response.data));
    } catch (error) {
      const errors = error.response.message
      if (errors) {
        errors.forEach((error) =>
          dispatch(alertAction.setAlert(setAlert({message:error.message,alertType: "danger"})))
        );
      }
      dispatch(authAction.registerFail());
      dispatch(authAction.authError())
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      
      setAuthToken(localStorage.getItem('token'));
    
    try {
      const res = await axios.get('api/users');
      dispatch(authAction.userLoaded(res.data));
    } catch (error) {
      dispatch(authAction.authError());
    }
  }
  };
};

export const loginUser = (userData)=>{
return async (dispatch) => {
      const body = JSON.stringify(userData)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
      const res = await axios.post('api/auth',body,config)
      dispatch(authAction.registerSuccess(res.data));
        
      } catch (error) {
        
        
        const errors = error.message;
        if (errors) {
            dispatch(alertAction.setAlert({message:'invalid credentials', alertType:"danger"}))
        }
        dispatch(authAction.registerFail());
        
      }

}
}

// logout 
export const logout = ()=>{
  return (dispatch)=>{
    dispatch(authAction.logout());
    dispatch(profileAction.clearProfile())
  }
}