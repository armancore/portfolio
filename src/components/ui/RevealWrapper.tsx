import React from 'react';
import useReveal from '../../hooks/useReveal';

type RevealWrapperProps = {
  children: React.ReactNode;
  /** Milliseconds to wait after the element enters the viewport. */
  delay?: number;
  className?: string;
  /** Skips the observer and reveals immediately. */
  disabled?: boolean;
};

const RevealWrapper = ({ children, delay = 0, className = '', disabled = false }: RevealWrapperProps) => {
  const ref = useReveal(delay, disabled);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default RevealWrapper;
