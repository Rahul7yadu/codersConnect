import React,{Fragment,useState} from 'react'
import {Link,Navigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {loadUser, loginUser} from '../../actions/auth'
import Alert from './Alert'
function Login() {
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  // 
const dispatch = useDispatch()
    const [formData,setFormData] = useState({
      
        email:'',
        password:'',
        
    })
    const{email,password} = formData
    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        
        dispatch(loginUser(formData))
        // dispatch(loadUser())
        
    }
    if(isAuthenticated){
      
      return <Navigate to = '/dashboard'/>
    }
        
  return (
    <Fragment>
<section className="container">
      <h1 className="large text-primary">Login into your account </h1>
      <p className="lead"><i className="fas fa-user"></i> Log in</p>
      <form className="form" onSubmit={e=>submitHandler(e)}>
        
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
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Register here</Link>
      </p>
      <Alert></Alert>
    </section>

    </Fragment>
  )
}

export default Login