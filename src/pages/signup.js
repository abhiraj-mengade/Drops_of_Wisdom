import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
import SignupForm from "../components/SignupForm";

const Register = () => {
    const {user, setUser} = useContext(UserContext);
    return(
        <div class="container mt-5">
  <h1>Register</h1>

  <div class="row">
    <div class="col-sm-8">
      <div class="card">
        <div class="card-body">

            {/* <SignupForm /> */}
        
          <form action="/auth/register" method="POST">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="username"></input>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password"></input>
            </div>
            <button type="submit" class="btn btn-dark">Register</button>
          </form>

        </div>
      </div>
    </div>

    <div class="col-sm-4">

      <div class="card">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-google" href="./google" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
        </div>
      </div>

      <div class="card social-block">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-facebook" href="./facebook" role="button">
            <i class="fab fa-facebook"></i>
            Sign Up with Facebook
          </a>
        </div>
      </div>

      <div class="card social-block">
        <div class="card-body">
          <a class="btn btn-block btn-social btn-github" href="./github" role="button">
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