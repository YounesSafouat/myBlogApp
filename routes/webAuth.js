const express = require("express");
const {
  login,
  find,
  sign,
  newuser,
  signOut,
} = require("../controllers/UserController");
const { alreadyAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const currentTime = moment().format("YYYY-MM-DD HH:mm:ss").replace(' ','').replace('-','').replace(':','');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pictures/users");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null,currentTime.toString() +Math.floor(Math.random() * 10) + 1+ path.extname(file.originalname))
  },
});
const upload = multer({ storage: storage });

const router = express.Router();
router.get("/login", alreadyAuth, login);
router.post("/login", alreadyAuth, find);
router.get("/sign", alreadyAuth, sign);
router.post("/create", upload.single("image"), newuser);
router.get("/signout", signOut);

module.exports = router;
