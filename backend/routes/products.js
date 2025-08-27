// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Add Product (associate with seller)
router.post('/', async (req, res) => {
  try {
    const { sellerId, sellerEmail, ...productData } = req.body;
    if (!sellerId && !sellerEmail) {
      return res.status(400).json({ error: 'sellerId or sellerEmail is required' });
    }
    // Use sellerId if present, else fallback to sellerEmail
    const product = new Product({
      ...productData,
      seller: sellerId,
      sellerEmail: sellerEmail ? sellerEmail.toLowerCase() : undefined,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to add product' });
  }
});

// Get products for a specific seller ("My Products")
router.get('/my-products/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ seller: sellerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
