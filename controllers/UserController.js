const cookieParser = require("cookie-parser");
const User = require("../models/User");
const express = require("express");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { mailer } = require("../nodeMailer");
const path = require('path');
const parentPath = path.resolve(__dirname, '..');
const fs = require('fs');
const mailcontent = fs.readFileSync(parentPath+'/public/index.html','utf-8')
const app = express();
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const expDay = 60 * 60 * 24;
//! handle errors for new user--------------------
const handleError = (err) => {
  logger.error(err.message )
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
//! create token ----------------------
const tokenGen = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: expDay,
  });
};
//!--------login----------------------

exports.login = async (req, res) => {
  res.render("login");
};
//!--------logout----------------------

exports.signOut = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('email');
  res.redirect('/')
};
//!--------find----------------------

exports.find = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = tokenGen(user._id);
    res.cookie("token", token, { maxAge: expDay * 1000, httpOnly: true });
    res.cookie("email", email, { maxAge: expDay * 1000, httpOnly: true });
    res.redirect('/user/login')
  } catch (erreur) {
    const errors = handleError(erreur);
    
    res.render("errorPage", { errors });
  }
};
//!--------sign----------------------

exports.sign = async (req, res) => {
  const users = (await User.find({})).length + 1;
  res.render("signup", { users });
};

//!--------newuser--------------------

exports.newuser = async (req, res) => {
  let {id,name,email,password} = await req.body;
  console.log(req.file);
  try {
    const user = await User.create({id,name,email,password,image:req.file.filename});
    const token = tokenGen(user._id);
    res.cookie("token", token, { maxAge: expDay * 1000, httpOnly: true });
    res.cookie("email", email, { maxAge: expDay * 1000, httpOnly: true });
    mailer(email,"new account created in our blog",mailcontent.replace('Michele',name))
    res.redirect("/");
  } catch (erreur) {
    const errors = handleError(erreur);
    logger.error(errors)
    res.render("errorPage", { errors });
  }
};
