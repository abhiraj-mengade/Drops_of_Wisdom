import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Logout from "./pages/logout";
import Success from './pages/success';
import Register from './pages/signup';
import Home from './pages/index';
import { UserContext } from "./UserContext";
import Posts from "./pages/posts";
import Navibar from "./components/Navbar";
import NewPost from "./pages/newpost";



const App = () => {

  const [user, setUser] = useState({});
  
  // axios.get("/auth/user")
  //   .then(res => {
  //     setUser(res.user);
  //   });

  return (
    // 
    <UserContext.Provider value={{user, setUser}}>
      <Navibar />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/createpost" component={NewPost} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>          
   </UserContext.Provider>
  );
}

export default App;
