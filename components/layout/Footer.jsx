'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text">
              ShopHub
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for quality products at great prices. Discover amazing deals every day!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/products?category=Electronics" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Electronics
              </Link>
              <Link 
                href="/products?category=Fashion" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Fashion
              </Link>
              <Link 
                href="/products?category=Home & Garden" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Home & Garden
              </Link>
              <Link 
                href="/products?category=Sports & Outdoors" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#ee0979] dark:hover:text-[#ff6a00] transition-colors text-sm font-medium"
              >
                Sports & Outdoors
              </Link>
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect With Us</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] text-gray-700 dark:text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] text-gray-700 dark:text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] text-gray-700 dark:text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] text-gray-700 dark:text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
