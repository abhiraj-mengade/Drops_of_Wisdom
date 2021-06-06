const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");
const { postSchema } = require("./post");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    googleId: String,
    facebookId: String,
    githubId: String,
    posts: [postSchema]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
module.exports = User;