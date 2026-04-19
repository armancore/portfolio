import React from 'react';

const Badge = ({ label, color = 'blue', className = '' }) => {
  const colorMap = {
    blue: 'bg-[var(--accent-glow)] text-accent border border-accent/20',
    purple: 'bg-[var(--accent2-glow)] text-accent2 border border-accent2/20',
    teal: 'bg-[var(--accent3-glow)] text-accent3 border border-accent3/20',
    orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium font-mono ${colorMap[color] || colorMap.blue} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
