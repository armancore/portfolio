import React from 'react';

/** A hairline rule. Named for the glow it used to carry; the glow is gone
 *  because depth now comes from --color-rule, never from bloom. */
const GlowLine = ({ className = '' }) => {
  return <div className={`w-full h-px bg-rule ${className}`} />;
};

export default GlowLine;
