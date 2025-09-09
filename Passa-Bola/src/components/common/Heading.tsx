import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  variant?: 'hero' | 'section' | 'subsection';
}

const sentenceVariant: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const Heading = ({ children, as = 'h2', className, variant = 'section' }: HeadingProps) => {
  const baseStyles = 'font-heading text-dark-text';
  const variantStyles = {
    hero: 'text-4xl md:text-7xl font-extrabold',
    section: 'text-3xl md:text-5xl font-bold',
    subsection: 'text-2xl md:text-3xl font-semibold',
  };

  const text = typeof children === 'string' ? children : '';
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      variants={sentenceVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={letterVariant} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionComponent>
  );
};