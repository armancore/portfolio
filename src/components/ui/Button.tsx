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
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer hover-glow-crisp';

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
    xl: 'px-8 py-4 text-sm'
  };

  const variants = {
    primary: 'bg-gradient-to-r from-accent to-accent2 text-slate-950 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_16px_34px_rgba(88,166,255,0.34)]',
    outline: 'border border-[var(--border-hover)] text-text-primary hover:border-accent hover:text-accent bg-white/[0.02]',
    ghost: 'text-text-secondary hover:text-text-primary bg-transparent',
    secondary: 'bg-bg-tertiary border border-[var(--border)] text-text-primary hover:border-[var(--border-hover)] hover:bg-bg-secondary'
  };

  return (
    <Component
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
