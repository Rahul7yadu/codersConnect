import React,{Fragment,useState} from 'react'
import {Link,Navigate} from 'react-router-dom'

import {setAlert,removeAlert} from '../../actions/alert'
import {register,} from '../../actions/auth'
import {alertAction,authAction} from '../../store'
import { useDispatch,useSelector } from 'react-redux'
import Alert from './Alert'



function Register({}) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
      const [formData,setFormData] = useState({
       name:'',
        email:'',
        password:'',
        password2:''
       
    })
    const{name,email,password,password2} = formData
    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==password2){
          dispatch(alertAction.setAlert({message:'password not match',alertType:'danger'}))
            
        }else{
         dispatch(alertAction.removeAlert())
          //  dispatch(register2({name,email,password}))
          dispatch(register({name, email, password}))
         
            
        }
    }
    if(isAuthenticated){
      return <Navigate to = '/dashboard'/>
    }
     
        
  return (
    <Fragment>
<section className="container bg-light">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>submitHandler(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required value={name} onChange = {e=>changeHandler(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange = {e=>changeHandler(e)}/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
          placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange = {e=>changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange = {e=>changeHandler(e)}
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>

    </Fragment>
  )
}



export default Register