import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>About Us</h1>
        <p style={{ maxWidth: '800px', margin: '2rem auto', lineHeight: '1.8' }}>
          Welcome to ShopHub! We're your one-stop destination for quality products across all categories.
          Our mission is to provide an exceptional marg experience with fast shipping, secure payments, and outstanding customer service.
        </p>
      </main>
      <Footer />
    </div>
  );
}
