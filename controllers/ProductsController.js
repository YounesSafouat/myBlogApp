const Product = require("../models/Product");
const User = require("../models/User");
//!--------index----------------------

exports.index = async (req, res) => {
  const data = await User.find({});
  // res.send(data)
  res.render("index");
};
exports.products = async (req, res) => {
  const data = await Product.find({});
  res.render("products", { data });
};