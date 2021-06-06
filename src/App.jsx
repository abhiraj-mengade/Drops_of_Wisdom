import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Success from './pages/success';
import Register from './pages/signup';
import Home from './pages/index';
import { UserContext } from "./UserContext";
import Posts from "./pages/posts";



const App = () => {

  const [user, setUser] = useState({});
  
  // axios.get("/auth/user")
  //   .then(res => {
  //     setUser(res.user);
  //   });

  return (
    // 
    <Router>
      <Switch>
      <UserContext.Provider value={{user, setUser}}>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />

      </UserContext.Provider>
      </Switch>
    </Router>
    
  );
}

export default App;
