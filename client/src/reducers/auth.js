
import {REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/type'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null, 
    loading:true,
    user:null,
}

export default function(state=initialState,action){
    
 
 switch(action.type){
     case REGISTER_SUCCESS:
         
         localStorage.setItem('token',action.payload.token)
         return {
             ...state,
             ...action.payload,
             isAuthenticated:true, 
             loading:false,
         }
     case REGISTER_FAIL:
         localStorage.removeItem('token')
          return {
            ...state,
            token:null,
            isAuthenticated:false, 
            loading:false,
        }
     default:return state    
 }

}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        registerSuccess(state,action){
            localStorage.setItem('token',action.payload.token)
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
            state.loading = false
        },registerFail(state,action){
         localStorage.removeItem('token')
         state.token=null
         state.isAuthenticated  = false
         state.loading = false
         state.user = null
        
        },userLoaded(state,action){
            state.isAuthenticated= true
            state.loading = false
            state.user = action.payload
        },authError(state,action){
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
            state.loading = false
            
        },logout(state){
         localStorage.removeItem('token')
            state.isAuthenticated = false
            state.loading = false
            state.token = null
            state.user = null
        },
        accountDeleted(state){
          localStorage.removeItem('token')
            state.isAuthenticated = false
            state.loading = false
            state.token = null
            state.user = null    
        }
    }

}

)
export {authSlice}