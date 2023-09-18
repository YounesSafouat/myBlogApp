const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  message: {
    type: "string",
  },
  user: {
    type: "string",
  },
  email: {
    type: "string",
  },
  title: {
    type: "string",
  },
  tags: {
    type: "array",
  },
  likes: {
    type: "number",
    default : 0
  },
  
});
const Post = mongoose.model("Posts", PostSchema);
module.exports = Post;
