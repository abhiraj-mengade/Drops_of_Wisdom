import React, { useContext,useState,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from "axios"



const Login = () => {

  const [newUser, setNewUser] = useState({username: "", password: ""});
  const [redirectTo, setRedirectTo] = useState("");

  const Onsubmit = async () =>  {
    const res = await axios.get("/auth/user").catch((err) => console.log(err));
    if(res.data.user) {
      console.log(res.data.user)
      setRedirectTo("/success");
    }
  }

  const LoginUser = (event) => {
    event.preventDefault();
    // setClicked(true);
    axios.post("/auth/login", newUser)
    .then((response) => {
      console.log(response);
      Onsubmit();
      
    }, (error) => {
      console.log(error);
      alert("Try Again! Wrong Username or Password")
    });
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setNewUser( (prevValues) => {
      return {...prevValues, [name]: value }
    })
  }
if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
	return (<div class="container mt-5">
    <h1>Login</h1>
  
    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">
  
           
            <form action>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" onChange={handleChange} value={newUser.username} name="username"></input>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" onChange={handleChange} value={newUser.password} name="password"></input>
              </div>
              <button type="submit" onClick={LoginUser} class="btn btn-dark">Login</button>
            </form>
  
          </div>
        </div>
      </div>
  
      <div class="col-sm-4">
  
        <div class="card">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
              <i class="fab fa-google"></i>
              Sign In with Google
            </a>
          </div>
        </div>
  
        <div class="card social-block">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
              <i class="fab fa-facebook"></i>
              Sign In with Facebook
            </a>
          </div>
        </div>
  
        <div class="card social-block">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-github" href="/auth/github" role="button">
              <i class="fab fa-github"></i>
              Sign In with GitHub
            </a>
          </div>
        </div>
  
      </div>
  
    </div>
  </div>);
};

export default Login