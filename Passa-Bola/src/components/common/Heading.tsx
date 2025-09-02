import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  variant?: 'hero' | 'section' | 'subsection';
}

export const Heading = ({ children, as: Component = 'h2', className, variant = 'section' }: HeadingProps) => {
  const baseStyles = 'font-heading text-dark-text';

  const variantStyles = {
    hero: 'text-4xl md:text-6xl font-bold',
    section: 'text-3xl md:text-4xl font-bold',
    subsection: 'text-2xl md:text-3xl font-semibold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <Component className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {children}
      </Component>
    </motion.div>
  );
};