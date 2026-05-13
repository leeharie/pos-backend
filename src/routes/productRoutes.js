const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// ✅ GET PRODUCTS + SEARCH
router.get("/", async (req, res) => {

  try {

    const { search } = req.query;

    let query = {};

    // SEARCH BY NAME
    if (search) {

      query.name = {
        $regex: search,
        $options: "i"
      };

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


// ✅ ADD PRODUCT
router.post("/", async (req, res) => {

  try {

    const product = new Product({

      name: req.body.name,

      price: req.body.price,

      quantity: req.body.quantity,

      image: req.body.image

    });

    await product.save();

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// ✅ UPDATE PRODUCT
router.put("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(

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


// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


module.exports = router;