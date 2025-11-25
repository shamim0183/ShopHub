// ============================================
// Database Seeder - Sample Products
// ============================================
// This script populates the MongoDB database with
// sample products across different categories.
// Run this once to have initial data for testing.
// Usage: npm run seed (from backend directory)
// ============================================

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// ============================================
// Sample Products Data
// ============================================
// 15 products across various categories
// Each product includes all required fields
// ============================================
const sampleProducts = [
  {
    title: 'Wireless Bluetooth Headphones',
    shortDescription: 'Premium noise-canceling headphones with 30-hour battery life and superior sound quality.',
    fullDescription: 'Experience immersive audio with our premium wireless headphones. Features active noise cancellation, comfortable over-ear design, and crystal-clear sound. Perfect for music lovers, travelers, and professionals. Includes carrying case and charging cable.',
    price: 89.99,
    category: 'Electronics',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Smart Fitness Watch',
    shortDescription: 'Track your health and fitness with heart rate monitoring, GPS, and 50+ sport modes.',
    fullDescription: 'Stay on top of your fitness goals with this advanced smartwatch. Monitor heart rate, blood oxygen, sleep quality, and activity levels. Built-in GPS for accurate tracking. Water-resistant up to 50 meters. Compatible with iOS and Android.',
    price: 149.99,
    category: 'Electronics',
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Classic Denim Jacket',
    shortDescription: 'Timeless denim jacket with vintage wash and comfortable fit for everyday wear.',
    fullDescription: 'Elevate your casual wardrobe with this classic denim jacket. Made from 100% cotton denim with a vintage wash finish. Features button closure, chest pockets, and adjustable cuffs. Perfect for layering in any season.',
    price: 59.99,
    category: 'Fashion',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Organic Cotton T-Shirt Set',
    shortDescription: 'Pack of 3 premium organic cotton t-shirts in classic colors for everyday comfort.',
    fullDescription: 'Sustainable and comfortable t-shirt set made from 100% organic cotton. Soft, breathable fabric perfect for daily wear. Includes white, black, and gray shirts. Pre-shrunk and machine washable. Available in S-XXL sizes.',
    price: 34.99,
    category: 'Fashion',
    stock: 67,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Modern LED Desk Lamp',
    shortDescription: 'Adjustable LED lamp with touch control, USB charging port, and eye-care technology.',
    fullDescription: 'Illuminate your workspace with this sleek LED desk lamp. Features 5 brightness levels, flexible gooseneck design, and energy-efficient LEDs. Built-in USB charging port for devices. Touch-sensitive controls and memory function.',
    price: 39.99,
    category: 'Home & Garden',
    stock: 53,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Ceramic Plant Pot Set',
    shortDescription: 'Set of 3 handcrafted ceramic pots with drainage holes and saucers for indoor plants.',
    fullDescription: 'Beautiful ceramic planters perfect for succulents, herbs, and small plants. Each pot features drainage holes and matching saucers. Modern minimalist design complements any home decor. Includes small, medium, and large sizes.',
    price: 29.99,
    category: 'Home & Garden',
    stock: 41,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Yoga Mat with Carrying Strap',
    shortDescription: 'Non-slip premium yoga mat with extra cushioning and eco-friendly materials.',
    fullDescription: 'Practice yoga in comfort with this high-quality mat. Made from eco-friendly TPE material, provides excellent grip and cushioning. Dimensions: 72" x 24" x 6mm. Includes carrying strap and storage bag. Easy to clean and maintain.',
    price: 44.99,
    category: 'Sports & Outdoors',
    stock: 38,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Camping Tent - 4 Person',
    shortDescription: 'Waterproof family tent with easy setup, ventilation windows, and spacious interior.',
    fullDescription: 'Enjoy the great outdoors with this spacious 4-person tent. Features waterproof rainfly, mesh windows for ventilation, and sturdy fiberglass poles. Quick and easy setup in under 10 minutes. Includes carry bag and stakes.',
    price: 129.99,
    category: 'Sports & Outdoors',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
    createdBy: 'admin'
  },
  {
    title: 'The Art of Mindfulness',
    shortDescription: 'Bestselling guide to meditation and mindful living for beginners and practitioners.',
    fullDescription: 'Discover the transformative power of mindfulness with this comprehensive guide. Learn practical meditation techniques, stress reduction methods, and daily mindfulness practices. Perfect for beginners and experienced practitioners alike. 320 pages, paperback.',
    price: 16.99,
    category: 'Books',
    stock: 72,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Cooking Masterclass Cookbook',
    shortDescription: 'Professional chef techniques and 100+ recipes for home cooks of all skill levels.',
    fullDescription: 'Elevate your cooking with this comprehensive cookbook featuring professional techniques and delicious recipes. Includes step-by-step instructions, beautiful photography, and tips from renowned chefs. Hardcover, 400 pages.',
    price: 34.99,
    category: 'Books',
    stock: 29,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Building Blocks Creative Set',
    shortDescription: '500-piece colorful building blocks for creative construction and imaginative play.',
    fullDescription: 'Inspire creativity and imagination with this extensive building block set. Includes 500 pieces in various shapes and colors. Compatible with major brands. Promotes STEM learning, fine motor skills, and problem-solving. Ages 4+.',
    price: 49.99,
    category: 'Toys & Games',
    stock: 44,
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Remote Control Race Car',
    shortDescription: 'High-speed RC car with 2.4GHz remote, rechargeable battery, and durable design.',
    fullDescription: 'Experience thrilling racing action with this powerful RC car. Reaches speeds up to 20mph with responsive 2.4GHz remote control. Rechargeable battery provides 30 minutes of playtime. Durable construction withstands crashes and jumps.',
    price: 69.99,
    category: 'Toys & Games',
    stock: 26,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Organic Face Cream',
    shortDescription: 'Natural anti-aging moisturizer with hyaluronic acid and vitamin C for all skin types.',
    fullDescription: 'Rejuvenate your skin with this luxurious organic face cream. Formulated with hyaluronic acid, vitamin C, and natural botanical extracts. Hydrates, brightens, and reduces fine lines. Suitable for all skin types. Cruelty-free and paraben-free.',
    price: 42.99,
    category: 'Health & Beauty',
    stock: 58,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Premium Hair Styling Kit',
    shortDescription: 'Professional hair styling tools including hair dryer, straightener, and curling iron.',
    fullDescription: 'Complete hair styling solution for salon-quality results at home. Includes ionic hair dryer with diffuser, ceramic straightener, and curling wand. Adjustable heat settings, rapid heating, and protective heat gloves included.',
    price: 89.99,
    category: 'Health & Beauty',
    stock: 21,
    imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500',
    createdBy: 'admin'
  },
  {
    title: 'Smartphone Car Mount',
    shortDescription: 'Universal magnetic car phone holder with 360-degree rotation and strong grip.',
    fullDescription: 'Keep your phone secure and accessible while driving. Features powerful magnetic grip, 360-degree rotation, and easy one-hand operation. Compatible with all smartphones. Attaches to dashboard or windshield. Includes metal plates.',
    price: 19.99,
    category: 'Automotive',
    stock: 95,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
    createdBy: 'admin'
  }
];

// ============================================
// Seed Database Function
// ============================================
// Connects to MongoDB, clears existing products,
// and inserts sample products
// ============================================
const seedDatabase = async () => {
  try {
    // Connect to MongoDB using connection string from .env
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products from database
    // This ensures we start with fresh data
    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Existing products cleared');

    // Insert sample products into database
    // insertMany is faster than multiple save() calls
    console.log('📦 Inserting sample products...');
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products`);

    // Print summary by category
    console.log('\n📊 Products by category:');
    const categories = [...new Set(sampleProducts.map(p => p.category))];
    categories.forEach(category => {
      const count = sampleProducts.filter(p => p.category === category).length;
      console.log(`   ${category}: ${count} products`);
    });

    // Close database connection
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    // Log error and exit with failure code
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// ============================================
// Execute Seeder
// ============================================
// Run the seed function when script is executed
// ============================================
seedDatabase();
