'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiCheck, FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUpload, FiUser, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pass) => pass.length >= 8 },
    { label: 'One uppercase letter', test: (pass) => /[A-Z]/.test(pass) },
    { label: 'One lowercase letter', test: (pass) => /[a-z]/.test(pass) },
    { label: 'One number', test: (pass) => /\d/.test(pass) },
    { label: 'One special character (@$!%*?&)', test: (pass) => /[@$!%*?&]/.test(pass) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, photo: 'Please select an image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, photo: 'Image size should be less than 5MB' });
      return;
    }

    setUploadingPhoto(true);
    setErrors({ ...errors, photo: '' });

    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append('image', file);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formDataToUpload
      );

      const data = response.data;

      if (data.success) {
        setFormData({ ...formData, photoURL: data.data.url });
        setPhotoPreview(data.data.url);
      } else {
        setErrors({ ...errors, photo: 'Failed to upload image' });
      }
    } catch (error) {
      setErrors({ ...errors, photo: 'Failed to upload image' });
      console.error('Upload error:', error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    const passwordValid = passwordRequirements.every(req => req.test(formData.password));
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photoURL: formData.photoURL || ''
      });

      const userData = {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
      };
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      
      setSuccess(true);
      
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to ShopHub! Redirecting to home...',
        timer: 2000,
        showConfirmButton: false,
      });
      
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data?.field === 'email') {
        errorMessage = err.response.data.message;
        setErrors({ email: errorMessage });
      } else if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors.join(', ');
        setErrors({ general: errorMessage });
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
        setErrors({ general: errorMessage });
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#ee0979',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text mb-4">
            ShopHub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-white dark:text-gray-300">Join thousands of happy shoppers</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-500 rounded-lg text-green-700 dark:text-green-400 flex items-center gap-2">
              <FiCheck className="flex-shrink-0" />
              <span className="text-white dark:text-green-300">Account created successfully! Redirecting to home...</span>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg text-red-700 dark:text-red-400 flex items-center gap-2">
              <FiX className="flex-shrink-0" />
              <span className="text-white dark:text-red-300">{errors.general}</span>
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 mb-6"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or register with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover border-2 border-[#ee0979]" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] flex items-center justify-center">
                    <FiImage className="text-white text-2xl" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <FiUpload />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="hidden"
                    />
                  </label>
                  {errors.photo && <p className="mt-1 text-sm text-red-500">{errors.photo}</p>}
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0979] transition-all text-gray-900 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FiX size={14} />{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0979] transition-all text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FiX size={14} />{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0979] transition-all text-gray-900 dark:text-white ${
                    errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(formData.password);
                  return (
                    <div key={index} className={`flex items-center gap-2 text-sm transition-colors ${
                      isValid ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                    }`}>
                      {isValid ? <FiCheck size={16} /> : <FiX size={16} />}
                      <span className={isValid ? 'text-green-600 dark:text-green-300' : 'text-red-500 dark:text-red-300'}>{req.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee0979] transition-all text-gray-900 dark:text-white ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FiX size={14} />{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-bold rounded-lg transition-all duration-200 ${
                loading || success
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-white">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#ee0979] hover:text-[#ff6a00] transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
