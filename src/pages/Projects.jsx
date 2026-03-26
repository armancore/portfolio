import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import { PROJECTS } from '../constants';

const categories = ['All', 'API', 'Tool', 'Frontend'];

const categoryAccent = {
  API: { bg: 'rgba(0,217,181,0.09)', border: 'rgba(0,217,181,0.2)', text: '#00D9B5' },
  Tool: { bg: 'rgba(249,115,22,0.09)', border: 'rgba(249,115,22,0.2)', text: '#F97316' },
  Frontend: { bg: 'rgba(79,142,247,0.09)', border: 'rgba(79,142,247,0.2)', text: '#4F8EF7' },
};

const portfolioTechs = ['React 19', 'Vite 7', 'Tailwind CSS v4', 'React Router v7', 'Lucide React'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);
  const portfolioProjectNum = String(PROJECTS.length + 1).padStart(2, '0');

  return (
    <div style={{ background: '#080B14', minHeight: '100vh' }}>

      {/* PAGE HEADER */}
      <section style={{ paddingTop: '110px', paddingBottom: '52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(124,92,252,0.06) 0%, transparent 65%)' }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>── My work</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 72px)', color: '#E8E8F2', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '16px' }}>Projects</h1>
            <p style={{ fontSize: 'clamp(14px, 3.6vw, 16px)', color: '#8B8BAE', maxWidth: '520px', lineHeight: 1.7 }}>
              Real applications I've designed, built, and deployed. Every project represents a problem I found interesting and a skill I wanted to sharpen.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section style={{ padding: '20px 0 80px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter bar */}
          <RevealWrapper>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingTop: '32px' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  style={{
                    padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
                    background: active === cat ? '#4F8EF7' : 'transparent',
                    color: active === cat ? '#fff' : '#8B8BAE',
                    border: active === cat ? '1px solid #4F8EF7' : '1px solid rgba(255,255,255,0.09)',
                    boxShadow: active === cat ? '0 4px 14px rgba(79,142,247,0.3)' : 'none',
                  }}
                  onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.color = '#E8E8F2'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; } }}
                  onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.color = '#8B8BAE'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; } }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4A6A', marginBottom: '32px' }}>
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </p>
          </RevealWrapper>

          {/* Project Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '18px' }}>
            {filtered.map((p, i) => {
              const ca = categoryAccent[p.category] || categoryAccent.API;
              return (
                <RevealWrapper key={p.id} delay={i * 90}>
                  <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.25s', position: 'relative' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.28)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

                    {/* Top gradient accent */}
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, #4F8EF7, #7C5CFC)', flexShrink: 0 }} />

                    {/* Number bg (decorative) */}
                    <div style={{ position: 'absolute', top: '18px', right: '20px', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '64px', color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                      {p.num}
                    </div>

                    <div style={{ padding: 'clamp(18px, 4vw, 26px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Category + num row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A6A' }}>{p.num}</span>
                        <span style={{ padding: '3px 10px', borderRadius: '6px', background: ca.bg, border: `1px solid ${ca.border}`, fontSize: '10px', color: ca.text, fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                      </div>

                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#E8E8F2', lineHeight: 1.3, marginBottom: '10px' }}>{p.title}</h3>
                      <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.75, marginBottom: '18px', flex: 1 }}>{p.description}</p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                        {p.tags.map(t => (
                          <span key={t.label} style={{ padding: '3px 8px', borderRadius: '5px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.15)', fontSize: '10px', color: '#4F8EF7', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', gap: '12px', flexWrap: 'wrap' }}>
                        {p.liveUrl ? (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '8px', fontSize: '12px', color: '#4F8EF7', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', minWidth: 'fit-content' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.18)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.1)'; }}>
                            Live Demo <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '12px', color: '#6B6B8E', fontWeight: 500, minWidth: 'fit-content' }}>
                            Live Demo Soon
                          </span>
                        )}
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#4A4A6A', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#8B8BAE'}
                            onMouseLeave={e => e.currentTarget.style.color = '#4A4A6A'}>
                            <Github size={13} /> Source
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B6B8E' }}>
                            <Github size={13} /> Source Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>

          {/* This portfolio card */}
          <RevealWrapper delay={200}>
            <div style={{ marginTop: '48px', background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden' }}>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #7C5CFC, #4F8EF7)' }} />
              <div style={{ padding: 'clamp(18px, 4vw, 28px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A6A' }}>{portfolioProjectNum}</span>
                    <span style={{ padding: '2px 9px', borderRadius: '5px', background: 'rgba(124,92,252,0.09)', border: '1px solid rgba(124,92,252,0.2)', fontSize: '10px', color: '#7C5CFC', fontFamily: "'JetBrains Mono', monospace" }}>Portfolio</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '17px', color: '#E8E8F2', marginBottom: '8px' }}>This Portfolio Website</h3>
                  <p style={{ fontSize: '13px', color: '#8B8BAE', marginBottom: '14px', lineHeight: 1.7 }}>Built from scratch with React 19, Vite 7, and Tailwind CSS v4. Scroll-reveal animations, dark design system, fully responsive.</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {portfolioTechs.map(t => (
                      <span key={t} style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.18)', fontSize: '10px', color: '#7C5CFC', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <a href="https://github.com/Arman-techiee/portfolio" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 18px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', fontSize: '13px', color: '#E8E8F2', textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0, width: '100%', maxWidth: '220px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.color = '#4F8EF7'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#E8E8F2'; }}>
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
