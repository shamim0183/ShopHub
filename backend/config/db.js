// ============================================
// MongoDB Connection Configuration
// ============================================
// This file handles the connection to MongoDB Atlas
// using Mongoose ODM. It includes error handling
// and connection pooling for optimal performance.
// ============================================

const mongoose = require('mongoose');

// ============================================
// Connect to MongoDB Atlas
// ============================================
// This function establishes a connection to MongoDB
// using the connection string from environment variables.
// It uses async/await for cleaner error handling.
// ============================================
const connectDB = async () => {
  try {
    // Get MongoDB connection string from environment variable
    // This keeps sensitive credentials out of the code
    const mongoURI = process.env.MONGODB_URI;

    // Check if MongoDB URI is configured
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB with recommended options
    // useNewUrlParser and useUnifiedTopology ensure best practices
    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    // Log detailed error information for debugging
    console.error('❌ MongoDB connection error:', error.message);
    
    // Exit process with failure code
    // This prevents the server from running without database
    process.exit(1);
  }
};

// ============================================
// Handle Connection Events
// ============================================
// Monitor MongoDB connection status for better debugging
// ============================================

// When connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

// When connection encounters an error after initial connection
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// When application is terminated, close MongoDB connection gracefully
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

// Export the connection function for use in server.js
module.exports = connectDB;
