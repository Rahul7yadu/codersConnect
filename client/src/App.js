import { Fragment,useEffect } from "react";
import Profile from './components/layout/Profile/Profile'
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import setAuthToken from './utils/setAuthToken'
import Alert from "./components/layout/Alert"
import { loadUser } from './actions/auth'
import AdminLogin from './components/layout/AdminLogin'
// redux
import {useDispatch,useSelector} from 'react-redux'
import AddProfile from "./components/layout/AddProfile";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from './components/layout/Profiles/Profiles'
import Posts from "./components/posts/Posts";
import Post from './components/post/Post'
import {PrivateRoute} from "./components/PrivateRoute";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
// localStorage.removeItem('token')


function App() {
const dispatch = useDispatch()
const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)

const token = useSelector(state=>state.auth.token)

useEffect(()=>{
  
 if (localStorage.token) {
  
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
      dispatch(loadUser())
    } 
  
if(isAuthenticated){
  dispatch(loadUser())
}



},[isAuthenticated,token,dispatch])
  

  return (
    
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Alert/>
       <Routes>
          <Route exact path='/' element={<Landing/>}/>
       </Routes>
       
         
      

       <Routes>
          <Route exact path='/profile/:id' element={<Profile/>}/>
          <Route exact path='/profiles' element={<Profiles/>}/>
          <Route exact path='/login' element = {<Login/>}></Route>
          <Route exact path='/register' element = {<Register/>}></Route>
          <Route exact path='/dashboard' element = {<PrivateRoute component={<Dashboard/>}/>}></Route>
          <Route exact path='/create-profile' element = {<PrivateRoute component={<CreateProfile/>}/>}/>
          <Route exact path = '/register/add-profile' element = {<PrivateRoute component={<AddProfile></AddProfile>}/>}></Route>
          <Route exact path = '/edit-profile' element = {<PrivateRoute component={<EditProfile/>}/>}/>
          <Route exact path = '/admin/login' element = {<AdminLogin/>}></Route>
          <Route exact path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          <Route exact path = '/add-education' element = {<PrivateRoute component={<AddEducation/>}/>}></Route>
          <Route exact path = '/add-experience' element = {<PrivateRoute component ={<AddExperience/>}/>}></Route>
          <Route exact path = '/posts' element = {<PrivateRoute component={<Posts/>}/>} />
          <Route exact path = '/post/:id' element = {<PrivateRoute component={<Post/>}/>}/>
       </Routes>
    </Fragment>
    </Router>
    
  );
}


export default App;
