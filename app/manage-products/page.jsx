'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function ManageProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productTitle) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${productTitle}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        await axios.delete(`${apiUrl}/products/${productId}`);
        setProducts(products.filter((p) => p._id !== productId));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete product. Please try again.',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
            <p className="text-white dark:text-gray-300 mt-1">View and manage all products in the store</p>
          </div>
          <button
            onClick={() => router.push('/add-product')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <FiPlus />
            <span>Add New Product</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ee0979] border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={product.imageUrl || 'https://via.placeholder.com/60'}
                          alt={product.title}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {product.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-[#ee0979] text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/products/${product._id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => router.push(`/products/${product._id}`)}
                            className="p-2 text-[#ee0979] hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id, product.title)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {products.map((product) => (
                <div key={product._id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/100'}
                      alt={product.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {product.title}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white text-xs font-semibold rounded-full mb-2">
                        {product.category}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#ee0979] text-xl">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className={`text-sm font-semibold ${
                          product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiEye size={16} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      <FiEdit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.title)}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Products Found</h3>
            <p className="text-white dark:text-gray-300 mb-6">Start by adding your first product!</p>
            <button
              onClick={() => router.push('/add-product')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              <FiPlus />
              <span>Add Product</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
