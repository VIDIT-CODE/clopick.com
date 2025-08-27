const express = require('express');
const router = express.Router();
const SellerProduct = require('../models/SellerProduct');

// Create a new product
router.post('/products', async (req, res) => {
  const { title, description, price, sellerId } = req.body;

  if (!title || !description || !price || !sellerId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = await SellerProduct.create(req.body);
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
});

// Get all products for a seller
router.get('/products', async (req, res) => {
  const { sellerId } = req.query;

  if (!sellerId) {
    return res.status(400).json({ message: 'Seller ID is required' });
  }

  try {
    const products = await SellerProduct.find({ sellerId });
    res.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedProduct = await SellerProduct.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await SellerProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});

// No backend changes are needed for mobile responsiveness.
// Mobile responsiveness should be handled in your frontend code (React components and CSS).

module.exports = router;