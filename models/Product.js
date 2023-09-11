const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  price: {
    type: "Number",
  },
  type: {
    type: "string",
  },
  description: {
    type: "string",
  },
  id: {
    type: "string",
  },
});
const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
