import React, { useContext } from 'react'
import Post from '../components/Card';
import { Redirect } from "react-router-dom";
import { UserContext } from '../UserContext';

const Posts = ()=>{
    const {user, setUser} = useContext(UserContext);
    if (!user.username){
        return <Redirect to="/login" />; 
    }

    return(
        user.posts.map(post => {
            return <Post title={post.title} content={post.content} likes={post.likes} comments={post.comments} />
        } )
    );
};
export default Posts;