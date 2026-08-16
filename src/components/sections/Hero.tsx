import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Atom,
  Hexagon,
  Database,
  Triangle,
  Server,
  GitBranch,
} from 'lucide-react';
import { HOME_PAGE, PERSONAL_INFO, SOCIAL_LINKS, TECH_STACK } from '../../constants';
import { STAGGER, revealBody, revealHeading, staggerContainer } from '../../lib/motion';
import { chip, namePlate, primaryAction, secondaryAction } from '../../lib/styles';

const profileImg640 = '/profile-640.webp';
const profileImg960 = '/profile-960.webp';
const profileImgOriginal = '/profile.webp';

// lucide has no brand marks, so each entry pairs the closest generic glyph
// with the name it stands for -- the label is what identifies the tech.
// Scoped to this file rather than shared, so a page that renders no icons
// does not pull the whole set into its chunk.
const iconMap = {
  Atom,
  Hexagon,
  Database,
  Triangle,
  Server,
  GitBranch,
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

const TechStrip = ({ align = 'flex-start' }: { align?: 'flex-start' | 'center' }) => (
  <ul
    aria-label="Core stack"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: align,
      gap: '6px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    }}
  >
    {TECH_STACK.map(({ icon, label }) => {
      const Icon = iconMap[icon as keyof typeof iconMap];
      return (
        <li key={label} style={chip}>
          {Icon ? <Icon size={11} style={{ color: 'var(--color-signal)', flexShrink: 0 }} aria-hidden="true" /> : null}
          <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
        </li>
      );
    })}
  </ul>
);

const Hero = () => (
  <section
    style={{
      position: 'relative',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '64px',
    }}
  >
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      style={{ position: 'relative', zIndex: 2, paddingTop: '40px', paddingBottom: '96px' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* initial={false} on purpose: this column is the LCP element.
            Section 4 requires the headline, sub-copy and card to sit in the
            prerendered HTML at their final position and be readable at first
            paint, so the hero must not ship hidden and wait for hydration to
            reveal itself.

            The hero therefore has no entrance animation. Step 4 rebuilds it as
            HeroXray, where section 4 specifies the real behaviour: a static
            hold frame in the HTML, with motion taking over only after
            requestIdleCallback and document.fonts.ready. */}
        <motion.div variants={staggerContainer(STAGGER.loose, 0.05)} initial={false} animate="show">
          <motion.div variants={revealBody} style={{ marginBottom: '28px' }}>
            <span style={{ ...chip, padding: '6px 14px' }}>
              <span className="status-dot" />
              {HOME_PAGE.badge}
            </span>
          </motion.div>

          {/* Mask wipe, not a per-character typewriter. The clip lives on the
              h1 and the travel on the span inside it. */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: '-0.035em',
              marginBottom: '4px',
              fontSize: 'clamp(var(--text-4xl), 12vw, var(--text-5xl))',
              color: 'var(--color-chalk)',
              overflow: 'hidden',
            }}
          >
            <motion.span variants={revealHeading} style={{ display: 'block' }}>
              {PERSONAL_INFO.name}
            </motion.span>
          </h1>

          <motion.div
            variants={revealBody}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '16px', marginBottom: '18px' }}
          >
            <div
              aria-hidden="true"
              style={{ width: '28px', height: '1px', background: 'var(--color-signal)', flexShrink: 0, marginTop: '11px' }}
            />
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 'clamp(var(--text-base), 3.5vw, var(--text-lg))',
                  color: 'var(--color-chalk-2)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                  maxWidth: '440px',
                }}
              >
                {PERSONAL_INFO.role}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-chalk-3)',
                  lineHeight: 1.5,
                  marginTop: '7px',
                  maxWidth: '440px',
                }}
              >
                {PERSONAL_INFO.context}
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={revealBody}
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-chalk-2)',
              lineHeight: 1.85,
              maxWidth: '500px',
              marginBottom: '32px',
            }}
          >
            {PERSONAL_INFO.intro}
          </motion.p>

          <motion.div variants={revealBody} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            <Link to="/projects" style={primaryAction}>
              {HOME_PAGE.viewProjects} <ArrowRight size={15} />
            </Link>
            <Link to="/contact" style={secondaryAction}>
              {HOME_PAGE.contactMe}
            </Link>
          </motion.div>

          <motion.div variants={revealBody} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
            <span style={{ color: 'var(--color-chalk-3)', fontSize: 'var(--text-xs)', marginLeft: '4px' }}>
              {HOME_PAGE.locationNote}
            </span>
          </motion.div>
        </motion.div>

        {/* Same reasoning as the text column: this is the hero card. */}
        <motion.div variants={revealBody} initial={false} animate="show" className="lg:justify-self-end">
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-rule)',
                width: '100%',
                maxWidth: '385px',
                margin: '0 auto',
              }}
            >
              <img
                className="hero-profile-image"
                src={profileImg640}
                srcSet={`${profileImg640} 640w, ${profileImg960} 960w, ${profileImgOriginal} 1324w`}
                sizes="(max-width: 767px) min(calc(100vw - 32px), 385px), 385px"
                alt="Arman Khan"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="662"
                height="882"
                style={{ width: '100%', height: 'min(560px, 82vw)', minHeight: '360px', objectFit: 'cover', display: 'block' }}
              />

              <div
                className="hidden md:block"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(20px, 4vw, 30px)',
                  background: 'linear-gradient(to top, var(--color-void), transparent)',
                }}
              >
                {/* Name plate and stack only. The role and the student line sit
                    in the hero column immediately to the left, so repeating
                    them inside the portrait read as an echo. */}
                <p style={namePlate}>{PERSONAL_INFO.name}</p>
                <TechStrip />
              </div>

              <span
                style={{
                  ...chip,
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'var(--color-void)',
                  color: 'var(--color-verified)',
                }}
              >
                <span className="status-dot" />
                Available
              </span>
            </div>

            <div className="block md:hidden" style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={namePlate}>{PERSONAL_INFO.name}</p>
              <TechStrip align="center" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
