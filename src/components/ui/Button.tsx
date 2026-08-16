import React from 'react';

type ButtonProps = {
  as?: React.ElementType;
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  className?: string;
} & Record<string, unknown>;

const Button = ({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-[0.08em] uppercase cursor-pointer transition-colors duration-tap ease-signal';

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
    xl: 'px-8 py-4 text-sm',
  };

  // Amber on void is the primary fill. Its label is --color-void rather than
  // white: amber is light enough that white text on it fails AA outright.
  const variants = {
    primary: 'bg-signal text-void hover:bg-signal/90',
    outline: 'border border-rule text-chalk hover:border-signal hover:text-signal',
    ghost: 'text-chalk-2 hover:text-chalk bg-transparent',
    secondary: 'bg-panel border border-rule text-chalk hover:bg-panel-2',
  };

  return (
    <Component className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Button;
