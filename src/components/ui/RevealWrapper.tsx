import React from 'react';
import useReveal from '../../hooks/useReveal';

const RevealWrapper = ({ children, delay = 0, className = '', disabled = false }) => {
  const ref = useReveal(delay, disabled);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default RevealWrapper;
