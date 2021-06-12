const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");
const { postSchema } = require("./post");
const express = require("express");
const userRouter = express.Router();

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    googleId: String,
    facebookId: String,
    githubId: String,
    posts: [mongoose.ObjectId]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

userRouter.get("/addpost", (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if (!err) {
            foundUser.posts.push(req.query.postid);
            foundUser.save();
            return res.json({error: null});
        }
        else {
            console.log(err);
            return res.json({error: err});
        }
    })
})

const User = new mongoose.model("User", userSchema);
module.exports = {User, userRouter};