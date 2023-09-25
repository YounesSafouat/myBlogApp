const Post = require("../models/Post");
const User = require("../models/User");
const Tag = require("../models/Tag");
const logger = require("../config/logger");
const moment = require("moment");

const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

const handleError = (err) => {
  console.log(err.message);
  let errors = { name: "", password: "", email: "" };
  if (err.message === "email does not exist") {
    errors.email = "incorrect email";
    return errors;
  }
  if (err.message === "password incorrect") {
    errors.password = "password incorrect";
  }
  if (err.code === 11000) {
    errors.email = "this email all ready exists";
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//!--------index----------------------
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const data = await Post.find({}).populate('user').exec();
  let isLog = false;
  if (token) {
    isLog = true;
  } else if (token === undefined) {
    isLog = false;
  }
  res.render("posts", { data, isLog });
};
//!--------find----------------------
// exports.find = async (req, res) => {
//   const token = req.cookies.token;
//   const name = req.params.name;
//   const data = await Post.find({})
//     .populate("user")
    
//   let isLog = false;
//   if (token) {
//     isLog = true;
//   } else if (token === undefined) {
//     isLog = false;
//   }
  
//   res.render("posts", { data, isLog });
// };
//!-----------create-------------------
exports.create = async (req, res) => {
  const tags = await Tag.find({});
  res.render("post", { tags });
};
//!-----------store--------------------
exports.store = async (req, res) => {
  const email = req.cookies.email;
  let { title, message, tags } = await req.body;
  const user = await User.findOne({ email });
  try {
    const post = await Post.create({
      user: user._id,
      title,
      message,
      tags,
      image: req.file.filename,
      time: currentTime,
    });
    res.redirect("..");
  } catch (erreur) {
    const errors = handleError(erreur);
    logger.error(errors);
    res.render("errorPage", { errors });
  }
};
//!-----------update--------------------
exports.update = async (req, res) => {
  let { id } = req.params;
  let { title, message } = req.body;
  let update = { title: req.body.title, message: req.body.message };
  try {
    const data = await Post.findByIdAndUpdate(id, {
      title: title,
      message: message,
    });
    res.redirect("/");
  } catch (erreur) {
    const errors = handleError(erreur);
    logger.error(errors);

    res.render("errorPage", { errors });
  }
};
//!-----------destroy--------------------
exports.destroy = async (req, res) => {
  let { id } = req.params;
  try {
    const data = await Post.findByIdAndDelete(id);
    res.redirect("/");
  } catch (erreur) {
    const errors = handleError(erreur);
    logger.error(errors);
    res.render("errorPage", { errors });
  }
};
