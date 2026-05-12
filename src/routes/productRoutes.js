const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ GET with Search Functionality
router.get("/", async (req, res) => {
  console.log("GET HIT");

  try {
    const { search } = req.query;

    let query = {};

    // 🔍 Search by product name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);

    res.json({ 
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ✅ POST
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ✅ PUT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;