'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ContactInfoCard from '@/components/ui/ContactInfoCard';
import HeroSection from '@/components/ui/HeroSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      value: 'programming@hero.com',
      link: 'mailto:programming@hero.com',
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      value: '01322-901105',
      link: 'tel:01322901105',
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      value: 'Level-4, 34, Awal Centre, Dhaka 1213',
      link: 'https://maps.google.com/?q=Programming+Hero+Dhaka',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for contacting us. We\'ll get back to you soon!',
        confirmButtonColor: '#ee0979',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection
          title="Get In Touch"
          subtitle="Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        {/* Contact Info Cards */}
        <section className="py-16 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  value={info.value}
                  link={info.link}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="card bg-base-100 shadow-2xl p-8">
                  <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Your Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Subject *</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Message *</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="textarea textarea-bordered w-full"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary w-full gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="card bg-base-100 shadow-2xl overflow-hidden h-96">
                  <iframe
                    src="https://maps.google.com/maps?q=Programming+Hero,+Level-4,+34,+Awal+Centre,+Dhaka+1213&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Business Hours */}
                <div className="card bg-base-100 shadow-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Monday - Friday</span>
                      <span className="opacity-70">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Saturday</span>
                      <span className="opacity-70">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Sunday</span>
                      <span className="opacity-70">Closed</span>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl p-8 text-center"
                >
                  <h3 className="text-2xl font-bold mb-3">Need Quick Answers?</h3>
                  <p className="mb-4 opacity-90">Check out our FAQ section for instant help</p>
                  <Link href="/faq" className="btn bg-white text-primary hover:bg-base-100 border-none">
                    Visit FAQ
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
