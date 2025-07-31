'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedFormFieldProps {
  children: ReactNode;
  index?: number;
  delay?: number;
}

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function AnimatedFormField({ 
  children, 
  index = 0, 
  delay = 0.1 
}: AnimatedFormFieldProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fieldVariants}
      transition={{
        duration: 0.5,
        delay: index * delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
} 