import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HOME_PAGE, PERSONAL_INFO } from '../../constants';
import { STAGGER, revealBody, staggerContainer } from '../../lib/motion';
import HeroXray from './HeroXray';

const Hero = () => (
  <section className="xray-section" style={{ position: 'relative' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2 }}>
      <div className="xray-grid">
        <motion.div variants={staggerContainer(STAGGER.loose, 0.05)} initial={false} animate="show">
          <motion.h1
            variants={revealBody}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.0,
              color: 'var(--color-chalk)',
              margin: '0 0 calc(var(--spacing) * 8)',
            }}
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          <motion.p
            variants={revealBody}
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-chalk-2)',
              lineHeight: 1.7,
              maxWidth: '46ch',
              marginBottom: 'calc(var(--spacing) * 12)',
            }}
          >
            {PERSONAL_INFO.intro}
          </motion.p>

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

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HeroXray />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
