'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiLogOut, FiMenu, FiPackage, FiPlusCircle, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className={`sticky top-0 z-50 bg-base-100 border-b border-base-300 transition-all duration-300 py-4 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center gap-3 hover:scale-105 transition-transform group">
            {/* Custom Logo SVG */}
            <div className="relative">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Shopping Bag */}
                <path 
                  d="M12 14L10 42H38L36 14H12Z" 
                  fill="url(#gradient1)" 
                  stroke="url(#gradient1)" 
                  strokeWidth="2"
                />
                {/* Bag Handle */}
                <path 
                  d="M16 14V10C16 6.68629 18.6863 4 22 4H26C29.3137 4 32 6.68629 32 10V14" 
                  stroke="url(#gradient1)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                {/* Hub/Star Icon */}
                <circle cx="24" cy="26" r="6" fill="white" opacity="0.9"/>
                <path 
                  d="M24 23L25 25.5L27.5 26L25 27L24 29.5L23 27L20.5 26L23 25.5L24 23Z" 
                  fill="url(#gradient1)"
                />
                
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ee0979" />
                    <stop offset="100%" stopColor="#ff6a00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text leading-none">
                ShopHub
              </span>
              <span className="text-xs opacity-60 font-medium tracking-wider">YOUR SHOPPING DESTINATION</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white shadow-md'
                      : 'bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:!text-white hover:shadow-md'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="toggle text-base-content">
              <input 
                type="checkbox" 
                className="theme-controller" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />

              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
            </label>

            {status === 'loading' ? (
              <div className="w-32 h-10 bg-base-200 rounded-lg animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-base-100 border-2 border-base-300 rounded-lg hover:border-[#ee0979] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full object-cover border-2 border-base-300" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  
                  <span className="hidden sm:block font-semibold max-w-[120px] truncate">
                    {session.user?.name}
                  </span>
                  <FiChevronDown className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                    
                    <div className="absolute right-0 mt-3 w-64 bg-base-100 border-2 border-base-300 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b-2 border-base-300 bg-base-200">
                        <div className="font-bold text-lg truncate">{session.user?.name}</div>
                        <div className="text-sm opacity-60 truncate">{session.user?.email}</div>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/add-product"
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-[#ee0979]/10 hover:to-[#ff6a00]/10 hover:text-[#ee0979] transition-all font-medium"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <FiPlusCircle className="text-lg" />
                          <span>Add Product</span>
                        </Link>

                        <Link
                          href="/manage-products"
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-[#ee0979]/10 hover:to-[#ff6a00]/10 hover:text-[#ee0979] transition-all font-medium"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <FiPackage className="text-lg" />
                          <span>Manage Products</span>
                        </Link>
                      </div>

                      <div className="border-t-2 border-base-300 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-error hover:bg-error/10 transition-all font-medium"
                        >
                          <FiLogOut className="text-lg" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-[#ee0979] font-semibold border-2 border-[#ee0979] rounded-lg hover:bg-[#ee0979] hover:text-white transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-[#ee0979] transition-colors"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100">
          <div className="flex flex-col gap-2 py-4 px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white shadow-md'
                      : 'bg-base-200 hover:bg-gradient-to-r hover:from-[#ee0979] hover:to-[#ff6a00] hover:!text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {!session && (
              <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-base-300">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-center text-[#ee0979] font-semibold border-2 border-[#ee0979] rounded-lg hover:bg-[#ee0979] hover:text-white transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-center bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
