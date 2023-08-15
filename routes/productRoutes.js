const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "yourSecretKey";
const authenticateToken = require("./token")
// ========== Product get ============
// router.get("/gets",authenticateToken, async (req, res) => {
//   try {
//     const product = await Product.find();
//     return res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/gets",authenticateToken, async (req, res) => {
  try {
    const product = await Product.find();
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/check",authenticateToken, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedData = jwt.verify(token, secretKey); 
    const product = await Product.findOne();
    return res.json(decodedData);
  } catch (error) {
    return res.status(404).json({ error: "User not found" });
  }
});
// ========== Product insert ==========

router.post("/insert",authenticateToken, async (req, res) => {
    const {
      productname,
      brand,
      imageurl,
      colour,
      price,
      ratings,
      offers,
      ram,
      userId,
      userName,
    } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const decodedData = jwt.verify(token, secretKey); 
    try {
      const newProduct = new Product({
        productname,
        brand,
        imageurl,
        colour,
        price,
        ratings,
        offers,
        ram,
        userId:decodedData.user._id,
        userName:decodedData.user.name,
      });
      const savedProduct = await newProduct.save();
      
      const response = {
        decodedData,
        message: "Product Added Successfully",
      };
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Decode token 
// router.post("/decodes", (req, res) => {
//   const token = req.headers["authorization"].split(" ")[1];
//   const decodedData = jwt.verify(token, secretKey); 

//   res.json(decodedData);
// });
  

//  ========== Product update ==========

router.put("/update/:id",authenticateToken, async (req, res) => {
  const {
    productname,
    brand,
    imageurl,
    colour,
    price,
    ratings,
    offers,
    ram,
    userId,
  } = req.body;
  const productId = req.params.id;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productname,
        brand,
        imageurl,
        colour,
        price,
        ratings,
        offers,
        ram,
        userId,
      },
      { new: true }
    );
    // res.send("Product Updated Successfully");
    res.send(`Product Updated Successfully \n userId: ${updateProduct._id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== Product delete ==========

router.delete("/delete/:id",authenticateToken, async (req, res) => {
  const productId = req.params.id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.json(` This user productId: ${deleteProduct._id} Deleted Successfully `);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;
