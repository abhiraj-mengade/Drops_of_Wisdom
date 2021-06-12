import React, {useContext, useEffect} from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { UserContext } from "../UserContext";
import axios from "axios";
const Navibar = () => {

  const {user, setUser} = useContext(UserContext);
  useEffect(() => {  
    async function getUser() {
      await axios.get("/auth/user")  
        .then(res => {  
            console.log(res)  
            setUser(res.data.user)  
        })  
        .catch(err => {  
            console.log(err)  
        });
    }

    getUser();
    
  }, [])   

    return(
        <Navbar bg="light" expand="lg">
  <Navbar.Brand>Drops of Wisdom</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/success">Home</Nav.Link>
      
      {user? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
      {user? <Nav.Link href="/posts">Posts</Nav.Link> : <Nav.Link></Nav.Link>}
        
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}
export default Navibar;