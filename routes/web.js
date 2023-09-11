const express = require("express");
const { index, products } = require("../controllers/ProductsController");
const { requireAuth, alreadyAuth } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", index);
router.get("/products", requireAuth,products);
module.exports = router;
