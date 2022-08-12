import React,{useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { alertAction } from "../../store";

export const Alert = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    setTimeout(()=>{
      dispatch(alertAction.removeAlert())
    },3000)
  },[Alert])
  const  alerts = useSelector(state=>state.alert)
  return(

    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={Math.random()} className={`alert alert-${alert.alertType}`} style = {{position:'fixed',top:100,right:'40%'}} >
        {alert.message}
      </div>
        )

    ));
};



export default Alert;
