import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    isAuthenticated:false,
    Users:null,
    loading:null,
    token:'',
    posts:null


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
        },
        getPosts(state,action){
            state.posts = action.payload
        },
        logout(state,action){
            state.Users = null
            state.isAuthenticated = false
            state.posts = null
            state.token = ''  
            state.loading =false
        }

    }
})

export default adminSlice