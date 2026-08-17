import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HOME_PAGE } from '../../constants';
import { STAGGER, revealBody, revealHeading, revealRule, staggerContainer, viewport } from '../../lib/motion';
import { eyebrow, primaryAction } from '../../lib/styles';

/**
 * A full-bleed statement, not a boxed card.
 *
 * The panel made the close look like one more component in a stack of
 * components. Rules above and below and nothing behind the type lets it read as
 * an ending. This CTA is the page's single amber below the hero.
 */
const ContactCta = () => (
  <motion.section
    variants={staggerContainer(STAGGER.loose)}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center' }}>
      <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 4)' }}>
        {HOME_PAGE.ctaEyebrow}
      </motion.p>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(var(--text-2xl), 5vw, var(--text-4xl))',
          color: 'var(--color-chalk)',
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          overflow: 'hidden',
          margin: 0,
        }}
      >
        <motion.span variants={revealHeading} style={{ display: 'block' }}>
          {HOME_PAGE.ctaHeading}
        </motion.span>
      </h2>

      <motion.p
        variants={revealBody}
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-chalk-2)',
          maxWidth: '46ch',
          margin: 'calc(var(--spacing) * 4) auto calc(var(--spacing) * 9)',
          lineHeight: 1.8,
        }}
      >
        {HOME_PAGE.ctaBody}
      </motion.p>

      <motion.div variants={revealBody}>
        <Link to="/contact" style={{ ...primaryAction, padding: 'calc(var(--spacing) * 3.5) calc(var(--spacing) * 7)' }}>
          {HOME_PAGE.ctaAction} <ArrowRight size={15} />
        </Link>
      </motion.div>

      <motion.div
        aria-hidden="true"
        variants={revealRule}
        style={{
          height: '1px',
          background: 'var(--color-rule)',
          transformOrigin: 'center',
          marginTop: 'calc(var(--spacing) * 14)',
        }}
      />
    </div>
  </motion.section>
);

export default ContactCta;
