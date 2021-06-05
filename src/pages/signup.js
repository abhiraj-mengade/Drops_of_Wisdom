import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
import SignupForm from "../components/SignupForm";
import axios from "axios"

const Register = () => {
    const {user, setUser} = useContext(UserContext);
    const [newUser, setNewUser] = useState({});

    const registerUser = () => {
      console.log(newUser);
      axios.post("/auth/register",{"username": newUser.username, "password": newUser.password})
      .then((response) => {
        console.log(response);
        setUser(response.data.user)
      }, (error) => {
        console.log(error);
        alert("Try Again")
      });
    }

    const handleChange = (event) => {
      const {name, value} = event.target
      setNewUser( (prevValues) => {
        return {...prevValues, [name]: value }
      })
    }

    if (user.username) {
      return <Redirect to="/success" push={true} />
    }
    return(
        <div class="container mt-5">
  <h1>Register</h1>

  <div class="row">
    <div class="col-sm-8">
      <div class="card">
        <div class="card-body">

            {/* <SignupForm /> */}
        
          <form>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="username" onChange={handleChange} value={newUser.username}></input>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password" onChange={handleChange} value={newUser.password}></input>
            </div>
            <button type="submit" class="btn btn-dark" onClick={registerUser}>Register</button>
          </form>

        </div>
      </div>
    </div>

    <div class="col-sm-4">

      <div class="card">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
        </div>
      </div>

      <div class="card social-block">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
            <i class="fab fa-facebook"></i>
            Sign Up with Facebook
          </a>
        </div>
      </div>

      <div class="card social-block">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-github" href="/auth/github" role="button">
            <i class="fab fa-github"></i>
            Sign Up with GitHub
          </a>
        </div>
      </div>

    </div>

  </div>
</div>
    );
};
export default Register