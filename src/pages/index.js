import React, { useContext } from 'react'
import { UserContext } from '../UserContext';

const Home = () => {

  const {user, setUser} = useContext(UserContext);

  return(
    <div class="jumbotron centered">
     <div class="container">
      <i class="fas fa-tint fa-6x"></i>
      <h1 class="display-3">Drops of Wisdom</h1>
      <p class="lead">An Instagram of Knowledge!</p>
      <hr/>
      <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
      <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>
     </div>
    </div>

  );
};
export default Home;