require("dotenv").config();
const jwts = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwts.verify(token, secretKey, (error, decodedToken) => {
      if (error) {
        res.redirect("/user/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/user/login");
  }
};
exports.alreadyAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    res.redirect("..");
  } else {
    next();
  }
};
