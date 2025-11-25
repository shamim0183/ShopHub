'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AnimatedCard from '@/components/ui/AnimatedCard';
import HeroSection from '@/components/ui/HeroSection';
import ImageWithOverlay from '@/components/ui/ImageWithOverlay';
import SectionHeader from '@/components/ui/SectionHeader';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';

export default function AboutPage() {
  const stats = [
    { icon: FiUsers, value: '10,000+', label: 'Happy Customers' },
    { icon: FiTrendingUp, value: '50,000+', label: 'Products Sold' },
    { icon: FiAward, value: '15+', label: 'Awards Won' },
    { icon: FiZap, value: '99.9%', label: 'Uptime' },
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Customer First',
      description: 'We prioritize your satisfaction above everything else. Your happiness is our success.',
    },
    {
      icon: FiShield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with industry-leading security measures.',
    },
    {
      icon: FiZap,
      title: 'Innovation',
      description: 'We constantly evolve to bring you the latest features and best shopping experience.',
    },
    {
      icon: FiAward,
      title: 'Quality Products',
      description: 'Every product is carefully curated to ensure the highest quality standards.',
    },
  ];

  const team = [
    { name: 'Md Shamim Hossain', role: 'CEO & Founder', image: 'https://i.ibb.co.com/MxsMyJzH/01838326265.jpg' },
    { name: 'Michael Chen', role: 'CTO', image: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Emma Davis', role: 'Head of Marketing', image: 'https://i.pravatar.cc/150?img=5' },
    { name: 'James Wilson', role: 'Product Manager', image: 'https://i.pravatar.cc/150?img=12' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection
          title="About ShopHub"
          subtitle="Your trusted partner in online shopping. We're on a mission to make e-commerce accessible, enjoyable, and secure for everyone."
        />

        {/* Stats Section */}
        <section className="py-16 bg-base-100">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="card bg-base-200 shadow-lg p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <stat.icon className="text-5xl text-primary" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="opacity-70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-lg opacity-80">
                  <p>
                    Founded in 2020, ShopHub started with a simple vision: to create an online
                    marketplace that puts customers first. What began as a small startup has grown
                    into a thriving platform serving thousands of happy customers.
                  </p>
                  <p>
                    We believe shopping should be more than just transactions. It's about
                    discovering products you love, connecting with brands you trust, and enjoying
                    every step of the journey.
                  </p>
                  <p>
                    Today, we're proud to offer a curated selection of quality products, backed by
                    exceptional customer service and a commitment to innovation.
                  </p>
                </div>
              </motion.div>

              <ImageWithOverlay
                imageUrl="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlJTIwYnVzaW5lc3N8ZW58MHx8MHx8fDA%3D"
                title="Innovation Driven"
                subtitle="Constantly evolving to serve you better"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Our Values"
              subtitle="The principles that guide everything we do"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <AnimatedCard
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Meet Our Team"
              subtitle="The passionate people behind ShopHub"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="card bg-base-100 shadow-lg overflow-hidden"
                >
                  <figure className="px-6 pt-6 pb-1">
                    <div className="avatar">
                      <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>
                  </figure>
                  <div className="card-body items-center text-center">
                    <h3 className="card-title">{member.name}</h3>
                    <p className="opacity-70">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover amazing products today!
              </p>
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none"
              >
                Browse Products
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
