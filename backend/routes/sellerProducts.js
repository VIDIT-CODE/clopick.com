const express = require('express');
const router = express.Router();
const SellerProduct = require('../models/Seller').SellerProduct;

// GET /api/seller/products?sellerEmail=...
router.get('/', async (req, res) => {
  let sellerEmail = req.query.sellerEmail;
  if (!sellerEmail) {
    return res.status(400).json({ message: 'sellerEmail is required' });
  }
  sellerEmail = sellerEmail.toLowerCase();
  try {
    // Fetch products for this sellerEmail (case-insensitive, but stored as lowercase)
    const products = await SellerProduct.find({ sellerEmail });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// POST /api/seller/products
router.post('/', async (req, res) => {
  // Debug: log the request body and images field
  console.log('--- POST /api/seller/products ---');
  console.log('Headers:', req.headers);
  // Log the length of the images array and types of each image
  if (req.body.images) {
    console.log('Images type:', typeof req.body.images, Array.isArray(req.body.images) ? 'Array' : '');
    if (Array.isArray(req.body.images)) {
      console.log('Images array length:', req.body.images.length);
      req.body.images.forEach((img, idx) => {
        console.log(`Image[${idx}] type:`, typeof img, img && typeof img === 'string' ? `length: ${img.length}` : '');
      });
    }
  }
  // Log the full body (first 1000 chars)
  console.log('Body (first 1000 chars):', JSON.stringify(req.body).slice(0, 1000));

  const { sellerEmail, name, category, description, price, stock, images, createdAt } = req.body;
  if (
    !sellerEmail ||
    !name ||
    !category ||
    !description ||
    !price ||
    !stock ||
    !images ||
    !Array.isArray(images) ||
    images.length === 0
  ) {
    return res.status(400).json({ message: 'All fields including sellerEmail and at least one image are required.' });
  }
  try {
    // Ensure images is always an array of strings
    const cleanImages = images
      .map(img => typeof img === 'string' ? img : (img && img.dataURL ? img.dataURL : ''))
      .filter(img => typeof img === 'string' && img.trim().length > 0);

    const product = await SellerProduct.create({
      sellerEmail: sellerEmail.toLowerCase(),
      name,
      category,
      description,
      price: Number(price),
      stock: Number(stock),
      images: cleanImages,
      createdAt: createdAt || new Date()
    });
    res.status(201).json(product);
  } catch (err) {
    // Log the error for debugging
    console.error('ADD PRODUCT ERROR:', err);
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});

// PUT /api/seller/products/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Log the request body and images field for debugging
  console.log('--- PUT /api/seller/products/:id ---');
  if (req.body.images) {
    console.log('Images type:', typeof req.body.images, Array.isArray(req.body.images) ? 'Array' : '');
    if (Array.isArray(req.body.images)) {
      console.log('Images array length:', req.body.images.length);
      req.body.images.forEach((img, idx) => {
        console.log(`Image[${idx}] type:`, typeof img, img && typeof img === 'string' ? `length: ${img.length}` : '');
      });
    }
  }
  console.log('Body (first 1000 chars):', JSON.stringify(req.body).slice(0, 1000));

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid or missing Product ID.' });
  }
  const allowedFields = ['name', 'category', 'description', 'price', 'stock', 'images'];
  const updateFields = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      if (key === 'images') {
        let imgs = req.body.images;
        if (typeof imgs === 'string') {
          imgs = [imgs];
        }
        if (!Array.isArray(imgs)) {
          imgs = [];
        }
        // Filter out null, undefined, and non-string values
        updateFields.images = imgs
          .filter(img => typeof img === 'string' && img.trim().length > 0);
      } else if (key === 'price' || key === 'stock') {
        updateFields[key] = Number(req.body[key]);
      } else {
        updateFields[key] = req.body[key];
      }
    }
  }
  try {
    const product = await SellerProduct.findById(id);
    if (!product) {
      console.log('Product not found for id:', id);
      return res.status(404).json({ message: 'Product not found.' });
    }
    if (
      req.body.sellerEmail &&
      product.sellerEmail &&
      req.body.sellerEmail.toLowerCase() !== product.sellerEmail.toLowerCase()
    ) {
      console.log('Seller email mismatch:', req.body.sellerEmail, product.sellerEmail);
      return res.status(403).json({ message: 'You are not authorized to update this product.' });
    }
    const updatedProduct = await SellerProduct.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    console.log('Product updated successfully:', updatedProduct ? updatedProduct._id : null);
    res.json(updatedProduct);
  } catch (err) {
    // Log the error for debugging, including full stack
    console.error('UPDATE ERROR:', err);
    if (err.errors) {
      Object.keys(err.errors).forEach(field => {
        console.error(`Field error [${field}]:`, err.errors[field].message);
      });
    }
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

module.exports = router;
