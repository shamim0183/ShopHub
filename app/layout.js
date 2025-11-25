// ============================================
// Root Layout - Application Shell
// ============================================
// Wraps all pages with SessionProvider for authentication
// Includes global styles and metadata configuration
// ============================================

import './globals.css';
import { SessionProvider } from './providers';

export const metadata = {
  title: 'ShopHub - Your One-Stop eCommerce Store',
  description: 'Discover amazing products at great prices. Shop electronics, fashion, home goods, and more!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        {/* SessionProvider enables useSession() hook throughout the app */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
