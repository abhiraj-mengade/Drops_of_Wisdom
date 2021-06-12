import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import axios from "axios";
import { Redirect } from 'react-router';

const Logout = () => {
    const { user, setUser } = useContext(UserContext);
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
          {user? 
            <div>
                <h1>Do you wish to logout?</h1>
                <a class="btn btn-light btn-lg" onClick={logout} role="button">Log Out</a>
            </div>
            :
            <div> 
                <h1>Sorry, you are not logged in</h1> 
                <a class="btn btn-light btn-lg" href="/login">Login</a>
            </div>}
        </div>
      </div>
      );
    };

export default Logout;


