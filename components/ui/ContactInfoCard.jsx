'use client';

import { motion } from 'framer-motion';

export default function ContactInfoCard({ icon: Icon, title, value, link, index = 0 }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="card bg-base-200 shadow-lg p-8 text-center hover:shadow-2xl transition-shadow"
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="text-3xl text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-70">{value}</p>
    </motion.a>
  );
}
