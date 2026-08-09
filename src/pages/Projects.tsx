import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageMeta from '../components/seo/PageMeta';
import { PROJECTS, PROJECTS_PAGE } from '../constants';
import { fadeUp, staggerContainer } from '../lib/motion';

// Derived so a filter button can never outlive the projects it filters for.
const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];

const chip: React.CSSProperties = {
  padding: '3px 10px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-panel-2)',
  border: '1px solid var(--color-rule)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-2)',
  fontFamily: 'var(--font-mono)',
};

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-chalk-3)',
};

const Projects = () => {
  const [active, setActive] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const reduceAnimations = prefersReducedMotion;
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const portfolioProjectNum = String(PROJECTS.length + 1).padStart(2, '0');

  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/projects" />

      <section style={{ paddingTop: '110px', paddingBottom: '60px', position: 'relative' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial={reduceAnimations ? false : 'hidden'}
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              style={{
                ...monoLabel,
                color: 'var(--color-signal)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              {PROJECTS_PAGE.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(var(--text-3xl), 7vw, var(--text-5xl))',
                color: 'var(--color-chalk)',
                letterSpacing: '-0.035em',
                lineHeight: 1.03,
                marginBottom: '16px',
              }}
            >
              {PROJECTS_PAGE.heading}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(var(--text-sm), 3.6vw, var(--text-base))',
                color: 'var(--color-chalk-2)',
                maxWidth: '520px',
                lineHeight: 1.75,
              }}
            >
              {PROJECTS_PAGE.intro}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '24px 0 88px', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                paddingTop: '36px',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  type="button"
                  aria-pressed={active === cat}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 18px',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    border: `1px solid ${active === cat ? 'var(--color-signal)' : 'var(--color-rule)'}`,
                    background: active === cat ? 'var(--color-panel-2)' : 'transparent',
                    color: active === cat ? 'var(--color-signal)' : 'var(--color-chalk-2)',
                    transition: 'color var(--duration-tap) var(--ease-signal), border-color var(--duration-tap) var(--ease-signal)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p style={{ ...monoLabel, marginBottom: '36px' }} aria-live="polite">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </p>
          </RevealWrapper>

          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '18px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const isFeatured = Boolean(p.featured);
                return (
                  <ScrollReveal key={p.id} delay={i * 0.07}>
                    <motion.div
                      layout
                      initial={reduceAnimations ? false : { opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: reduceAnimations
                          ? { duration: 0 }
                          : { duration: 0.32, delay: i * 0.06, ease: [0.2, 0.85, 0.2, 1] },
                      }}
                      exit={reduceAnimations ? undefined : { opacity: 0, transition: { duration: 0.24 } }}
                      className="panel"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        height: '100%',
                      }}
                    >
                      <div style={{ padding: 'clamp(18px, 4vw, 26px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '16px',
                            gap: '8px',
                          }}
                        >
                          <span style={monoLabel}>{p.num}</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                            {isFeatured ? (
                              <span
                                style={{
                                  ...chip,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  color: 'var(--color-signal)',
                                  borderColor: 'var(--color-signal)',
                                }}
                              >
                                <Star size={10} fill="currentColor" /> Featured
                              </span>
                            ) : null}
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
                            lineHeight: 1.3,
                            marginBottom: '10px',
                          }}
                        >
                          {p.title}
                        </h3>
                        <p
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-chalk-2)',
                            lineHeight: 1.78,
                            marginBottom: '18px',
                            flex: 1,
                          }}
                        >
                          {p.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
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
                            flexWrap: 'wrap',
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
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-rule)',
                                padding: '7px 14px',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-verified)',
                                textDecoration: 'none',
                              }}
                            >
                              <span className="status-dot" />
                              Live Demo <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '7px 14px',
                                border: '1px solid var(--color-rule)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-chalk-3)',
                              }}
                            >
                              <span className="status-dot status-dot--idle" />
                              {p.status || 'In Progress'}
                            </span>
                          )}
                          {p.githubUrl ? (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              <Github size={13} /> Source
                            </a>
                          ) : (
                            <span style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Github size={13} /> Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <RevealWrapper delay={200}>
            <div className="panel" style={{ marginTop: '48px', overflow: 'hidden' }}>
              <div
                style={{
                  padding: 'clamp(18px, 4vw, 28px)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={monoLabel}>{portfolioProjectNum}</span>
                    <span style={chip}>{PROJECTS_PAGE.selfLabel}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'var(--text-lg)',
                      color: 'var(--color-chalk)',
                      marginBottom: '8px',
                    }}
                  >
                    {PROJECTS_PAGE.selfTitle}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-chalk-2)',
                      marginBottom: '14px',
                      lineHeight: 1.75,
                    }}
                  >
                    {PROJECTS_PAGE.selfDescription}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {PROJECTS_PAGE.selfTechs.map((t) => (
                      <span key={t} style={chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={PROJECTS_PAGE.selfRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-rule)',
                    padding: '10px 20px',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-chalk)',
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                >
                  <Github size={14} /> View on GitHub
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
};

export default Projects;
