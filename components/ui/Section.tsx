import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, id, className, fullWidth = false }) => {
  return (
    <section id={id} className={`py-24 md:py-32 relative ${className || ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Apple-style ease
        className={fullWidth ? "w-full" : "max-w-6xl mx-auto px-6 md:px-12 lg:px-20"}
      >
        {children}
      </motion.div>
    </section>
  );
};