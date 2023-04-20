import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getCurrentProfile } from "./../../actions/profile";
import Spinner from "./../layout/Spinner";
import DashboardAction from './DashboardAction'
import Education from "./Education";
import Experience from './Experience'
import {deleteAccount} from '../../actions/profile'
import './dashboard.css'
import {auth} from '../../firebase'
const x = true;
const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.profile.loading);

  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  useEffect(async () => {
    
    dispatch(getCurrentProfile());
  }, []);
  
 


  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="dashboard">
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead text-secondary">
            <i className="fa fa-user" />
            Welcome {user && user.name}
          </p>
          <div>
            {profile.length>0 ? (
              <>
              
              <DashboardAction/>
                {profile[0].experience&&<Experience experience={profile[0].experience}/>}
                
                {profile[0].education&&<Education education = {profile[0].education}/>}
                <div className="my-2">
                <button className="btn btn-danger" onClick = {()=>dispatch(deleteAccount())}><i className="fa fa-user-minus"></i>Delete my Account</button>
                </div>
              </>
            ) : (
              <>
                <p>you have not set up the profile</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  create Profile
                </Link>
                <button className="btn btn-danger" onClick = {()=>dispatch(deleteAccount())}><i className="fa fa-user-minus"></i>Delete my Account</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
