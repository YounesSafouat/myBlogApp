const Product = require("../models/Product");
const User = require("../models/User");
const Post = require("../models/Post");
//!--------index----------------------
exports.index = async (req, res) => {
let isLog = false;
  const token = req.cookies.token;
  const email = req.cookies.email;
  const user = await User.findOne({email});
  let posts = false
  if (!user) {
    let posts = false
  }else {
    posts = await Post.find({user : user._id});
  }
  if (token) {
    isLog = true;
  }else if(token === undefined){
    isLog = false;
  }
  res.render("index", { isLog,user,posts });
};
//!--------------------------------------
exports.products = async (req, res) => {
let isLog = false;
  const token = req.cookies.token;

  const data = await Product.find({});
  if (token) {
    isLog = true;
  }else if(token === undefined){
    isLog = false;
  }
  res.render("products", { data, isLog });
};
