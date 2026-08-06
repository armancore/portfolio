import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink,
  Layers,
  Cpu,
  Globe,
  Code2,
  Atom,
  Hexagon,
  Database,
  Triangle,
  Server,
  GitBranch,
} from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import {
  BENTO_SKILLS,
  HOME_PAGE,
  PERSONAL_INFO,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_STACK,
} from '../constants';
import { fadeUp, staggerContainer, heroVariants, viewport, cardReveal } from '../lib/motion';

const profileImg640 = '/profile-640.webp';
const profileImg960 = '/profile-960.webp';
const profileImgOriginal = '/profile.webp';

// lucide has no brand marks, so each entry pairs the closest generic glyph
// with the name it stands for -- the label is what identifies the tech.
const iconMap = {
  Atom,
  Hexagon,
  Database,
  Triangle,
  Server,
  GitBranch,
  Layers,
  Cpu,
  Globe,
  Code2,
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

const chip: React.CSSProperties = {
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

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-signal)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: '10px',
};

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(var(--text-xl), 4vw, var(--text-3xl))',
  color: 'var(--color-chalk)',
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

const Home = () => {
  // Only TriLearn carries featured: true, so top the preview up with the next
  // entries in order -- the two-card grid stretches badly with a single child.
  const featured = [...PROJECTS].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 2);
  const prefersReducedMotion = useReducedMotion();
  const reduceAnimations = Boolean(prefersReducedMotion);

  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/" />

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
            <motion.div
              variants={staggerContainer(0.09, 0.05)}
              initial={reduceAnimations ? false : 'hidden'}
              animate="show"
            >
              <motion.div variants={heroVariants} style={{ marginBottom: '28px' }}>
                <span style={{ ...chip, padding: '6px 14px' }}>
                  <span className="status-dot" />
                  {HOME_PAGE.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={heroVariants}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  lineHeight: 0.96,
                  letterSpacing: '-0.035em',
                  marginBottom: '4px',
                  fontSize: 'clamp(var(--text-4xl), 12vw, var(--text-5xl))',
                  color: 'var(--color-chalk)',
                }}
              >
                {PERSONAL_INFO.name}
              </motion.h1>

              <motion.div
                variants={heroVariants}
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
                variants={heroVariants}
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

              <motion.div
                variants={heroVariants}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}
              >
                <Link
                  to="/projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-signal)',
                    padding: '13px 24px',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-void)',
                    textDecoration: 'none',
                  }}
                >
                  {HOME_PAGE.viewProjects} <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    padding: '13px 24px',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-chalk)',
                    textDecoration: 'none',
                  }}
                >
                  {HOME_PAGE.contactMe}
                </Link>
              </motion.div>

              <motion.div
                variants={heroVariants}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
              >
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

            <motion.div
              variants={heroVariants}
              initial={reduceAnimations ? false : 'hidden'}
              animate="show"
              className="lg:justify-self-end"
            >
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
                    {/* Name plate and stack only. The role and the student line
                        sit in the hero column immediately to the left, so
                        repeating them inside the portrait read as an echo. */}
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'var(--text-lg)',
                        color: 'var(--color-chalk)',
                        letterSpacing: '-0.015em',
                        marginBottom: '12px',
                      }}
                    >
                      {PERSONAL_INFO.name}
                    </p>
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
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'var(--text-lg)',
                      color: 'var(--color-chalk)',
                      letterSpacing: '-0.015em',
                      marginBottom: '12px',
                    }}
                  >
                    {PERSONAL_INFO.name}
                  </p>
                  <TechStrip align="center" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p style={eyebrow}>{HOME_PAGE.skillsEyebrow}</p>
            <h2 style={{ ...sectionHeading, marginBottom: '52px' }}>{HOME_PAGE.skillsHeading}</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: '14px',
            }}
          >
            {BENTO_SKILLS.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <motion.div key={s.title} variants={cardReveal} className="panel" style={{ padding: '28px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-panel-2)',
                      border: '1px solid var(--color-rule)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {Icon ? <Icon size={20} style={{ color: 'var(--color-signal)' }} aria-hidden="true" /> : null}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-chalk)',
                      marginBottom: '8px',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.65 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{ textAlign: 'center', marginTop: '32px' }}
          >
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-rule)',
                padding: '10px 20px',
                minHeight: '44px',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-chalk-2)',
                textDecoration: 'none',
              }}
            >
              {HOME_PAGE.skillsCta} <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '52px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <p style={eyebrow}>{HOME_PAGE.workEyebrow}</p>
                <h2 style={sectionHeading}>{HOME_PAGE.workHeading}</h2>
              </div>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-signal)',
                  textDecoration: 'none',
                }}
              >
                {HOME_PAGE.workCta} <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))',
              gap: '20px',
            }}
          >
            {featured.map((p) => (
              <motion.div
                key={p.id}
                variants={cardReveal}
                className="panel"
                style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '8px' }}>
                  <span
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-chalk-3)' }}
                  >
                    {p.num}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                    <span style={chip}>{p.category}</span>
                    {p.status ? <span style={chip}>{p.status}</span> : null}
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                    color: 'var(--color-chalk)',
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-chalk-2)',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {p.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                  {p.tags.map((t) => (
                    <span key={t.label} style={chip}>
                      {t.label}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--color-rule)',
                    paddingTop: '16px',
                    gap: '12px',
                  }}
                >
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-verified)',
                        textDecoration: 'none',
                      }}
                    >
                      <span className="status-dot" />
                      Live Demo <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span style={chip}>{p.status || 'In Progress'}</span>
                  )}
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-chalk-3)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Github size={12} /> GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
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

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-signal)',
                  padding: '14px 28px',
                  minHeight: '44px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-void)',
                  textDecoration: 'none',
                }}
              >
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
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-chalk-3)' }}>
                  {HOME_PAGE.ctaResponse}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
