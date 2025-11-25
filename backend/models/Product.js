const mongoose = require('mongoose');

// প্রোডাক্ট স্কিমা - প্রোডাক্টের গঠন এবং ভ্যালিডেশন নির্ধারণ করে
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },

    // প্রোডাক্ট কার্ডের জন্য সংক্ষিপ্ত বর্ণনা
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [150, 'Short description cannot exceed 150 characters']
    },

    // প্রোডাক্ট ডিটেইলস পেজের জন্য সম্পূর্ণ বর্ণনা
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
      minlength: [10, 'Full description must be at least 10 characters']
    },

    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: function(value) {
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        message: 'Price must have at most 2 decimal places'
      }
    },

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

    imageUrl: {
      type: String,
      required: [true, 'Product image URL is required'],
      trim: true,
      validate: {
        validator: function(value) {
          return /^https?:\/\/.+/.test(value);
        },
        message: 'Please provide a valid image URL'
      }
    },

    createdBy: {
      type: String,
      trim: true,
      default: 'admin'
    }
  },
  {
    timestamps: true // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt যোগ করে
  }
);

// ভালো কোয়েরি পারফরম্যান্সের জন্য ইনডেক্স
productSchema.index({ title: 'text', shortDescription: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

// ইনস্ট্যান্স মেথড
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

productSchema.methods.getFormattedPrice = function() {
  return `$${this.price.toFixed(2)}`;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
