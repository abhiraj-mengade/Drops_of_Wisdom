import axios from "axios"
import { useState } from "react"
import {Card, Button} from "react-bootstrap" 

const Post = (props)=>{

  const [liked, setLiked] = useState(false)

  const checkLike = () => {
    axios.post("/post/like", {postId: props.id})
    .then((res) => {
      console.log(res);
      setLiked(res.data.liked);
    }, (error) => {
      console.log(error);
      alert("Try Again")
    });
  }

  return(
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={props.image} />
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
      {props.content}
    </Card.Text>
  </Card.Body>
  <Card.Footer>
  {liked? <i class="fab fa-gratipay 2x" onClick={checkLike}></i>: <i class="far fa-heart 2x" onClick={checkLike}></i>}
    <h5>{props.likes}</h5>
  </Card.Footer>
</Card>)

}
export default Post;