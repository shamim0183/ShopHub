'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-100 border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Custom Logo SVG */}
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Shopping Bag */}
                <path 
                  d="M12 14L10 42H38L36 14H12Z" 
                  fill="url(#footerGradient)" 
                  stroke="url(#footerGradient)" 
                  strokeWidth="2"
                />
                {/* Bag Handle */}
                <path 
                  d="M16 14V10C16 6.68629 18.6863 4 22 4H26C29.3137 4 32 6.68629 32 10V14" 
                  stroke="url(#footerGradient)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                {/* Hub/Star Icon */}
                <circle cx="24" cy="26" r="6" fill="white" opacity="0.9"/>
                <path 
                  d="M24 23L25 25.5L27.5 26L25 27L24 29.5L23 27L20.5 26L23 25.5L24 23Z" 
                  fill="url(#footerGradient)"
                />
                
                <defs>
                  <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ee0979" />
                    <stop offset="100%" stopColor="#ff6a00" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text">
                  ShopHub
                </h3>
                <p className="text-xs opacity-60 font-medium tracking-wider">YOUR SHOPPING DESTINATION</p>
              </div>
            </div>
            <p className="opacity-70 text-sm leading-relaxed">
              Your one-stop shop for quality products at great prices. Discover amazing deals every day!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/home" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/products?category=Electronics" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Electronics
              </Link>
              <Link 
                href="/products?category=Fashion" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Fashion
              </Link>
              <Link 
                href="/products?category=Home & Garden" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Home & Garden
              </Link>
              <Link 
                href="/products?category=Sports & Outdoors" 
                className="opacity-70 hover:text-primary hover:opacity-100 transition-all text-sm font-medium"
              >
                Sports & Outdoors
              </Link>
            </nav>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:text-primary-content rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:text-primary-content rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:text-primary-content rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:text-primary-content rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-base-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center opacity-60 text-sm">
            © {currentYear} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
