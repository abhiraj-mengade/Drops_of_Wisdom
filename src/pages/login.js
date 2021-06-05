import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from "axios"


const Login = () => {

	const {user, setUser} = useContext(UserContext);
	return (<div class="container mt-5">
    <h1>Login</h1>
  
    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">
  
           
            <form action="/auth/login" method="POST">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="username"></input>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password"></input>
              </div>
              <button type="submit" class="btn btn-dark">Login</button>
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