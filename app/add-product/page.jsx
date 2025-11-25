"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiDollarSign, FiImage, FiPackage } from "react-icons/fi";
import Swal from "sweetalert2";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "Electronics",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Automotive",
    "Food & Beverages",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdBy: session?.user?.email || "anonymous",
      };

      await axios.post(`${apiUrl}/products`, productData);

      await Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Your product has been successfully added.",
        confirmButtonColor: "#ee0979",
      });

      router.push("/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to add product. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold">Add New Product</h1>
            <p className="opacity-70">
              Fill in the details below to add a product to the store
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="card bg-base-100 shadow-xl p-8"
          >
            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Product Title *
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Wireless Bluetooth Headphones"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Short Description */}
            <div className="form-control mb-4">
              <label className="label flex justify-between">
                <span className="label-text font-semibold">
                  Short Description *
                </span>
                <span className="text-xs opacity-60">
                  {formData.shortDescription.length}/150
                </span>
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                maxLength={150}
                rows={2}
                placeholder="Brief description (max 150 characters)"
                required
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Full Description */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Full Description *
                </span>
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={5}
                placeholder="Detailed product description..."
                required
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price (USD) *</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FiDollarSign className="opacity-70" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className="grow"
                  />
                </label>
              </div>

              {/* Stock */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Stock Quantity *
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FiPackage className="opacity-70" />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                    className="grow"
                  />
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Category *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Image URL *</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FiImage className="opacity-70" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="grow"
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
                className="btn btn-outline "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary "
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
