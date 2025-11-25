// ============================================
// Product Routes - RESTful API Endpoints
// ============================================
// This file contains all API endpoints for managing
// products (CRUD operations). Routes are organized
// following REST conventions.
// ============================================

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ============================================
// GET /api/products
// Fetch all products with optional search and filter
// ============================================
// Query parameters:
// - search: Search in title and short description
// - category: Filter by specific category
// Returns: Array of product objects
// ============================================
router.get('/', async (req, res) => {
  try {
    // Extract query parameters from request
    // These allow frontend to filter/search products
    const { search, category } = req.query;

    // Build query object for MongoDB
    // Start with empty query (will return all products)
    let query = {};

    // If search parameter exists, use MongoDB text search
    // $text searches the indexed fields (title, shortDescription)
    if (search) {
      query.$text = { $search: search };
    }

    // If category parameter exists, filter by exact category match
    // This enables category dropdown filtering
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    // Execute query to fetch products from database
    // .sort({ createdAt: -1 }) shows newest products first
    // .lean() returns plain JavaScript objects (faster)
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Return products array with success status
    res.status(200).json(products);

  } catch (error) {
    // Log error for server debugging
    console.error('Error fetching products:', error);
    
    // Return error response to frontend
    res.status(500).json({ 
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
});

// ============================================
// GET /api/products/:id
// Fetch a single product by ID
// ============================================
// URL parameter:
// - id: MongoDB ObjectId of the product
// Returns: Single product object
// ============================================
router.get('/:id', async (req, res) => {
  try {
    // Extract product ID from URL parameter
    const { id } = req.params;

    // Find product by ID in database
    // findById is a Mongoose helper method
    const product = await Product.findById(id);

    // If product not found, return 404 error
    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    // Return product object with success status
    res.status(200).json(product);

  } catch (error) {
    // Log error for debugging
    console.error('Error fetching product:', error);

    // Return error response
    // 400 for invalid ID format, 500 for server errors
    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
});

// ============================================
// POST /api/products
// Create a new product
// ============================================
// Request body should contain:
// - title, shortDescription, fullDescription
// - price, category, stock, imageUrl
// Returns: Created product object
// ============================================
router.post('/', async (req, res) => {
  try {
    // Extract product data from request body
    // Frontend sends this data via axios.post()
    const productData = req.body;

    // Create new product instance with Mongoose model
    // This triggers all schema validations automatically
    const newProduct = new Product(productData);

    // Save product to MongoDB database
    // This is an async operation that returns the saved document
    const savedProduct = await newProduct.save();

    // Return created product with 201 (Created) status
    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    });

  } catch (error) {
    // Log error for debugging
    console.error('Error creating product:', error);

    // Check if error is validation error from Mongoose
    if (error.name === 'ValidationError') {
      // Extract validation error messages
      const errors = Object.values(error.errors).map(err => err.message);
      
      // Return 400 (Bad Request) with validation errors
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors
      });
    }

    // Return 500 for other server errors
    res.status(500).json({ 
      message: 'Failed to create product',
      error: error.message 
    });
  }
});

// ============================================
// PUT /api/products/:id
// Update an existing product
// ============================================
// URL parameter:
// - id: MongoDB ObjectId of the product
// Request body: Fields to update
// Returns: Updated product object
// ============================================
router.put('/:id', async (req, res) => {
  try {
    // Extract product ID from URL
    const { id } = req.params;
    
    // Extract update data from request body
    const updateData = req.body;

    // Find product by ID and update with new data
    // { new: true } returns the updated document
    // { runValidators: true } ensures validation runs on updates
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,           // Return updated document
        runValidators: true  // Run schema validation
      }
    );

    // If product not found, return 404
    if (!updatedProduct) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    // Return updated product
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    // Log error for debugging
    console.error('Error updating product:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors
      });
    }

    // Return error response
    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to update product',
      error: error.message 
    });
  }
});

// ============================================
// DELETE /api/products/:id
// Delete a product by ID
// ============================================
// URL parameter:
// - id: MongoDB ObjectId of the product
// Returns: Success message
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    // Extract product ID from URL
    const { id } = req.params;

    // Find and delete product in one operation
    // Returns the deleted product or null if not found
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If product not found, return 404
    if (!deletedProduct) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    // Return success message
    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });

  } catch (error) {
    // Log error for debugging
    console.error('Error deleting product:', error);

    // Return error response
    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to delete product',
      error: error.message 
    });
  }
});

// ============================================
// Export Router
// ============================================
// This router will be mounted at /api/products in server.js
// All routes above will be prefixed with /api/products
// ============================================
module.exports = router;
