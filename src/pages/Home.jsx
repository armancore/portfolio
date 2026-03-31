import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Facebook, Instagram, ExternalLink, Layers, Cpu, Globe, Code2, Terminal, Download } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import { PERSONAL_INFO, PHOTO_MODE, PROJECTS } from '../constants';

let profileImg = null;
try { profileImg = new URL('../assets/profile.jpg', import.meta.url).href; } catch {}

const statsData = [
  { value: `${PROJECTS.length + 1}+`, label: 'Projects' },
  { value: '4+', label: 'Languages' },
  { value: '↗', label: 'Available' },
];
const bentoSkills = [
  { icon: Layers, title: 'Frontend', desc: 'React, Tailwind, Vite — pixel-perfect UIs', color: '#4F8EF7', glow: 'rgba(79,142,247,0.15)' },
  { icon: Cpu, title: 'Learning Backend', desc: 'Node.js, Express, Prisma, PostgreSQL', color: '#7C5CFC', glow: 'rgba(124,92,252,0.15)' },
  { icon: Globe, title: 'Networking', desc: 'TCP/IP, DNS, Linux, Cybersecurity', color: '#00D9B5', glow: 'rgba(0,217,181,0.15)' },
  { icon: Code2, title: 'Languages', desc: 'C++, Java, Python, JavaScript', color: '#F97316', glow: 'rgba(249,115,22,0.15)' },
];

const Home = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const featured = PROJECTS.filter(p => p.featured).slice(0, 2);

  return (
    <div style={{ background: '#080B14', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '64px', overflow: 'hidden' }}>
        {/* Mouse-follow glow */}
        <div className="pointer-events-none" style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(79,142,247,0.05) 0%, transparent 60%)`,
          transition: 'background 0.1s',
        }} />
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
                  <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px', padding: '12px 22px', background: '#4F8EF7', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', minWidth: '160px' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#3a7de0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(79,142,247,0.38)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#4F8EF7'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    View Projects <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px', padding: '12px 22px', background: 'transparent', color: '#E8E8F2', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', minWidth: '160px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.5)'; e.currentTarget.style.color = '#4F8EF7'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#E8E8F2'; }}>
                    Contact Me
                  </Link>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={360}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    { href: 'https://github.com/Arman-techiee', icon: Github, label: 'GitHub' },
                    { href: 'https://www.facebook.com/techiee.arman', icon: Facebook, label: 'Facebook' },
                    { href: 'https://www.instagram.com/techiee.arman', icon: Instagram, label: 'Instagram' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B8BAE', transition: 'all 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#E8E8F2'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8B8BAE'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                    ><Icon size={15} /></a>
                  ))}
                  <span style={{ color: '#3A3A5C', fontSize: '13px' }}>Kathmandu, Nepal</span>
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
                  style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '26px', position: 'relative', overflow: 'hidden', transition: 'all 0.25s', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}50`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${s.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
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
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#8B8BAE', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '9px 18px', borderRadius: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4F8EF7'; e.currentTarget.style.borderColor = 'rgba(79,142,247,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8B8BAE'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
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
              <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#4F8EF7', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                All projects <ArrowRight size={13} />
              </Link>
            </div>
          </RevealWrapper>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '18px' }}>
            {featured.map((p, i) => (
              <RevealWrapper key={p.id} delay={i * 110}>
                <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
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
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#4A4A6A', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#8B8BAE'} onMouseLeave={e => e.currentTarget.style.color = '#4A4A6A'}>
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
              <a href="mailto:arman.techiee@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '13px 28px', background: '#4F8EF7', color: '#fff', borderRadius: '11px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3a7de0'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,142,247,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#4F8EF7'; e.currentTarget.style.boxShadow = 'none'; }}>
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
