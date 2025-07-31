'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
}

const buttonVariants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -2,
  },
  tap: {
    scale: 0.98,
    y: 0,
  },
};

const buttonStyles = {
  primary: 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 flex justify-center items-center shadow-lg hover:shadow-xl',
  secondary: 'w-full bg-white/10 border border-white/20 text-white font-medium py-3 px-4 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl',
  ghost: 'w-full bg-transparent text-white font-medium py-3 px-4 rounded-xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 flex items-center justify-center',
};

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}: AnimatedButtonProps) {
  const baseClass = buttonStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={!isDisabled ? "hover" : "initial"}
      whileTap={!isDisabled ? "tap" : "initial"}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      className={`${baseClass} ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </motion.button>
  );
} 