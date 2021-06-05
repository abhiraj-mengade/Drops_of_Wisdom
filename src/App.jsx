import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/signup';
import Home from './pages/index';
import { UserContext } from "./UserContext";
import Navibar from "./components/Navbar";



const App = () => {

  const [user, setUser] = useState(null);
  
  axios.get("/auth/user")
    .then(res => {
      setUser(res.user);
    });

  return (
    // 
    <Router>
      <Switch>
      <UserContext.Provider value={{user, setUser}}>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={() => <Home authorized={true} />} />
      </UserContext.Provider>
      </Switch>
    </Router>
    
  );
}

export default App;
