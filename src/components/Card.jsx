import {Card, Button} from "react-bootstrap" 

const Post = (props)=>{
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="http://lorempixel.com/250/250/" />
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

}
export default Post;