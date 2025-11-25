'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/products/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Health & Beauty',
    'Automotive',
    'Food & Beverages',
    'Other',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-xl opacity-95">
            Browse our collection of {products.length} amazing products
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-16 z-40 bg-base-100 border-b border-base-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-base-200 border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-base-200 rounded-full transition-colors"
                >
                  <FiX className="text-base-content/70" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-64">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-base-200 border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-base-200 rounded-xl overflow-hidden border-2 border-base-300 animate-pulse">
                <div className="h-64 bg-base-300" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-base-300 rounded" />
                  <div className="h-4 bg-base-300 rounded w-3/4" />
                  <div className="h-4 bg-base-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={{
                ...product,
                name: product.title || product.name,
                description: product.shortDescription || product.description,
                image: product.imageUrl || product.image,
              }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-base-200 rounded-full mb-6">
              <FiSearch size={64} className="text-base-content/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="opacity-70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
