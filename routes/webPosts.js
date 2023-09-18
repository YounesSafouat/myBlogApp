const express = require("express");
const { alreadyAuth } = require("../middleware/authMiddleware");
const { index, create,store, update, destroy } = require("../controllers/PostController");


const router = express.Router();
router.get("/all",alreadyAuth,index);
router.get("/",alreadyAuth,create);
router.post("/",alreadyAuth,store);
router.post("/update/:id",alreadyAuth,update);
router.post("/delete/:id",alreadyAuth,destroy);
router.get("/tags/:name",alreadyAuth, find);

module.exports = router;
