const mongoose = require("mongoose");
const TagSchema = new mongoose.Schema({
  tag: {
    type: "string",
  },
    
});
const Tag = mongoose.model("Tags", TagSchema);
module.exports = Tag;
