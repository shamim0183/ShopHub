import './globals.css';
import { SessionProvider } from './providers';

export const metadata = {
  title: 'ShopHub - Your One-Stop eCommerce Store',
  description: 'Discover amazing products at great prices. Shop electronics, fashion, home goods, and more!',
  icons: {
    icon: '/icon1.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
