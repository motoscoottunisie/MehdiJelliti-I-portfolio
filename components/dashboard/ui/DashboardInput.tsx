import React from 'react';

interface DashboardInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  icon?: React.ReactNode;
  textarea?: boolean;
  className?: string;
  helperText?: string;
}

export const DashboardInput: React.FC<DashboardInputProps> = ({ 
  label, 
  icon, 
  textarea = false, 
  className = '', 
  helperText,
  ...props 
}) => {
  const baseClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-app-accent focus:outline-none transition-colors text-sm placeholder-white/20";

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
        {icon && <span className="text-app-accent">{icon}</span>}
        {label}
      </label>
      
      {textarea ? (
        <textarea 
          className={`${baseClasses} resize-none min-h-[100px] leading-relaxed custom-scrollbar`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input 
          className={baseClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {helperText && <p className="text-[10px] text-gray-500">{helperText}</p>}
    </div>
  );
};