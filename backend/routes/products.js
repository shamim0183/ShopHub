const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Fetch all products with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
});

// GET /api/products/:id - Fetch a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
});

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    });

  } catch (error) {
    console.error('Error creating product:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({ 
      message: 'Failed to create product',
      error: error.message 
    });
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors
      });
    }

    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to update product',
      error: error.message 
    });
  }
});

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ 
        message: 'Product not found' 
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    const statusCode = error.kind === 'ObjectId' ? 400 : 500;
    res.status(statusCode).json({ 
      message: 'Failed to delete product',
      error: error.message 
    });
  }
});

module.exports = router;
