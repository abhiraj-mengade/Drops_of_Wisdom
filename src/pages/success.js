import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import axios from "axios";
import { Redirect } from 'react-router';


const Success = () => {

  const { user, setUser } = useContext(UserContext)  
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {  
    axios.get("/auth/user")  
        .then(res => {  
            console.log(res)  
            setUser(res.data.user)  
        })  
        .catch(err => {  
            console.log(err)  
        })  
}, [])   

  const logout = () => {
    axios.get("/auth/logout")  
        .then(res => {  
            console.log(res)  
            setUser({}) 
            setLoggedOut(true); 
        })  
        .catch(err => {  
            console.log(err)  
        }) 
  };

  if (loggedOut) {
    return <Redirect to="/login" push={true} />
  }
  return(
    <div class="jumbotron text-center">
    <div class="container">
      <i class="fas fa-tint fa-6x"></i>
      <h1>Login Successful {user.username}</h1>
  
      <a class="btn btn-light btn-lg" onClick={logout} role="button">Log Out</a>
      <a class="btn btn-dark btn-lg" href="/Home" role="button">Proceed</a>
    </div>
  </div>
  );
};

export default Success