
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  const baseStyles = "font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-600 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-400 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-amber-500",
    outline: "border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default Button;
