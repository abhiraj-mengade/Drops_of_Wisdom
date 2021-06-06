import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';
import SignupForm from "../components/SignupForm";
import axios from "axios"

const Register = () => {
    const [newUser, setNewUser] = useState({username: "", password: ""});
    const [redirectTo, setRedirectTo] = useState("");

    // useEffect(() => {
    //   async function fetchData(setRegistered, newUser) {
    //       console.log(newUser)
    //       const postrequest = await axios.post("/auth/register", newUser).catch((err) => console.log(err));
    //       // setRegistered(true);
    //       // const getrequest = await axios.get("/auth/user").catch((err) => console.log(err));
    //       // setUser(getrequest.data.user);
    //       // console.log(user.username)
    //       console.log(postrequest);
    //   }
    //   if (clicked) {
    //     fetchData(setRegistered, newUser);
    //     setClicked(false)
    //   }
    // }, [clicked])
    const Onsubmit = async () =>  {
      const res = await axios.get("/auth/user").catch((err) => console.log(err));
      if(res.data.user) {
        console.log(res.data.user)
        setRedirectTo("/success");
      }
    }

    const registerUser = (event) => {
      event.preventDefault();
      // setClicked(true);
      axios.post("/auth/register", newUser)
      .then((response) => {
        console.log(response);
        Onsubmit();
        
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

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
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