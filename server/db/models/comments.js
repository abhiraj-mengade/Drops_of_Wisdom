const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    id:
    title: String,
    content: String,
    comments:
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
exports.postSchema = postSchema;