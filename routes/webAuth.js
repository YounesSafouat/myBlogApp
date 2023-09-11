const express = require("express");
const { login, find, sign, newuser, signOut } = require("../controllers/UserController");
const { alreadyAuth } = require("../middleware/authMiddleware");


const router = express.Router();
router.get("/login", alreadyAuth,login);
router.post('/login',alreadyAuth, find);
router.get("/sign",alreadyAuth, sign);
router.post("/create",alreadyAuth, newuser);
router.get("/signout", signOut);

module.exports = router;
