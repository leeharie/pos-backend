const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  console.log("GET HIT");
  const products = await Product.find();
  res.json(products);
});

// POST product
router.post("/", async (req, res) => {
  console.log("POST HIT");
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// ✅ PUT (UPDATE)
router.put("/:id", async (req, res) => {
  console.log("PUT HIT");

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  console.log("DELETE HIT");

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;