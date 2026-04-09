import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Facebook, Instagram, ExternalLink, Layers, Cpu, Globe, Code2 } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import PageMeta from '../components/seo/PageMeta';
import { PERSONAL_INFO, PROJECTS, THEME_COLORS } from '../constants';

let profileImg = null;
try { profileImg = new URL('../assets/profile.jpg', import.meta.url).href; } catch {}

const statsData = [
  { value: `${PROJECTS.length + 1}+`, label: 'Projects' },
  { value: '4+', label: 'Languages' },
  { value: '↗', label: 'Available' },
];
const bentoSkills = [
  { icon: Layers, title: 'Frontend', desc: 'React, Tailwind, Vite — pixel-perfect UIs', color: THEME_COLORS.accent, glow: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' },
  { icon: Cpu, title: 'Learning Backend', desc: 'Node.js, Express, Prisma, PostgreSQL', color: THEME_COLORS.accent3, glow: 'color-mix(in srgb, var(--color-accent3) 15%, transparent)' },
  { icon: Globe, title: 'Networking', desc: 'TCP/IP, DNS, Linux, Cybersecurity', color: THEME_COLORS.accent2, glow: 'color-mix(in srgb, var(--color-accent2) 15%, transparent)' },
  { icon: Code2, title: 'Languages', desc: 'C++, Java, Python, JavaScript', color: '#F97316', glow: 'rgba(249,115,22,0.15)' },
];

const Home = () => {
  const featured = PROJECTS.filter(p => p.featured).slice(0, 2);

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta
        title="Arman Khan"
        description="Frontend-focused IT student from Nepal building polished React interfaces while growing strong backend foundations with Node.js, Express, Prisma, and PostgreSQL."
      />

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '64px', overflow: 'hidden' }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to bottom, #080B14, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to top, #080B14, transparent)' }} />

        {/* Ambient light orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '40px', paddingBottom: '72px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left col — text */}
            <div className="order-1 lg:order-1 lg:col-start-1 lg:col-span-1">
              <RevealWrapper delay={0}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '22px', padding: '5px 14px 5px 10px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '100px', maxWidth: '100%' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4F8EF7', boxShadow: '0 0 0 3px rgba(79,142,247,0.16)', flexShrink: 0 }} />
                  <span style={{ color: '#A9C6FF', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>building polished frontend projects and learning backend systems</span>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={70}>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: '2px' }}>
                  <span style={{ fontSize: 'clamp(40px, 12vw, 84px)', color: '#E8E8F2', display: 'block' }}>Arman</span>
                  <span style={{ fontSize: 'clamp(40px, 12vw, 84px)', display: 'block', background: 'linear-gradient(125deg, #4F8EF7 20%, #7C5CFC 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Khan.</span>
                </h1>
              </RevealWrapper>

              <RevealWrapper delay={150}>
                <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: '#8B8BAE', marginTop: '14px', marginBottom: '16px', fontWeight: 300 }}>IT Student &amp; Frontend Developer</p>
              </RevealWrapper>

              <RevealWrapper delay={210}>
                <p style={{ fontSize: '14px', color: '#6B6B8E', lineHeight: 1.8, maxWidth: '480px', marginBottom: '28px' }}>{PERSONAL_INFO.bio[0]}</p>
              </RevealWrapper>

              <RevealWrapper delay={290}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
                  <Link to="/projects" className="inline-flex items-center justify-center gap-[7px] rounded-[10px] bg-[#4F8EF7] px-[22px] py-3 text-sm font-medium text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3a7de0] hover:shadow-[0_10px_28px_rgba(79,142,247,0.38)]"
                    style={{ minWidth: '160px' }}>
                    View Projects <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-[7px] rounded-[10px] border border-white/10 bg-transparent px-[22px] py-3 text-sm font-medium text-[#E8E8F2] no-underline transition-all duration-200 hover:border-[rgba(79,142,247,0.5)] hover:text-[#4F8EF7]"
                    style={{ minWidth: '160px' }}>
                    Contact Me
                  </Link>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={360}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    { href: 'https://github.com/Arman-techiee', icon: Github, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/arman-khan-943b29400/', icon: Linkedin, label: 'LinkedIn' },
                    { href: 'https://www.facebook.com/techiee.arman', icon: Facebook, label: 'Facebook' },
                    { href: 'https://www.instagram.com/techiee.arman', icon: Instagram, label: 'Instagram' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/[0.07] bg-white/[0.04] text-[#8B8BAE] no-underline transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-[#E8E8F2]"
                    ><Icon size={15} /></a>
                  ))}
                  <span style={{ color: '#3A3A5C', fontSize: '13px' }}>From Damak, Jhapa · Based in Kathmandu</span>
                </div>
              </RevealWrapper>
            </div>

            {/* Right col — FEATURED PROFILE IMAGE */}
            <div className="order-2 lg:order-2 lg:col-start-2 lg:col-span-1 lg:justify-self-end">
              <RevealWrapper delay={180}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  {/* Main image card */}
                  <div style={{ position: 'relative', zIndex: 1, borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 28px 60px rgba(0,0,0,0.32)', width: '100%', maxWidth: '380px', background: 'transparent', margin: '0 auto' }}>

                    {/* Top shine */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.8), rgba(124,92,252,0.8), transparent)', zIndex: 2 }} />

                    <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', background: 'transparent' }}>
                      {profileImg ? (
                        <img
                          src={profileImg}
                          alt="Arman Khan"
                          fetchPriority="high"
                          width={380}
                          height={540}
                          style={{ width: '100%', height: 'min(540px, 82vw)', minHeight: '360px', objectFit: 'cover', objectPosition: 'center 12%', display: 'block' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: 'min(540px, 82vw)', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #141b2c 0%, #0d1117 52%, #161b27 100%)' }}>
                          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '80px', fontWeight: 800, background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AK</span>
                        </div>
                      )}
                    </div>

                    {/* Gradient overlay at bottom */}
                    <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.6) 50%, transparent 100%)', zIndex: 2 }} />

                    {/* Name + title overlay */}
                    <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(18px, 4vw, 28px)', zIndex: 3 }}>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 4vw, 20px)', color: '#E8E8F2', marginBottom: '4px' }}>Arman Khan</p>
                      <p style={{ fontSize: '12px', color: '#8B8BAE', marginBottom: '12px' }}>IT Student · Full-Stack Developer</p>
                      {/* Stats row */}
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        {statsData.map(s => (
                          <div key={s.label} style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#E8E8F2' }}>{s.value}</p>
                            <p style={{ fontSize: '9px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="block md:hidden" style={{ marginTop: '18px', textAlign: 'center', padding: '0 10px' }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '20px', color: '#E8E8F2', marginBottom: '4px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#8B8BAE', marginBottom: '14px' }}>IT Student · Full-Stack Developer</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      {statsData.map(s => (
                        <div key={`mobile-${s.label}`} style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#E8E8F2' }}>{s.value}</p>
                          <p style={{ fontSize: '9px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </RevealWrapper>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS BENTO */}
      <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>── What I do</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', color: '#E8E8F2', marginBottom: '48px' }}>Skills &amp; expertise</h2>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '14px' }}>
            {bentoSkills.map((s, i) => (
              <RevealWrapper key={s.title} delay={i * 80}>
                <div
                  className="relative h-full cursor-default overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1117] p-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--skill-hover-border)] hover:[box-shadow:var(--skill-hover-shadow)]"
                  style={{ '--skill-hover-border': `${s.color}50`, '--skill-hover-shadow': `0 20px 40px ${s.glow}` }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `${s.color}14`, border: `1px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <s.icon size={19} style={{ color: s.color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: '#E8E8F2', marginBottom: '7px' }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
          <RevealWrapper delay={300}>
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <Link to="/about" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-[18px] py-[9px] text-[13px] text-[#8B8BAE] no-underline transition-all duration-200 hover:border-[rgba(79,142,247,0.3)] hover:text-[#4F8EF7]">
                Full skills breakdown <ArrowRight size={13} />
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>── Featured work</p>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', color: '#E8E8F2' }}>Things I've built</h2>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-[5px] text-[13px] text-[#4F8EF7] no-underline transition-opacity duration-200 hover:opacity-70">
                All projects <ArrowRight size={13} />
              </Link>
            </div>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '18px' }}>
            {featured.map((p, i) => (
              <RevealWrapper key={p.id} delay={i * 110}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1117] p-7 transition-all duration-200 hover:-translate-y-[3px] hover:border-[rgba(79,142,247,0.3)]">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.5), rgba(124,92,252,0.5), transparent)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4A6A' }}>{p.num}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(0,217,181,0.09)', border: '1px solid rgba(0,217,181,0.2)', fontSize: '10px', color: '#00D9B5', fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '17px', color: '#E8E8F2', marginBottom: '10px', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.7, marginBottom: '18px', flex: 1 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                    {p.tags.map(t => (
                      <span key={t.label} style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.15)', fontSize: '10px', color: '#4F8EF7', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#4F8EF7', fontWeight: 500, textDecoration: 'none' }}>Live Demo <ExternalLink size={11} /></a>
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-[#4A4A6A] no-underline transition-colors duration-200 hover:text-[#8B8BAE]">
                      <Github size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <div style={{ position: 'relative', background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: 'clamp(48px, 6vw, 80px)', textAlign: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.5), transparent)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(79,142,247,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>── Let's work together</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(30px, 5vw, 52px)', color: '#E8E8F2', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '14px' }}>Have a project in mind?</h2>
              <p style={{ fontSize: '15px', color: '#8B8BAE', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>Open to internship and junior developer roles. Let's build something great together.</p>
              <a href="mailto:arman.techiee@gmail.com" className="inline-flex items-center gap-[7px] rounded-[11px] bg-[#4F8EF7] px-7 py-[13px] text-sm font-medium text-white no-underline transition-all duration-200 hover:bg-[#3a7de0] hover:shadow-[0_12px_32px_rgba(79,142,247,0.38)]">
                arman.techiee@gmail.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', marginTop: '18px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00D9B5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '12px', color: '#4A4A6A' }}>Responds within 24 hours</span>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <style>{`@keyframes scrollDot { 0%{transform:translateY(0);opacity:0.7}80%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:0} }`}</style>
    </div>
  );
};

export default Home;
