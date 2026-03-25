import React from 'react';
import useReveal from '../../hooks/useReveal';

const RevealWrapper = ({ children, delay = 0, className = '' }) => {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default RevealWrapper;
