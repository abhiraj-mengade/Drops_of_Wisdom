import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import axios from "axios";
import { Redirect } from 'react-router';

const NewPost = ()=>{
  const [newPost, setNewPost] = useState({title: "", content: ""});
  const {user, setUser} = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const registerPost = (event) => {
    event.preventDefault();
    // setClicked(true);
    axios.post("/post/newpost", {post: newPost})
    .then((response) => {
      console.log(response);
      setSubmitted(true);
    }, (error) => {
      console.log(error);
      alert("Try Again")
    });
  }
  useEffect(async () => {  
    await axios.get("/auth/user")  
        .then(res => {  
            console.log(res)  
            setUser(res.data.user)  
        })  
        .catch(err => {  
            console.log(err)  
        })  
}, []) 

const handleChange = (event) => {
  const {name, value} = event.target
  setNewPost( (prevValues) => {
    return {...prevValues, [name]: value }
  })
}
if (!user){
  return <Redirect to="/login" />; 
}

if(submitted){
  return <Redirect to="/posts" />;
}

    return(
    <div class="col-sm-8">
      <div class="card">
          <div class="card-body">

            {/* <SignupForm /> */}
      
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" name="title" onChange={handleChange} value={newPost.title}></input>
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <input type="text" class="form-control" name="content" onChange={handleChange} value={newPost.content}></input>
            </div>
            <div class="form-group">
              <label for="image">Image URL</label>
              <input type="text" class="form-control" name="image" onChange={handleChange} value={newPost.image}></input>
            </div>
            <button type="submit" class="btn btn-dark" onClick={registerPost}>Submit</button>

        </div>
      </div>
    </div>
    )

};

export default NewPost 