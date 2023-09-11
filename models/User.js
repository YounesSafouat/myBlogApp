const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "the name is required"],
  },
  email: {
    type: "string",
    required: [true, "the email is required"],
    validate: [isEmail, "please enter a lvalid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: "string",
    required: [true, "the password is required"],
    minlength: [6, "the password must be at least 6 characters"],
  },
  avatar: {
    type: "number",
  },
  id: {
    type: "number",
  },
});
//? before saving in the database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email})
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('password incorrect')
  }
  throw Error('email does not exist')
}
//? after saving in the database
UserSchema.post("save", function (doc, next) {
  next();
});

const Product = mongoose.model("users", UserSchema);
module.exports = Product;
