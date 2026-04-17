import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import PageMeta from '../components/seo/PageMeta';
import { CATEGORY_ACCENTS, PROJECTS } from '../constants';
import { fadeUp, staggerContainer, blurIn } from '../lib/motion';

const categories = ['All', 'API', 'Tool', 'Frontend', 'Social'];
const portfolioTechs = ['React 19', 'Vite 7', 'Tailwind CSS v4', 'React Router v7', 'Motion for React'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const portfolioProjectNum = String(PROJECTS.length + 1).padStart(2, '0');

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta
        title="Projects | Arman Khan"
        description="Explore deployed React projects by Arman Khan, including API apps, frontend builds, tools, and full-stack experiments focused on practical problem solving."
      />

      <section style={{ paddingTop: '110px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(124,92,252,0.08) 0%, transparent 65%)', pointerEvents: 'none' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer(0.1, 0.05)} initial="hidden" animate="show">
            <motion.p variants={fadeUp} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              My work
            </motion.p>
            <motion.h1 variants={blurIn} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 78px)', color: '#E8E8F2', letterSpacing: '-0.035em', lineHeight: 1.03, marginBottom: '16px' }}>
              Projects
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(14px, 3.6vw, 16.5px)', color: '#8B8BAE', maxWidth: '520px', lineHeight: 1.75 }}>
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
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    border: active === cat ? '1px solid rgba(79,142,247,0.5)' : '1px solid rgba(255,255,255,0.09)',
                    background: active === cat ? 'linear-gradient(135deg, rgba(79,142,247,0.25), rgba(124,92,252,0.15))' : 'rgba(255,255,255,0.02)',
                    color: active === cat ? '#E8E8F2' : '#8B8BAE',
                    boxShadow: active === cat ? '0 4px 14px rgba(79,142,247,0.22)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4A6A', marginBottom: '36px' }}>
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </p>
          </RevealWrapper>

          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '18px' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const ca = CATEGORY_ACCENTS[p.category] || CATEGORY_ACCENTS.API;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                    whileHover={{ y: -6, borderColor: 'rgba(79,142,247,0.3)', boxShadow: '0 24px 52px rgba(0,0,0,0.35)' }}
                    style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #0f1520, #0D1117)', transition: 'border-color 0.25s' }}
                  >
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${ca.text}80, ${ca.text}30, transparent)`, flexShrink: 0 }} />

                    <div style={{ position: 'absolute', top: '14px', right: '16px', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '72px', color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                      {p.num}
                    </div>

                    <div style={{ padding: 'clamp(18px, 4vw, 26px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A6A' }}>{p.num}</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                          <span style={{ padding: '3px 10px', borderRadius: '6px', background: ca.bg, border: `1px solid ${ca.border}`, fontSize: '10px', color: ca.text, fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                          {p.status ? <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.22)', fontSize: '10px', color: '#F97316', fontFamily: "'JetBrains Mono', monospace" }}>{p.status}</span> : null}
                        </div>
                      </div>

                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#E8E8F2', lineHeight: 1.3, marginBottom: '10px' }}>{p.title}</h3>
                      <p style={{ fontSize: '13.5px', color: '#8B8BAE', lineHeight: 1.78, marginBottom: '18px', flex: 1 }}>{p.description}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                        {p.tags.map((t) => (
                          <span key={t.label} style={{ padding: '3px 8px', borderRadius: '5px', background: 'rgba(79,142,247,0.07)', border: '1px solid rgba(79,142,247,0.15)', fontSize: '10px', color: '#4F8EF7', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', gap: '12px', flexWrap: 'wrap' }}>
                        {p.liveUrl ? (
                          <motion.a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', borderRadius: '8px', border: '1px solid rgba(79,142,247,0.25)', background: 'rgba(79,142,247,0.1)', padding: '7px 14px', fontSize: '12px', fontWeight: 500, color: '#4F8EF7', textDecoration: 'none' }}
                          >
                            Live Demo <ExternalLink size={11} />
                          </motion.a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '12px', color: '#6B6B8E', fontWeight: 500 }}>
                            {p.status || 'In Progress'}
                          </span>
                        )}
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#4A4A6A', textDecoration: 'none' }}>
                            <Github size={13} /> Source
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#3A3A5C' }}>
                            <Github size={13} /> Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <RevealWrapper delay={200}>
            <motion.div
              whileHover={{ borderColor: 'rgba(124,92,252,0.3)', boxShadow: '0 16px 44px rgba(124,92,252,0.1)' }}
              style={{ marginTop: '48px', background: 'linear-gradient(145deg, #0f1520, #0D1117)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', transition: 'border-color 0.25s, box-shadow 0.25s' }}
            >
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #7C5CFC, #4F8EF7)' }} />
              <div style={{ padding: 'clamp(18px, 4vw, 28px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A6A' }}>{portfolioProjectNum}</span>
                    <span style={{ padding: '2px 9px', borderRadius: '5px', background: 'rgba(124,92,252,0.09)', border: '1px solid rgba(124,92,252,0.22)', fontSize: '10px', color: '#7C5CFC', fontFamily: "'JetBrains Mono', monospace" }}>Portfolio</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '17px', color: '#E8E8F2', marginBottom: '8px' }}>This Portfolio Website</h3>
                  <p style={{ fontSize: '13px', color: '#8B8BAE', marginBottom: '14px', lineHeight: 1.75 }}>Built from scratch with React 19, Vite 7, Tailwind CSS v4. Motion animations, dark design system, fully responsive.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {portfolioTechs.map((t) => (
                      <span key={t} style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.18)', fontSize: '10px', color: '#7C5CFC', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <motion.a
                  href="https://github.com/armanroot/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', padding: '10px 20px', fontSize: '13px', color: '#E8E8F2', textDecoration: 'none', flexShrink: 0 }}
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
