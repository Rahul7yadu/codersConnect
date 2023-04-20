import axios from "axios";
import { authAction, alertAction,profileAction, adminAction } from "../store";
import { setAlert } from "./alert";
// import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
// import {ref}  from "firebase/database"
// import {set,get,getDatabase,push} from "firebase/database"
// import { auth,db} from '../firebase'
import setAuthToken from "../utils/setAuthToken";
const uri = "/api/users";
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    let body = { name, email, password };
    try {
      // const user = await createUserWithEmailAndPassword(auth,email,password)
      // const userId = user.user.uid
      // const val = await push(ref(db,'users/'+userId),{name,email,password})
    } catch (error) {
    dispatch(alertAction.setAlert({message:error.message,alertType:'danger'}))
    }
   
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
      console.log(error.response.data.error)
      const errors = error.response.message
      if (errors) {
        dispatch(alertAction.setAlert({message:errors.response.data.error.message,alertType:'danger'}))
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
      // try{

      //   const res = await signInWithEmailAndPassword(auth,userData.email,userData.password)
      // }catch(error){
      //   console.log(error)
      // }
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


// logout 
export const logout = ()=>{
  return (dispatch)=>{
    dispatch(adminAction.logout())
    dispatch(authAction.logout());
    
    dispatch(profileAction.clearProfile())
  }
}


