const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  console.log("GET HIT");
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST product
router.post("/", async (req, res) => {
  console.log("POST HIT");

  const { name, price, quantity } = req.body;

  // ✅ Validation
  if (!name || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const product = new Product(req.body);
    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (UPDATE)
router.put("/:id", async (req, res) => {
  console.log("PUT HIT");

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // ✅ If product not found
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  console.log("DELETE HIT");

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    // ✅ If product not found
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;