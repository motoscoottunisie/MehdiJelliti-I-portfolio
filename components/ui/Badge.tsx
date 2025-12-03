import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'animated-border' | 'glass';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  if (variant === 'animated-border') {
    return (
      <div className={`relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}>
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#F56E0F_50%,#171717_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-1 text-xs font-medium text-white backdrop-blur-3xl uppercase tracking-widest">
          {children}
        </span>
      </div>
    );
  }

  if (variant === 'glass') {
    return (
      <div className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[10px] font-bold text-white uppercase tracking-[0.2em] backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
};