'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const pageTransition = {
  duration: 0.6,
  ease: "easeOut" as const,
};

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
} 