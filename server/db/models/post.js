const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments:[{username:String, comment:String}],
    likes: {type: Number, default: 0}
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
exports.postSchema = postSchema;