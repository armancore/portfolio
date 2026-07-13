import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageMeta from '../components/seo/PageMeta';
import { ACCENT, PROJECTS } from '../constants';
import { fadeUp, staggerContainer, blurIn } from '../lib/motion';

// Derived so a filter button can never outlive the projects it filters for.
const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];
const portfolioTechs = ['React 19', 'Vite 7', 'Tailwind CSS v4', 'React Router v7', 'Motion for React'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const reduceAnimations = prefersReducedMotion;
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const portfolioProjectNum = String(PROJECTS.length + 1).padStart(2, '0');

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta
        title="Projects | Arman Khan"
        description="Explore deployed React projects by Arman Khan, including API apps, frontend builds, tools, and full-stack experiments focused on practical problem solving."
      />

      <section style={{ paddingTop: '110px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(46,143,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(46,143,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div
          animate={reduceAnimations ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
          transition={reduceAnimations ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(46,143,255,0.08) 0%, transparent 65%)', pointerEvents: 'none' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer(0.1, 0.05)} initial={reduceAnimations ? false : 'hidden'} animate={reduceAnimations ? undefined : 'show'}>
            <motion.p variants={fadeUp} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              My work
            </motion.p>
            <motion.h1 variants={blurIn} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 78px)', color: '#ECEEF2', letterSpacing: '-0.035em', lineHeight: 1.03, marginBottom: '16px' }}>
              Projects
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(14px, 3.6vw, 16.5px)', color: '#9BA1AD', maxWidth: '520px', lineHeight: 1.75 }}>
              Real applications I&apos;ve designed, built, and deployed. Every project represents a problem I found interesting and a skill I wanted to sharpen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '24px 0 88px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px', paddingTop: '36px' }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  type="button"
                  whileHover={reduceAnimations ? undefined : { scale: 1.04 }}
                  whileTap={reduceAnimations ? undefined : { scale: 0.96 }}
                  style={{
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    border: active === cat ? '1px solid rgba(46,143,255,0.5)' : '1px solid rgba(255,255,255,0.09)',
                    background: active === cat ? 'linear-gradient(135deg, rgba(46,143,255,0.25), rgba(46,143,255,0.15))' : 'rgba(255,255,255,0.02)',
                    color: active === cat ? '#ECEEF2' : '#9BA1AD',
                    boxShadow: active === cat ? '0 0 0 1px rgba(255,255,255,0.07), 0 8px 20px rgba(46,143,255,0.32)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5C626E', marginBottom: '36px' }}>
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </p>
          </RevealWrapper>

          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '18px' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const isFeatured = Boolean(p.featured);
                return (
                  <ScrollReveal key={p.id} delay={i * 0.07}>
                    <motion.div
                      layout
                      initial={reduceAnimations ? false : { opacity: 0, y: 30, scale: 0.96 }}
                      animate={reduceAnimations ? undefined : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }}
                      exit={reduceAnimations ? undefined : { opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                      whileHover={reduceAnimations ? undefined : { y: -6, borderColor: 'rgba(46,143,255,0.38)', boxShadow: '0 0 0 1px rgba(46,143,255,0.09), 0 24px 52px rgba(0,0,0,0.42)', filter: 'saturate(1.1)' }}
                      transition={reduceAnimations ? undefined : { duration: 0.15, ease: 'easeOut' }}
                      style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #1A1D23, #111317)', boxShadow: '0 0 0 1px rgba(46,143,255,0.06), 0 18px 40px rgba(46,143,255,0.05)', transition: 'border-color 0.15s ease-out, box-shadow 0.15s ease-out, filter 0.15s ease-out' }}
                    >
                      {/* was `${ca.text}80` where ca.text is var(--color-accent);
                          appending a hex alpha to a var() reference is invalid CSS
                          and the gradient never painted. */}
                      <div style={{ height: '2px', background: 'linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 50%, transparent), color-mix(in srgb, var(--color-accent) 19%, transparent), transparent)', flexShrink: 0 }} />

                      <div style={{ position: 'absolute', top: '14px', right: '16px', fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '72px', color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                        {p.num}
                      </div>

                      <div style={{ padding: 'clamp(18px, 4vw, 26px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#5C626E' }}>{p.num}</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                            {isFeatured ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '6px', background: 'rgba(46,143,255,0.14)', border: '1px solid rgba(46,143,255,0.32)', fontSize: '10px', color: '#7DB8FF', fontFamily: "'JetBrains Mono', monospace" }}>
                                <Star size={10} fill="currentColor" /> Featured
                              </span>
                            ) : null}
                            <span style={{ padding: '3px 10px', borderRadius: '6px', background: ACCENT.bg, border: `1px solid ${ACCENT.border}`, fontSize: '10px', color: ACCENT.text, fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                            {p.status ? <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(46,143,255,0.1)', border: '1px solid rgba(46,143,255,0.22)', fontSize: '10px', color: '#2E8FFF', fontFamily: "'JetBrains Mono', monospace" }}>{p.status}</span> : null}
                          </div>
                        </div>

                        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', color: '#ECEEF2', lineHeight: 1.3, marginBottom: '10px' }}>{p.title}</h3>
                        <p style={{ fontSize: '13.5px', color: '#9BA1AD', lineHeight: 1.78, marginBottom: '18px', flex: 1 }}>{p.description}</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                          {p.tags.map((t) => (
                            <span key={t.label} style={{ padding: '3px 8px', borderRadius: '5px', background: 'rgba(46,143,255,0.07)', border: '1px solid rgba(46,143,255,0.15)', fontSize: '10px', color: '#2E8FFF', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                          ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', gap: '12px', flexWrap: 'wrap' }}>
                          {p.liveUrl ? (
                            <motion.a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={reduceAnimations ? undefined : { scale: 1.04 }}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', borderRadius: '8px', border: '1px solid rgba(22,163,74,0.25)', background: 'rgba(22,163,74,0.1)', padding: '7px 14px', fontSize: '12px', fontWeight: 500, color: '#16A34A', textDecoration: 'none' }}
                            >
                              Live Demo <ExternalLink size={11} />
                            </motion.a>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '12px', color: '#9BA1AD', fontWeight: 500 }}>
                              {p.status || 'In Progress'}
                            </span>
                          )}
                          {p.githubUrl ? (
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#5C626E', textDecoration: 'none' }}>
                              <Github size={13} /> Source
                            </a>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#5C626E' }}>
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
            <motion.div
              whileHover={reduceAnimations ? undefined : { borderColor: 'rgba(46,143,255,0.4)', boxShadow: '0 0 0 1px rgba(46,143,255,0.09), 0 16px 44px rgba(46,143,255,0.1)', filter: 'saturate(1.1)' }}
              transition={reduceAnimations ? undefined : { duration: 0.15, ease: 'easeOut' }}
              style={{ marginTop: '48px', background: 'linear-gradient(145deg, #1A1D23, #111317)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', transition: 'border-color 0.15s ease-out, box-shadow 0.15s ease-out, filter 0.15s ease-out' }}
            >
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #1E6FD9, #2E8FFF)' }} />
              <div style={{ padding: 'clamp(18px, 4vw, 28px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#5C626E' }}>{portfolioProjectNum}</span>
                    <span style={{ padding: '2px 9px', borderRadius: '5px', background: 'rgba(46,143,255,0.09)', border: '1px solid rgba(46,143,255,0.22)', fontSize: '10px', color: '#1E6FD9', fontFamily: "'JetBrains Mono', monospace" }}>Portfolio</span>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '17px', color: '#ECEEF2', marginBottom: '8px' }}>This Portfolio Website</h3>
                  <p style={{ fontSize: '13px', color: '#9BA1AD', marginBottom: '14px', lineHeight: 1.75 }}>Built from scratch with React 19, Vite 7, Tailwind CSS v4. Motion animations, dark design system, fully responsive.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {portfolioTechs.map((t) => (
                      <span key={t} style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(46,143,255,0.08)', border: '1px solid rgba(46,143,255,0.18)', fontSize: '10px', color: '#1E6FD9', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <motion.a
                  href="https://github.com/armancore/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceAnimations ? undefined : { scale: 1.04, y: -2 }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', padding: '10px 20px', fontSize: '13px', color: '#ECEEF2', textDecoration: 'none', flexShrink: 0 }}
                >
                  <Github size={14} /> View on GitHub
                </motion.a>
              </div>
            </motion.div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
};

export default Projects;
