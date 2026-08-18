import type React from 'react';

export const chip: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '4px 9px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-panel-2)',
  border: '1px solid var(--color-rule)',
  fontSize: 'var(--text-xs)',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-chalk-2)',
};

export const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-3)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: 'calc(var(--spacing) * 2.5)',
};

export const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(var(--text-xl), 4vw, var(--text-3xl))',
  color: 'var(--color-chalk)',
};

export const asideCopy: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-chalk-2)',
  maxWidth: '34ch',
  lineHeight: 1.6,
};

export const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-3)',
};

export const primaryAction: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-signal)',
  padding: '13px 24px',
  minHeight: '44px',
  fontSize: 'var(--text-sm)',
  fontWeight: 600,
  color: 'var(--color-void)',
  textDecoration: 'none',
};

export const secondaryAction: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-rule)',
  padding: '13px 24px',
  minHeight: '44px',
  fontSize: 'var(--text-sm)',
  color: 'var(--color-chalk)',
  textDecoration: 'none',
};

export const namePlate: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'var(--text-lg)',
  color: 'var(--color-chalk)',
  letterSpacing: '-0.015em',
  marginBottom: '12px',
};
