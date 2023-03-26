import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    isAuthenticated:false,
    Users:null,
    loading:null,
    token:''

}


const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        registerSuccess(state,action){
            state.isAuthenticated = true;
            state.token = action.payload
        },
        getUsers(state,action){
            state.Users = action.payload
        }
    }
})

export default adminSlice