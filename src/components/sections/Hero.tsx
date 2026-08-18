import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HOME_PAGE, PERSONAL_INFO } from '../../constants';
import { STAGGER, revealBody, staggerContainer } from '../../lib/motion';
import HeroXray from './HeroXray';

const Hero = () => (
  // Section height, grid and padding all live in .xray-section / .xray-grid, so
  // nothing here is a fixed pixel value.
  <section className="xray-section" style={{ position: 'relative' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2 }}>
      <div className="xray-grid">
        {/* initial={false} on purpose: this column is above the fold. Section 4
            requires the heading, sub-copy and card to sit in the prerendered
            HTML at their final position and be readable at first paint, so the
            hero must not ship hidden and wait for hydration to reveal itself. */}
        <motion.div variants={staggerContainer(STAGGER.loose, 0.05)} initial={false} animate="show">
          <motion.h1
            variants={revealBody}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              // Confident, not shouty.
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.0,
              color: 'var(--color-chalk)',
              margin: '0 0 calc(var(--spacing) * 5)',
            }}
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          <motion.p
            variants={revealBody}
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-chalk-2)',
              lineHeight: 1.8,
              maxWidth: '52ch',
              marginBottom: 'calc(var(--spacing) * 8)',
            }}
          >
            {PERSONAL_INFO.intro}
          </motion.p>

          {/* Two actions, one destination each, and no third row beneath them:
              the four social marks that used to sit here are on every page in
              the footer, this one included. */}
          <motion.div variants={revealBody} className="hero-actions">
            <Link to="/projects" className="hero-action hero-action--primary">
              {HOME_PAGE.viewProjects}
              <ArrowRight className="hero-action__arrow" size={15} aria-hidden="true" />
            </Link>

            <Link to="/contact" className="hero-action hero-action--secondary">
              {HOME_PAGE.contactMe}
            </Link>
          </motion.div>
        </motion.div>

        {/* The signature moment. It renders at its hold frame in the
            prerendered HTML, so this column is never the thing waiting on
            hydration. */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HeroXray />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
