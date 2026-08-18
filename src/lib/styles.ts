/**
 * Style objects shared across sections and pages.
 *
 * Every value resolves to a token from the @theme block in src/index.css --
 * nothing here introduces a colour, radius, duration or easing of its own.
 * These exist because the same four shapes were being redeclared at the top of
 * six different files, which is how palettes drift apart.
 *
 * Icon maps deliberately do NOT live here. A single shared lucide map would
 * make every page import every icon any page uses, and defeat tree-shaking;
 * each section keeps its own.
 */

import type React from 'react';

/** Tag, category and stack chips. Mono, neutral, one hairline border. */
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

/**
 * The small mono label that introduces a section.
 *
 * Muted, not amber. One amber call to action per viewport is a site-wide rule,
 * and a page with five sections would otherwise spend five ambers on labels
 * before reaching the one CTA that is supposed to be the accent.
 */
export const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-3)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: 'calc(var(--spacing) * 2.5)',
};

/** Section-level h2. */
export const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(var(--text-xl), 4vw, var(--text-3xl))',
  color: 'var(--color-chalk)',
};

/** The short secondary line that sits opposite a section heading. */
export const asideCopy: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-chalk-2)',
  maxWidth: '34ch',
  lineHeight: 1.6,
};

/** Muted mono, for indices, counts and captions. */
export const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-3)',
};

/** Primary action: amber fill, void label. Never white on amber -- it fails AA. */
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

/** Secondary action: hairline outline on the page surface. */
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

/** The name plate used over the hero portrait and the About portrait. */
export const namePlate: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'var(--text-lg)',
  color: 'var(--color-chalk)',
  letterSpacing: '-0.015em',
  marginBottom: '12px',
};
