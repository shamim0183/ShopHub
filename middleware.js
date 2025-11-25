// ============================================
// Middleware - Route Protection
// ============================================
// Protects authenticated routes by checking session
// Redirects unauthorized users to login page
// Runs before page loads for protected paths
// ============================================

import { withAuth } from 'next-auth/middleware';

// ============================================
// Middleware Function
// ============================================
// Export the middleware function explicitly for Next.js 16
// ============================================
export default withAuth({
  // Callback to check if user is authorized
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  // Redirect to login page if not authorized
  pages: {
    signIn: '/login',
  },
});

// ============================================
// Protected Routes Configuration
// ============================================
// Define which routes require authentication
// All paths listed here will check for active session
// ============================================
export const config = {
  // Match these paths for protection
  // - /add-product: Only logged-in users can add products
  // - /manage-products: Only logged-in users can manage products
  matcher: [
    '/add-product',
    '/manage-products',
  ],
};

// ============================================
// How This Works:
// ============================================
// 1. User tries to access /add-product or /manage-products
// 2. Middleware checks if user has valid session (JWT token)
// 3. If YES: Allow access to requested page
// 4. If NO: Redirect to /login with callbackUrl parameter
// 5. After login, user is redirected back to original page
// ============================================
