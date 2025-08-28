const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables

// Route Imports
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');            // Customer auth (includes OTP)
const sellerAuthRoutes = require('./routes/sellerAuth'); // Seller auth
const sellerProductsRoutes = require('./routes/sellerProducts'); // Seller product routes

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('https://clopick-com-1.onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.options('*', cors()); // Preflight requests
app.use(express.json());

// Enable Mongoose debug mode (optional)
mongoose.set('debug', true);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerAuthRoutes);
app.use('/api/seller/products', sellerProductsRoutes);

// Serve React frontend build for non-API routes
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // skip API routes
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Catch-all for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
