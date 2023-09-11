const cookieParser = require("cookie-parser");
const User = require("../models/User");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const expDay = 60 * 60 * 24;
//! handle errors for new user--------------------
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
  res.redirect('/')
};
//!--------find----------------------

exports.find = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = tokenGen(user._id);
    res.cookie("token", token, { maxAge: expDay * 1000, httpOnly: true });
    res.redirect('/products')
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
  let data = await req.body;
  try {
    const user = await User.create(data);
    const token = tokenGen(user._id);
    res.cookie("token", token, { maxAge: expDay * 1000, httpOnly: true });
    res.redirect("/products");
  } catch (erreur) {
    const errors = handleError(erreur);
    res.render("errorPage", { errors });
    // res.json(errors)
  }
};
