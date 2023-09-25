const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  message: {
    type: "string",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: "string",
  },
  image: {
    type: "string",
  },
  time: {
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
