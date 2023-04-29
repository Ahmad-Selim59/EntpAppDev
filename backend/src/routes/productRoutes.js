const express = require("express");
const {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/prodcutController");

const router = express.Router();
router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
