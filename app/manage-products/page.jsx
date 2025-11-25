'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PageHeader from '@/components/ui/PageHeader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiEdit2, FiEye, FiPackage, FiPlus, FiTrash2 } from 'react-icons/fi';
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
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Manage Products"
          subtitle="View and manage all products in the store"
          action={
            <button
              onClick={() => router.push('/add-product')}
              className="btn btn-primary gap-2"
            >
              <FiPlus />
              <span>Add New Product</span>
            </button>
          }
        />

        {loading ? (
          <LoadingSpinner message="Loading products..." />
        ) : products.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-300">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th className="font-bold">Image</th>
                    <th className="font-bold">Title</th>
                    <th className="font-bold">Category</th>
                    <th className="font-bold">Price</th>
                    <th className="font-bold">Stock</th>
                    <th className="font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img
                              src={product.imageUrl || 'https://via.placeholder.com/60'}
                              alt={product.title}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold line-clamp-2">
                          {product.title}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-primary badge-outline">
                          {product.category}
                        </span>
                      </td>
                      <td>
                        <span className="font-bold text-primary text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span className={`font-semibold ${
                          product.stock > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/products/${product._id}`)}
                            className="btn btn-ghost btn-sm btn-circle"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => router.push(`/products/${product._id}`)}
                            className="btn btn-ghost btn-sm btn-circle text-primary"
                            title="Edit Product"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id, product.title)}
                            className="btn btn-ghost btn-sm btn-circle text-error"
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
                <div key={product._id} className="card bg-base-100 shadow-sm border border-base-300">
                  <div className="card-body">
                    <div className="flex gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-24 h-24">
                          <img
                            src={product.imageUrl || 'https://via.placeholder.com/100'}
                            alt={product.title}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold line-clamp-2 mb-2">
                          {product.title}
                        </h3>
                        <span className="badge badge-primary badge-outline mb-2">
                          {product.category}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary text-xl">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className={`text-sm font-semibold ${
                            product.stock > 0 ? 'text-success' : 'text-error'
                          }`}>
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        onClick={() => router.push(`/products/${product._id}`)}
                        className="btn btn-outline btn-sm gap-2"
                      >
                        <FiEye size={16} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => router.push(`/products/${product._id}`)}
                        className="btn btn-primary btn-sm gap-2"
                      >
                        <FiEdit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.title)}
                        className="btn btn-error btn-sm"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={FiPackage}
            title="No Products Found"
            description="Start by adding your first product!"
            action={
              <button
                onClick={() => router.push('/add-product')}
                className="btn btn-primary gap-2"
              >
                <FiPlus />
                <span>Add Product</span>
              </button>
            }
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
