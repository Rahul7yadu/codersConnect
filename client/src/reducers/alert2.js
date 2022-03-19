import { createSlice } from '@reduxjs/toolkit'
import {SET_ALERT }from '../actions/type'
import { REMOVE_ALERT } from '../actions/type'
const initialState = []
console.log('from reducer')
const alert = (state = initialState,action)=>{
    console.log(action)
    const {type,payload} = action
    switch(type) {
        case SET_ALERT:
            return [...state,payload]
        case REMOVE_ALERT:
            return []   
        default:return state                    
    }
}

const alertSlice = createSlice({
    name:'alert',
    initialState:[],
    reducers:{
        setAlert(state,action){
            state.push(action.payload)
        },removeAlert(state){
            state.pop()
        }
    }

})

export default alertSlice