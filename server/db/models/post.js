const mongoose = require("mongoose");
const express = require("express");
const User = require("./user");
const strategy = require("../../passport/Strategies/googleStrategy");
const postRouter = express.Router();


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments:[{username:String, comment:String}],
    likes: [mongoose.ObjectId],
    image: {type: String, default: "http://lorempixel.com/250/25" + (Math.floor(Math.random() * 10)).toString()}
});

const Post = new mongoose.model("Post", postSchema);
postRouter.get("/",(req, res) =>{
    //  console.log(req.user)
     Post.count().exec(function (err, count) {
         var random = Math.floor(Math.random() * count)
         Post.findOne().skip(random).exec(
         function (err, result) {
             return res.json({post: result, error: err})
         })
     })
    })



    postRouter.get("/user",(req, res) =>{
      Post.find({_id: req.user.posts}, (err, foundPosts) => {
        res.json({posts: foundPosts, error: err});
      })
        });

postRouter.post("/newpost", (req, res) => {
  console.log(req.body);
  const newPost = new Post ({
    title: req.body.post.title,
    content: req.body.post.content,
    image: req.body.post.image
  });
  newPost.save();
  // res.send({err:null})
  res.redirect("/user/addpost/?postid=" + newPost._id)
  /*User.findById(req.user._id, (err, foundUser) => {
    if (!err) {
        foundUser.posts.push(req.query.postid);
        foundUser.save();
        return res.json({error: null});
    }
    else {
        console.log(err);
        return res.json({error: err});
    }
})*/
    });

postRouter.post("/like", (req, res) => {
  Post.findById(req.body.postId, (err, foundPost) => {
    foundPost.likes.map(userId => {
      if (userId === req.user._id) {
        foundPost.likes.pull(userId);
        return res.json({liked: false});
      }
    });
    foundPost.likes.push(req.user._id);
    return res.json({liked: true});
  })
});
module.exports = postRouter;
exports.postSchema = postSchema;
