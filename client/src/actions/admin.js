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
      setAuthToken(res.data.token)
      console.log(res.data)
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
      console.log(res.data)
      
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

export const loadPosts = ()=>{
  return async (dispatch)=>{

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
      
      const res = await axios.get('/api/admin/posts')
      console.log(res.data)
       
      dispatch(adminAction.getPosts(res.data));
        
      } catch (error) {
        
        
        const errors = error.message;
        if (errors) {
            dispatch(alertAction.setAlert({message:'invalid credentials', alertType:"danger"}))
        }
        dispatch(authAction.registerFail());
        
      }
  }
}


export const removeUser=(id)=>{
return async (dispatch)=>{
  try {
   const res =  await axios.delete('/api/admin/user/'+id)
  } catch (error) {
    console.log(error)
  }
}
}

export const removePost = (id)=>{
  return async (dispatch)=>{
    try {
     const res = await axios.delete('/api/admin/posts/'+id) 
    } catch (error) {
      
    }
  }
}