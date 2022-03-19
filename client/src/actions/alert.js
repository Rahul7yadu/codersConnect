import { SET_ALERT,REMOVE_ALERT } from "./type";
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg,alertType) => {
const id = uuidv4()
return {
    
    msg,alertType,id
}
}
export const removeAlert = (msg,alertType) => {
    return {
        type:REMOVE_ALERT,
       
    }
} 
