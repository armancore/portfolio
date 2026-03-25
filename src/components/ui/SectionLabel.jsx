import React from 'react';

const SectionLabel = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-6 bg-accent block flex-shrink-0" />
      <span className="text-xs tracking-widest uppercase text-accent font-mono font-medium">
        {text}
      </span>
    </div>
  );
};

export default SectionLabel;
