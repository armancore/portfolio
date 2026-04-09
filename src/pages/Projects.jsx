import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import PageMeta from '../components/seo/PageMeta';
import { CATEGORY_ACCENTS, PROJECTS, THEME_COLORS } from '../constants';

const categories = ['All', 'API', 'Tool', 'Frontend', 'Social'];

const portfolioTechs = ['React 19', 'Vite 7', 'Tailwind CSS v4', 'React Router v7', 'Lucide React'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);
  const portfolioProjectNum = String(PROJECTS.length + 1).padStart(2, '0');

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta
        title="Projects | Arman Khan"
        description="Explore deployed React projects by Arman Khan, including API apps, frontend builds, tools, and full-stack experiments focused on practical problem solving."
      />

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
                  type="button"
                  aria-pressed={active === cat}
                  className={`rounded-[9px] px-[18px] py-2 text-[13px] font-medium transition-all duration-200 ${
                    active === cat
                      ? 'border bg-[var(--color-accent)] text-white shadow-[0_4px_14px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]'
                      : 'border border-white/[0.09] bg-transparent text-[#8B8BAE] hover:border-white/[0.18] hover:text-[#E8E8F2]'
                  }`}
                  style={{ cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", borderColor: active === cat ? THEME_COLORS.accent : undefined }}
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
              const ca = CATEGORY_ACCENTS[p.category] || CATEGORY_ACCENTS.API;
              return (
                <RevealWrapper key={p.id} delay={i * 90}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0D1117] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(79,142,247,0.28)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.3)]">

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
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-fit items-center gap-[5px] rounded-lg border border-[rgba(79,142,247,0.2)] bg-[rgba(79,142,247,0.1)] px-[14px] py-[7px] text-xs font-medium text-[#4F8EF7] no-underline transition-all duration-200 hover:bg-[rgba(79,142,247,0.18)]">
                            Live Demo <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '12px', color: '#6B6B8E', fontWeight: 500, minWidth: 'fit-content' }}>
                            Live Demo Soon
                          </span>
                        )}
                        {p.githubUrl ? (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#4A4A6A] no-underline transition-colors duration-200 hover:text-[#8B8BAE]">
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
                <a href="https://github.com/Arman-techiee/portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex w-full max-w-[220px] shrink-0 items-center justify-center gap-1.5 rounded-[9px] border border-white/10 bg-transparent px-[18px] py-[10px] text-[13px] text-[#E8E8F2] no-underline transition-all duration-200 hover:border-[rgba(79,142,247,0.4)] hover:text-[#4F8EF7]">
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
