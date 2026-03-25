import React from 'react';

const GlowLine = ({ className = '' }) => {
  return (
    <div className={`w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent ${className}`} />
  );
};

export default GlowLine;
