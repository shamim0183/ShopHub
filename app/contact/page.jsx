import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: '70vh', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Contact Us</h1>
        <p style={{ maxWidth: '600px', margin: '2rem auto' }}>
          Have questions? We'd love to hear from you!<br />
          Email: support@shophub.com<br />
          Phone: (555) 123-4567
        </p>
      </main>
      <Footer />
    </div>
  );
}
