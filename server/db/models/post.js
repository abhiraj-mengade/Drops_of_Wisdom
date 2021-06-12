const mongoose = require("mongoose");
const express = require("express");
const User = require("./user");
const postRouter = express.Router();


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments:[{username:String, comment:String}],
    likes: {type: Number, default: 0},
    image: {type: String, default: "http://lorempixel.com/250/250/"}
});

const Post = new mongoose.model("Post", postSchema);
postRouter.get("/",(req, res) =>{
     console.log(req.user)
     Post.count().exec(function (err, count) {
         var random = Math.floor(Math.random() * count)
         Post.findOne().skip(random).exec(
         function (err, result) {
             return res.json({post: result, error: err})
         })
     })
    })



    postRouter.get("/user",(req, res) =>{
      //console.log(req.user)
      return res.json(req.user);
        });

postRouter.post("/post", (req, res) => {
    User.findOne({username: req.body.username}, function(err, foundUser){
        if(!err){
          foundUser.posts.push(req.body.post);
          foundUser.save()
          res.send({error: null});
        }
        else{
          console.log(err);
          res.send({errpr: err});
        }
      });
})

module.exports = postRouter;
exports.postSchema = postSchema;