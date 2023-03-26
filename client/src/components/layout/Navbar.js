import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

function Navbar() {
  const [theme,setTheme] = useState('light')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading);
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  const changeHandler = ()=>{
  setTheme(prev=>prev=='light'?'dark':'light')
  }
  useEffect(()=>{
    const root = document.querySelector(":root");
    if(theme==='dark'){
     
    root.style.setProperty("--primary-color",' #B5F1CC')
    root.style.setProperty("--dark-color","#C9F4AA")
    root.style.setProperty("--light-color","#E5FDD1")
    root.style.setProperty("--danger-color","#E94560")
    root.style.setProperty("--success-color","#03C988")
    }else{
    root.style.setProperty("--primary-color",'#189AB4')
    root.style.setProperty("--dark-color","#05445E")
    root.style.setProperty("--light-color","#D4F1F4")
    root.style.setProperty("--danger-color","#e54353")
    root.style.setProperty("--success-color","#75E6DA")
    }
  },[theme])
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
        <button
            className="btn btn-primary"
             onClick= {e=>changeHandler(e)}
            >{theme=='light'?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}
        </button>
      </li>
    </ul>
  );
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
        <Fragment>{!isAuthenticated||isAuthenticated===null ? guestLinks : authLinks}</Fragment>
      }
    </nav>
  );
}

export default Navbar;
