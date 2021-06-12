import React, { useContext, useEffect, useState } from 'react'
import Post from '../components/Card';
import { Redirect } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from "axios"

const Posts = ()=>{
    const {user, setUser} = useContext(UserContext);
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [clicked, setClicked] = useState(false);
    
    
    
    
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

    useEffect(async () => {  
        await axios.get("http://localhost:8080/post", user)  
            .then(res => {  
                console.log(res);
                setPost(res.data.post);
                console.log(post);
                //post.image = "http://lorempixel.com/250/25" + (Math.floor(Math.random() * 10)).toString();
    

            })  
            .catch(err => {  
                console.log(err)  
            })  
    }, [clicked])  

    useEffect(async () => {  
        await axios.get("http://localhost:8080/post/user")  
            .then(res => {  
                console.log(res);
                //setPosts(res.data.posts);
                //post.image = "http://lorempixel.com/250/25" + (Math.floor(Math.random() * 10)).toString();
    

            })  
            .catch(err => {  
                console.log(err)  
            })  
    }, [])  

    // console.log(user.posts);
    // setPosts(user.posts);


     
     
    //  const onSubmit = async () =>  {
    //      const res = await axios.get("http://localhost:8080/post").catch((err) => console.log(err));
    //      if(res.data) {
    //          console.log(res.data)
    //          setPost(res.data.post)
    //      }
    //    }
     if (!user){
         return <Redirect to="/login" />; 
     }
    
    return(
        <div  class= "container-fluid">
        <center>
        <h2>Current Hot Post</h2>
        <div class="d-flex justify-content-center" >
         <Post title={post.title} image ={post.image}  content={post.content} likes={post.likes} comments={post.comments} />
         </div>
         <button type="submit"  onClick= {() => setClicked(!clicked)} class="btn btn-dark">Next</button> 
         <p>Click here to make a new post</p>
         <h1>Your Posts</h1>
         {posts? posts.map(post => {
            return <Post title={post.title} image ={post.image} content={post.content} likes={post.likes} comments={post.comments} />
                } ) : <p>No posts available!</p>} 
        {/* <Post title={posts.title} image ={posts.image}  content={posts.content} likes={posts.likes} comments={posts.comments} /> */}
            
         </center>
        </div>
    );
};
export default Posts;
