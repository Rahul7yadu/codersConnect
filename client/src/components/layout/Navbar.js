import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
function Navbar() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading);
  const logoutHandler = ()=>{
    dispatch(logout())
  }
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
    </ul>
  );
  const authLinks = (
    <ul>
      <li><i className="fa-solid fa-address-card"></i>
        <Link to="/dashboard"> Dashboard</Link>
      </li>
      <li>
        <Link to="/posts"> posts</Link>
      </li>
      <li>
        <i className="fab fa-connectdevelop"><Link to ='/profiles'> Developers</Link>
        </i>
      </li>
      <li>
        <a onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i><span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <div  style = {isAuthenticated?{backgroundColor:'green',borderRadius:'50%',height:'10px',width:'10px'}:{backgroundColor:'red',borderRadius:'50%'}}></div>
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {
        <Fragment>{!isAuthenticated||isAuthenticated===null ? guestLinks : authLinks}</Fragment>
      }
    </nav>
  );
}

export default Navbar;
