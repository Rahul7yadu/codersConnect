import { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";

import Alert from "./components/layout/Alert"
// redux

import AddProfile from "./components/layout/AddProfile";

function App() {
  return (
    
    <Router>
      <Fragment>
        <Navbar></Navbar>
       <Routes>
          <Route exact path='/' element={<Landing/>}/>
       </Routes>
       
         
      

       <Routes>
          <Route exact path='/login' element = {<Login/>}></Route>
          <Route exact path='/register' element = {<Register/>}></Route>
          <Route exact path = '/register/add-profile' element = {<AddProfile></AddProfile>}></Route>
       </Routes>
    </Fragment>
    </Router>
    
  );
}


export default App;
