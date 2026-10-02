import React from 'react';

export function MagnatesLogo({ className = 'h-10 w-auto', dark = false, alt = 'Magnates Media' }) {
  return (
    <img
      src="/assets/magnates_logo.png"
      alt={alt}
      className={`object-contain select-none transition-all duration-200 ${
        dark ? 'invert brightness-125' : ''
      } ${className}`}
    />
  );
}

export default MagnatesLogo;
