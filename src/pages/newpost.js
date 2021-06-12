import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import axios from "axios";
import { Redirect } from 'react-router';

const Newpost = ()=>{
    return(
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
    )

};

export default Newpost 