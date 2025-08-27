const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Add an Order sub-schema for storing order details
const orderSchema = new mongoose.Schema({
  product: {
    type: Object, // Store product snapshot (id, title, price, image, etc.)
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Placed",
  },
  address: {
    type: Object, // Store address snapshot at order time
  },
  payment: {
    type: Object, // Store payment info snapshot at order time
  },
  // Add more fields as needed (shipping, tracking, etc.)
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [orderSchema], // Add orders array to customer
}, { timestamps: true });

// Hash password before saving
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
customerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
