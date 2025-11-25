"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FiArrowRight, FiHeadphones, FiShield, FiShoppingBag, FiStar, FiTruck, FiZap } from "react-icons/fi";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
      imageUrl:
        "https://images.unsplash.com/photo-1747566500433-97d8bee6e6bb?w=1400&auto=format&fit=crop&q=80",
    },
    {
      title: "Electronics Sale",
      subtitle: "Latest tech gadgets at unbeatable prices",
      cta: "Explore Deals",
      link: "/products?category=Electronics",
      imageUrl:
        "https://images.unsplash.com/photo-1732900309946-7efe975d6ae1?w=1400&auto=format&fit=crop&q=80",
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50 - Limited time offer",
      cta: "Learn More",
      link: "/about",
      imageUrl:
        "https://images.unsplash.com/photo-1584824388178-1defc3484ce3?w=1400&auto=format&fit=crop&q=80",
    },
  ];

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: FiZap,
      title: "Fast Delivery",
      description: "Quick processing and shipping",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ];

  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG", "Dell", "HP", "Canon", "Nikon"];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
      text: "Amazing products and fast shipping! Highly recommend this store.",
    },
    {
      name: "Mike Chen",
      role: "Verified Buyer",
      rating: 5,
      text: "Best online shopping experience. Great prices and customer service.",
    },
    {
      name: "Emma Davis",
      role: "Verified Buyer",
      rating: 5,
      text: "Love the variety of products. Always find what I need!",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar />

      <main>
        {/* Hero Swiper Section */}
        <section className="hero">
          <div className="hero-content w-full">
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              effect="fade"
              className="w-full h-96 md:h-[28rem]"
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full rounded-box overflow-hidden">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-80"
                      style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="text-center max-w-3xl px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-neutral-content opacity-95">
                          {slide.subtitle}
                        </p>
                        <Link
                          href={slide.link}
                          className="btn btn-primary btn-lg gap-2 inline-flex items-center"
                        >
                          {slide.cta}
                          <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Brands Marquee */}
        <section className="py-8 bg-base-100 border-t border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-medium text-lg mb-4">Trusted By Leading Brands</h2>
            <Marquee gradient={false} speed={50}>
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="mx-6 px-6 py-3 bg-base-200 rounded-lg shadow-sm flex items-center justify-center"
                >
                  <span className="font-bold text-lg">{brand}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-8">Why Shop With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="card bg-base-100 shadow-sm p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary text-3xl">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                        <p className="text-sm opacity-80">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
                  <div key={i} className="card card-compact bg-base-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="card card-compact bg-base-100 shadow hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product._id}`}>
                      <figure className="h-56 bg-neutral/10">
                        <img
                          src={product.imageUrl || product.image || "https://via.placeholder.com/400"}
                          alt={product.title || product.name}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                    </Link>
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${product._id}`}>
                          <h3 className="card-title line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                            {product.title || product.name}
                          </h3>
                        </Link>
                        <div className="badge badge-primary">${product.price}</div>
                      </div>
                      <p className="text-sm opacity-80 line-clamp-2">
                        {product.shortDescription || product.description || "No description available."}
                      </p>
                      <div className="card-actions justify-between items-center mt-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} />
                          ))}
                        </div>
                        <Link href={`/products/${product._id}`} className="btn btn-outline btn-sm">
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

        {/* Testimonials Marquee */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-8">Customer Reviews</h2>
            <Marquee gradient={true} speed={40} pauseOnHover={true}>
              {testimonials.map((t, idx) => (
                <div key={idx} className="mx-4 w-80">
                  <div className="card bg-base-100 shadow p-6">
                    <div className="mb-3 flex gap-1 text-yellow-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} />
                      ))}
                    </div>
                    <p className="italic mb-4">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-sm opacity-70">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

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
