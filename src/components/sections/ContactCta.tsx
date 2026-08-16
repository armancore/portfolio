import React from 'react';
import { motion } from 'motion/react';
import { HOME_PAGE, PERSONAL_INFO } from '../../constants';
import { revealBody, viewport } from '../../lib/motion';
import { eyebrow, primaryAction } from '../../lib/styles';

const ContactCta = () => (
  <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={revealBody} initial="hidden" whileInView="show" viewport={viewport}>
        <div className="panel" style={{ padding: 'clamp(52px, 6vw, 88px)', textAlign: 'center' }}>
          <p style={eyebrow}>{HOME_PAGE.ctaEyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(var(--text-2xl), 5vw, var(--text-4xl))',
              color: 'var(--color-chalk)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '16px',
            }}
          >
            {HOME_PAGE.ctaHeading}
          </h2>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-chalk-2)',
              maxWidth: '450px',
              margin: '0 auto 36px',
              lineHeight: 1.75,
            }}
          >
            {HOME_PAGE.ctaBody}
          </p>

          <a href={`mailto:${PERSONAL_INFO.email}`} style={{ ...primaryAction, padding: '14px 28px' }}>
            {PERSONAL_INFO.email}
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '20px',
            }}
          >
            <span className="status-dot" />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-chalk-3)' }}>{HOME_PAGE.ctaResponse}</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactCta;
