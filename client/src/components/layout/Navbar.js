import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

function Navbar() {
  // const [theme,setTheme] = useState('light')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const isAdminLoggedIn = useSelector(state=>state.admin.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading);
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  // const changeHandler = ()=>{
  // setTheme(prev=>prev=='light'?'dark':'light')
  // }
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to ='/admin/login'>Admin login</Link>
      </li>
      <li>
      </li>
    </ul>
  );
  const adminLinks = (
    <ul>
      <li>
        <button onClick={logoutHandler}>
        logout
        </button>
          
      </li>
    </ul>
  )
  const authLinks = (
    <ul>
      <li><i className="fa-solid fa-address-card"></i>
        <Link to="/dashboard"> Dashboard</Link>
      </li>
      <li>
        <i className=""><Link to="/posts"> posts</Link></i>
      </li>
      <li>
        <i className=""><Link to ='/profiles'> Developers</Link>
        </i>
      </li>
      <li >
        <a onClick={logoutHandler}>
          <i className=""></i><span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <div  style = {isAuthenticated?{backgroundColor:'green',borderRadius:'50%',height:'10px',width:'10px'}:{backgroundColor:'red',borderRadius:'50%'}}></div>
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> CoderzConnector 
        </Link>
      </h1>
      {
        <Fragment>{isAuthenticated || !isAuthenticated===null  ? authLinks : isAdminLoggedIn?adminLinks: guestLinks}</Fragment>
        
      }
    </nav>
  );
}

export default Navbar;
