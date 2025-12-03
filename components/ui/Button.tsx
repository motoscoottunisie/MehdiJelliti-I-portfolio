import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'rotate-border';
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  if (variant === 'rotate-border') {
    return (
       <motion.button
        whileTap={{ scale: 0.95 }}
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className || ''}`}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#F56E0F_50%,#171717_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-white/5 tracking-wide">
          {children}
        </span>
      </motion.button>
    );
  }

  const baseStyle = "px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center tracking-wide";
  
  const variants = {
    primary: "bg-app-accent text-white hover:shadow-[0_0_20px_rgba(245,110,15,0.4)] hover:scale-105 active:scale-95 border border-transparent",
    secondary: "bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5 hover:scale-105 active:scale-95",
    // Adding a fallback for rotate-border in the variants object strictly for type safety in the dynamic class string below, 
    // although the early return handles it.
    'rotate-border': "" 
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};