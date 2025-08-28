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

// ---------- CORS Middleware ----------
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);

    // Allow both frontend URLs
    const allowedOrigins = [
      "https://clopick-com.onrender.com",
      "https://clopick-com-1.onrender.com"
    ];

    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Reject all other origins
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

// Parse JSON
app.use(express.json());

// ---------- Mongoose Setup ----------
mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ---------- API Routes ----------
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerAuthRoutes);
app.use('/api/seller/products', sellerProductsRoutes);

// ---------- Serve React Frontend ----------
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // Skip API routes
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// ---------- Catch-all API 404 ----------
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
