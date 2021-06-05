import React, { useContext } from 'react'
import { UserContext } from '../UserContext';

const Home = () => {

  const {user, setUser} = useContext(UserContext);

  return(
    <div className="jumbotron centered">
     <div className="container">
      <i className="fas fa-tint fa-6x"></i>
      <h1 className="display-3">Drops of Wisdom</h1>
      <p className="lead">An Instagram of Knowledge!</p>
      <hr/>
      <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
      <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
     </div>
    </div>

  );
};
export default Home;