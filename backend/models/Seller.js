const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Removed mobile field and its unique constraint
  emailVerified: { type: Boolean, default: false },
  emailOTP: { type: String },
  otpExpiry: { type: Date }
});

sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

sellerSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Add a Product schema for seller's products
const productSchema = new mongoose.Schema({
  sellerEmail: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function(val) {
        // Only allow 1 to 8 images, all must be non-empty strings
        return Array.isArray(val) && val.length > 0 && val.length <= 8 && val.every(img => typeof img === 'string' && img.trim().length > 0);
      },
      message: 'You must provide between 1 and 8 valid images.'
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// Fix: Always use mongoose.models to avoid OverwriteModelError and ensure correct export
const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);
const SellerProduct = mongoose.models.SellerProduct || mongoose.model('SellerProduct', productSchema, "seller's data");

module.exports.Seller = Seller;
module.exports.SellerProduct = SellerProduct;
