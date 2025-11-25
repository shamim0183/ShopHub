// ============================================
// Express Server Configuration
// ============================================
// Main server file that sets up Express app,
// connects to MongoDB, and handles all API routes.
// This is the entry point for the backend application.
// ============================================

// Load environment variables from .env file
// This must be called before using any environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route handlers
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// ============================================
// Initialize Express Application
// ============================================
const app = express();

// Define server port from environment or use default 5000
const PORT = process.env.PORT || 5000;

// ============================================
// Connect to MongoDB Database
// ============================================
// This establishes connection to MongoDB Atlas
// Server won't start if database connection fails
// ============================================
connectDB();

// ============================================
// Middleware Configuration
// ============================================
// Middleware processes requests before they reach routes
// ============================================

// CORS (Cross-Origin Resource Sharing)
// Allows Next.js frontend (running on port 3000) to make requests
// to this backend (running on port 5000)
app.use(cors({
  origin: 'http://localhost:3000',  // Next.js dev server
  credentials: true,                 // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON Body Parser
// Parses incoming requests with JSON payloads
// Makes request body available as req.body
app.use(express.json());

// URL-encoded Body Parser
// Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Request Logger (for development debugging)
// Logs all incoming requests with method, path, and timestamp
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();  // Pass control to next middleware
});

// ============================================
// API Routes
// ============================================
// All routes are prefixed with their respective paths
// ============================================

// Health check endpoint
// Used to verify server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Product routes
// Mounts all product endpoints at /api/products
// GET    /api/products      - Get all products
// GET    /api/products/:id  - Get single product
// POST   /api/products      - Create product
// PUT    /api/products/:id  - Update product
// DELETE /api/products/:id  - Delete product
app.use('/api/products', productRoutes);

// Authentication routes
// Mounts all auth endpoints at /api/auth
// POST   /api/auth/register - Register new user
// POST   /api/auth/login    - Login user
// GET    /api/auth/users    - Get all users
// GET    /api/auth/users/:id - Get user by ID
// DELETE /api/auth/users/:id - Delete user
app.use('/api/auth', authRoutes);

// ============================================
// 404 Handler
// ============================================
// Catches all requests that don't match any routes
// Returns helpful error message
// ============================================
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// Global Error Handler
// ============================================
// Catches any errors thrown in routes or middleware
// Provides consistent error response format
// ============================================
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// ============================================
// Start Server
// ============================================
// Listens on specified port and logs success message
// ============================================
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log(`🚀 Health: http://localhost:${PORT}/api/health`);
  console.log('🚀 ================================');
  console.log('');
});

// ============================================
// Graceful Shutdown
// ============================================
// Handles cleanup when server is terminated
// ============================================
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});
