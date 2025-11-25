'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit2, FiHeart, FiShoppingCart, FiTag, FiUpload } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Category options - MUST match backend exactly
  const categories = [
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
  ];

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/products/${productId}`);
      setProduct(response.data);
      setEditForm({
        title: response.data.title,
        price: parseFloat(response.data.price),
        stock: parseInt(response.data.stock),
        category: response.data.category,
        shortDescription: response.data.shortDescription || '',
        fullDescription: response.data.fullDescription || response.data.shortDescription || '',
        imageUrl: response.data.imageUrl,
      });
    } catch (err) {
      setError('Product not found');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select an image file',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Image size should be less than 5MB',
      });
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );

      const data = response.data;

      if (data.success) {
        setEditForm({ ...editForm, imageUrl: data.data.url });
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded!',
          text: 'Your image has been uploaded successfully',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Failed to upload image. Please try again.',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'An error occurred while uploading the image',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditSave = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      // Auto-generate shortDescription if empty
      const shortDesc = editForm.shortDescription || editForm.fullDescription.substring(0, 147) + '...';
      
      const updateData = {
        title: editForm.title,
        price: parseFloat(editForm.price),
        stock: parseInt(editForm.stock),
        category: editForm.category,
        shortDescription: shortDesc.substring(0, 150),
        fullDescription: editForm.fullDescription,
        imageUrl: editForm.imageUrl,
      };

      console.log('Updating:', updateData);
      
      const response = await axios.put(`${apiUrl}/products/${productId}`, updateData);
      
      setProduct({ ...product, ...updateData });
      setIsEditing(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        text: 'Product has been updated in the database',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.errors 
        ? err.response.data.errors.join(', ')
        : err.response?.data?.message || 'Failed to update product';
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMsg,
        confirmButtonColor: '#ee0979',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ee0979] border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <button onClick={() => router.push('/products')} className="px-6 py-3 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg">
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 px-4 py-2 mb-8 text-gray-700 dark:text-gray-300 hover:text-[#ee0979] transition-colors font-medium"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div>
            <div className="rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <img 
                src={isEditing ? editForm.imageUrl : product.imageUrl} 
                alt={product.title} 
                className="w-full aspect-square object-cover" 
              />
            </div>
            
            {isEditing && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ee0979]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Or Upload Image</label>
                  <label className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <FiUpload className="text-gray-700 dark:text-white" /> 
                    <span className="font-semibold text-gray-700 dark:text-white">{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Category</label>
              {isEditing ? (
                <select 
                  value={editForm.category} 
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#ee0979]"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white rounded-full font-semibold shadow-md">
                  <FiTag /> {product.category}
                </span>
              )}
            </div>

            {/* Title */}
            {isEditing ? (
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Product Title</label>
                <input 
                  type="text" 
                  value={editForm.title} 
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                  className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ee0979]" 
                />
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{product.title}</h1>
            )}

            {/* Price & Stock */}
            <div className="flex flex-wrap items-center gap-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={editForm.price} 
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                      className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-2xl font-bold text-[#ee0979] focus:outline-none focus:ring-2 focus:ring-[#ee0979]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Stock</label>
                    <input 
                      type="number" 
                      value={editForm.stock} 
                      onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} 
                      className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#ee0979]" 
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-4xl font-bold text-[#ee0979]">${product.price.toFixed(2)}</span>
                  <span className={`px-6 py-2.5 rounded-lg font-semibold shadow-sm ${product.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-200 dark:border-red-800'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="py-6 border-t-2 border-b-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Description</h3>
              {isEditing ? (
                <textarea 
                  value={editForm.fullDescription} 
                  onChange={(e) => setEditForm({ ...editForm, fullDescription: e.target.value })} 
                  rows={6} 
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#ee0979]" 
                  placeholder="Enter product description"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.fullDescription || product.shortDescription}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              {session && (
                <button 
                  onClick={() => isEditing ? handleEditSave() : setIsEditing(true)} 
                  className="px-6 py-3 bg-gray-700 dark:bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FiEdit2 className="inline mr-2" /> 
                  {isEditing ? 'Save Changes' : 'Edit Product'}
                </button>
              )}
              
              {isEditing ? (
                <button 
                  onClick={() => { 
                    setIsEditing(false); 
                    setEditForm({ 
                      title: product.title, 
                      price: product.price, 
                      stock: product.stock, 
                      category: product.category, 
                      shortDescription: product.shortDescription, 
                      fullDescription: product.fullDescription, 
                      imageUrl: product.imageUrl 
                    }); 
                  }} 
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow-md"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button 
                    disabled={product.stock === 0} 
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${product.stock === 0 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white hover:shadow-lg hover:scale-105'}`}
                  >
                    <FiShoppingCart className="inline mr-2" /> 
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold rounded-lg hover:border-[#ee0979] dark:hover:border-[#ee0979] transition-all shadow-md hover:shadow-lg">
                    <FiHeart />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
