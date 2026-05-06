const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ GET with search + pagination + sorting
router.get("/", async (req, res) => {
  console.log("GET HIT");

  try {
    const { search, page = 1, limit = 5, sort = "asc" } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const total = await Product.countDocuments(query);

    const sortOption = sort === "desc" ? -1 : 1;

    const products = await Product.find(query)
      .sort({ price: sortOption })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      totalProducts: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
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