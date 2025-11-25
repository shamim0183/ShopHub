// ============================================
// Product Model (Mongoose Schema)
// ============================================
// This file defines the structure and validation
// rules for products in the eCommerce application.
// Each product has title, descriptions, price,
// category, stock, and image information.
// ============================================

const mongoose = require('mongoose');

// ============================================
// Product Schema Definition
// ============================================
// Schema defines the structure of documents in MongoDB
// It includes field types, validation rules, and
// default values for the Product collection.
// ============================================
const productSchema = new mongoose.Schema(
  {
    // Product title (e.g., "Wireless Headphones")
    // Required field with minimum 3 characters
    // Will be trimmed to remove extra whitespace
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },

    // Short description for product cards (1-2 lines)
    // Limited to 150 characters for consistent display
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [150, 'Short description cannot exceed 150 characters']
    },

    // Full detailed description for product details page
    // No length limit for comprehensive product information
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
      minlength: [10, 'Full description must be at least 10 characters']
    },

    // Product price in USD
    // Must be a positive number (0 or greater)
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function(value) {
          // Ensure price has max 2 decimal places
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        message: 'Price must have at most 2 decimal places'
      }
    },

    // Product category (e.g., "Electronics", "Fashion")
    // Used for filtering and organization
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      enum: {
        values: [
          'Electronics',
          'Fashion',
          'Home & Garden',
          'Sports & Outdoors',
          'Books',
          'Toys & Games',
          'Health & Beauty',
          'Automotive',
          'Food & Beverages',
          'Other'
        ],
        message: '{VALUE} is not a valid category'
      }
    },

    // Stock quantity (how many units available)
    // Default is 0, must be non-negative integer
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Stock must be a whole number'
      }
    },

    // Product image URL
    // Can be uploaded image or direct URL
    imageUrl: {
      type: String,
      required: [true, 'Product image URL is required'],
      trim: true,
      validate: {
        validator: function(value) {
          // Basic URL validation (http/https)
          return /^https?:\/\/.+/.test(value);
        },
        message: 'Please provide a valid image URL'
      }
    },

    // Email of user who created this product
    // Stored for audit purposes
    createdBy: {
      type: String,
      trim: true,
      default: 'admin'
    }
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    // MongoDB will manage these fields automatically
    timestamps: true
  }
);

// ============================================
// Add Indexes for Performance
// ============================================
// Indexes improve query performance for common searches
// ============================================

// Index on title for text search
productSchema.index({ title: 'text', shortDescription: 'text' });

// Index on category for filtering
productSchema.index({ category: 1 });

// Index on price for sorting
productSchema.index({ price: 1 });

// ============================================
// Instance Methods (Optional)
// ============================================
// Methods that can be called on individual product documents
// ============================================

// Check if product is in stock
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

// Get formatted price with currency symbol
productSchema.methods.getFormattedPrice = function() {
  return `$${this.price.toFixed(2)}`;
};

// ============================================
// Create and Export Model
// ============================================
// Model is a constructor for creating and reading
// documents from the MongoDB collection
// Collection name will be 'products' (pluralized lowercase)
// ============================================
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
