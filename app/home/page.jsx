"use client";

import BrandsSection from "@/components/home/BrandsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSlider from "@/components/home/HeroSlider";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiHeadphones, FiShield, FiShoppingBag, FiStar, FiTruck, FiZap } from "react-icons/fi";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setFeaturedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Discover trending styles with up to 50% off",
      cta: "Shop Now",
      link: "/products",
      imageUrl: "https://images.unsplash.com/photo-1747566500433-97d8bee6e6bb?w=1400&auto=format&fit=crop&q=80",
    },
    {
      title: "Electronics Sale",
      subtitle: "Latest tech gadgets at unbeatable prices",
      cta: "Explore Deals",
      link: "/products?category=Electronics",
      imageUrl: "https://images.unsplash.com/photo-1732900309946-7efe975d6ae1?w=1400&auto=format&fit=crop&q=80",
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50 - Limited time offer",
      cta: "Learn More",
      link: "/about",
      imageUrl: "https://images.unsplash.com/photo-1584824388178-1defc3484ce3?w=1400&auto=format&fit=crop&q=80",
    },
  ];

  const features = [
    { icon: FiTruck, title: "Free Shipping", description: "Free delivery on orders over $50" },
    { icon: FiShield, title: "Secure Payment", description: "100% secure transactions" },
    { icon: FiZap, title: "Fast Delivery", description: "Quick processing and shipping" },
    { icon: FiHeadphones, title: "24/7 Support", description: "Always here to help you" },
  ];

  const brands = [
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/1280px-LG_logo_%282014%29.svg.png" },
    { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
    { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
    { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Canon_wordmark.svg/2560px-Canon_wordmark.svg.png" },
    { name: "Nikon", logo: "https://images.all-free-download.com/images/graphiclarge/nikon_logo_30023.jpg" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Verified Buyer", rating: 5, comment: "Amazing products and fast delivery! Will definitely shop again." },
    { name: "Michael Chen", role: "Regular Customer", rating: 5, comment: "Great customer service and quality products. Highly recommended!" },
    { name: "Emma Davis", role: "Happy Shopper", rating: 5, comment: "Love the variety and prices. My go-to online store!" },
  ];

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSlider slides={heroSlides} />
        
        {/* Brands Section */}
        <BrandsSection brands={brands} />
        
        {/* Features Section */}
        <FeaturesSection features={features} />

        {/* Featured Products */}
        <section className="py-12 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link href="/products" className="inline-flex items-center gap-2 text-primary font-semibold">
                View All <FiArrowRight />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card card-compact bg-base-200 animate-pulse h-96" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product._id} className="card card-compact bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300 rounded-2xl">
                    <Link href={`/products/${product._id}`}>
                      <figure className="h-56 bg-base-200 overflow-hidden rounded-t-2xl">
                        <img
                          src={product.imageUrl || product.image || "https://via.placeholder.com/400"}
                          alt={product.title || product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </figure>
                    </Link>
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${product._id}`}>
                          <h3 className="card-title text-base-content line-clamp-1 hover:text-primary transition-colors cursor-pointer font-bold">
                            {product.title || product.name}
                          </h3>
                        </Link>
                        <div className="badge badge-primary badge-lg font-bold">${product.price}</div>
                      </div>
                      <p className="text-sm opacity-70 line-clamp-2 mb-2">
                        {product.shortDescription || product.description || "No description available."}
                      </p>
                      <div className="card-actions justify-between items-center mt-4">
                        <div className="flex items-center gap-1 text-warning">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="fill-warning" />
                          ))}
                        </div>
                        <Link href={`/products/${product._id}`} className="btn btn-primary btn-sm font-semibold">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonials} />

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content p-10">
              <div className="card-body items-center text-center">
                <FiShoppingBag className="text-4xl mb-3" />
                <h2 className="card-title text-3xl">Ready to Start Shopping?</h2>
                <p className="opacity-90 max-w-2xl">
                  Join thousands of satisfied customers and discover amazing products today!
                </p>
                <div className="card-actions mt-4">
                  <Link href="/products" className="btn btn-white btn-lg">
                    Browse All Products <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
