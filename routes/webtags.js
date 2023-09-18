const express = require("express");
const { alreadyAuth } = require("../middleware/authMiddleware");
const { create, store } = require("../controllers/TagsController");



const router = express.Router();

router.get("/",create);
router.post("/",store);

module.exports = router;
