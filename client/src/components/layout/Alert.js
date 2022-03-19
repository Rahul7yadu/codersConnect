import React from "react";
import { useSelector } from "react-redux";


export const Alert = () => {
  const state = useSelector(state=>state)
  console.log(state)
  const alerts = useSelector(state=>state.alert)
  
  return(

    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
        )

    ));
};



export default Alert;
