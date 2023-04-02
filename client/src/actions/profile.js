import { alertAction, profileAction ,authAction} from "./../store";
import axios from "axios";
export const getCurrentProfile = () => {
  return async(dispatch) => {
      try {
          const res = await axios.get("api/profile/me");
          dispatch(profileAction.getProfile(res.data))
      } catch (error) {
          dispatch(profileAction.profileError({msg:error.response.statusText,status:error.response.status}))
          
      }

  };
};
export const setProfile = (profile) => {
return async (dispatch) => {
    const data = JSON.stringify(profile)
    const config = {
        headers: { 'Content-type':'application/json'}
    }
    try {
        const res = await axios.post("api/profile/me",data,config)
        dispatch(profileAction.setProfile(res.data))
            dispatch(alertAction.removeAlert())
        dispatch(alertAction.setAlert({message:'profile set succesfully',alertType:'success'}))
    } catch (error) {
        
        dispatch(profileAction.profileError(error))
        dispatch(alertAction.setAlert({message:'could not set profile',alertType:'danger'}))
    }
}

}
// get all profiles
export const getAllProfiles =  () => {
    return async (dispatch) => {
    const config = {
        headers: { 'Content-type':'application/json'}
    }
    try {
        const res = await axios.get("api/profile",config)
        console.log(res.data)
        dispatch(profileAction.getAllProfiles(res.data))
    } catch (error) {
        
        // dispatch(profileAction.profileError(error))
    }

    }
}
// get profile by id

export const getProfileById =  (id) => {
    return async (dispatch) => {
    
    try {
        const res = await axios.get(`/api/profile/user/${id}`)
        dispatch(profileAction.clearProfile())   
        dispatch(profileAction.getProfile(res.data))
    } catch (error) {
        
        dispatch(profileAction.profileError())
    }

    }
}
// get github repos by username
export const getGithubRepos=  (githubusername) => {
    return async (dispatch) => {
    const config = {
        headers: { 'Content-type':'application/json'}
    }
    try {
        const res = await axios.get(`/api/profile/github/${githubusername}`,config)
        dispatch(profileAction.getRepos(res.data))
    } catch (error) {
        
        dispatch(profileAction.profileError(error.message))
    }

    }
}

export const addExperience=(experience)=>{
    return async (dispatch) => {
        const data = JSON.stringify(experience)
        const config = {
            headers: { 'Content-type':'application/json'}
        }
        try {
            
            const res = await axios.put("api/profile/experience",data,config)
            dispatch(profileAction.setProfile(res.data))
            dispatch(alertAction.removeAlert())
            dispatch(alertAction.setAlert({message:'Experience added',alertType:'success'}))
        } catch (error) {
                dispatch(alertAction.setAlert({message:'could not add Experience ',alertType:'danger'})) 
                
        }
    }
       
}
export const addEducation=(education)=>{
    return async (dispatch) => {
        const data = JSON.stringify(education)
        const config = {
            headers: { 'Content-type':'application/json'}
        }
        try {
            const res = await axios.put("api/profile/education",data,config)
            dispatch(profileAction.setProfile(res.data))
            dispatch(alertAction.removeAlert())
            dispatch(alertAction.setAlert({message:'Education added',alertType:'success'}))
        } catch (error) {
                dispatch(alertAction.setAlert({message:'could not add Education ',alertType:'danger'})) 
                
        }
    }
       
}
export const deleteEducation=(edu_id)=>{
    return async (dispatch) => {
        const config = {
            headers: { 'Content-type':'application/json'}
        }
        try {
            const res = await axios.delete(`api/profile/education/${edu_id}`,config)
            dispatch(profileAction.setProfile(res.data))
            dispatch(alertAction.removeAlert())
            dispatch(alertAction.setAlert({message:'Education deleted',alertType:'success'}))
        } catch (error) {
                dispatch(alertAction.setAlert({message:'could not delete Education ',alertType:'danger'})) 
                
        }
    }
       
}
export const deleteExperience=(exp_id)=>{
    return async (dispatch) => {
        const config = {
            headers: { 'Content-type':'application/json'}
        }
        try {
            const res = await axios.delete(`api/profile/experience/${exp_id}`,config)
            dispatch(profileAction.setProfile(res.data))
            dispatch(alertAction.removeAlert())
            dispatch(alertAction.setAlert({message:'Experience deleted',alertType:'success'}))
        } catch (error) {
                dispatch(alertAction.setAlert({message:'could not delete Experience',alertType:'danger'})) 
                
        }
    }
       
}
export const deleteAccount=(exp_id)=>{
    return async (dispatch) => {
        const config = {
            headers: { 'Content-type':'application/json'}
        }
        if(window.confirm('Are you sure? this cannot be undone!')){

        try {
            const res = await axios.delete(`api/users/me`,config)
            dispatch(profileAction.clearProfile())
            dispatch(alertAction.removeAlert())
            dispatch(alertAction.setAlert({message:'Your account has been deleted successfully',alertType:'success'}))
            dispatch(authAction.accountDeleted())
        } catch (error) {
                dispatch(alertAction.setAlert({message:'could not delete your account',alertType:'danger'})) 
                
        }
        }
    }
       
}