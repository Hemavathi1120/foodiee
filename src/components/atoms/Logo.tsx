
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-serif text-2xl font-bold tracking-wider ${className}`}>
      <span className="text-amber-500">LUMIÈRE</span>
      <span className="text-white ml-2">DINING</span>
    </div>
  );
};

export default Logo;
