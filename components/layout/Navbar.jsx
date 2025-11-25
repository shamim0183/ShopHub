'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiLogOut, FiMenu, FiPackage, FiPlusCircle, FiShoppingCart, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

 

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className={`sticky top-0 z-50 bg-base-100 border-b border-base-300 transition-all duration-300 py-6 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center gap-2 text-xl font-bold hover:scale-105 transition-transform">
            <FiShoppingCart className="text-2xl bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text" />
            <span className="bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-transparent bg-clip-text">ShopHub</span>
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
  <input type="checkbox" value="synthwave" className="theme-controller" />

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
