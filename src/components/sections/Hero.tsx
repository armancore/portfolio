import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { HOME_PAGE, PERSONAL_INFO, SOCIAL_LINKS } from '../../constants';
import { STAGGER, revealBody, staggerContainer } from '../../lib/motion';
import { secondaryAction } from '../../lib/styles';
import HeroXray from './HeroXray';

// Scoped to this file rather than shared, so a page that renders no icons does
// not pull the whole set into its chunk.
const iconMap = { Github, Linkedin, Facebook, Instagram };

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

          <motion.div
            variants={revealBody}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'calc(var(--spacing) * 3)',
              marginBottom: 'calc(var(--spacing) * 8)',
            }}
          >
            {/* Both quiet. The sweep line is the hero's amber, and a filled
                button beside it would be a second accent competing with the
                signature moment. */}
            <Link to="/projects" className="btn-quiet" style={secondaryAction}>
              {HOME_PAGE.viewProjects} <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-quiet" style={secondaryAction}>
              {HOME_PAGE.contactMe}
            </Link>
          </motion.div>

          <motion.div variants={revealBody} style={{ display: 'flex', alignItems: 'center', gap: 'calc(var(--spacing) * 2.5)', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    background: 'var(--color-panel)',
                    color: 'var(--color-chalk-2)',
                    textDecoration: 'none',
                  }}
                >
                  {Icon ? <Icon size={15} /> : null}
                </a>
              );
            })}
            <span style={{ color: 'var(--color-chalk-3)', fontSize: 'var(--text-xs)', marginLeft: 'var(--spacing)' }}>
              {HOME_PAGE.locationNote}
            </span>
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
