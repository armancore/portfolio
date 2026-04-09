import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Calendar, BookOpen, ArrowRight, Briefcase, GraduationCap, Star, Clock } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import { PERSONAL_INFO, PHOTO_MODE, PROJECTS, SKILLS, TIMELINE } from '../constants';
import profileImg from '../assets/profile.jpg';

const accentMap = {
  blue:   { bg: 'rgba(79,142,247,0.1)',   border: 'rgba(79,142,247,0.22)',   text: '#4F8EF7',  glow: 'rgba(79,142,247,0.12)' },
  purple: { bg: 'rgba(124,92,252,0.1)',   border: 'rgba(124,92,252,0.22)',   text: '#7C5CFC',  glow: 'rgba(124,92,252,0.12)' },
  teal:   { bg: 'rgba(0,217,181,0.1)',    border: 'rgba(0,217,181,0.22)',    text: '#00D9B5',  glow: 'rgba(0,217,181,0.1)'  },
  orange: { bg: 'rgba(249,115,22,0.1)',   border: 'rgba(249,115,22,0.22)',   text: '#F97316',  glow: 'rgba(249,115,22,0.1)' },
  pink:   { bg: 'rgba(236,72,153,0.1)',   border: 'rgba(236,72,153,0.22)',   text: '#EC4899',  glow: 'rgba(236,72,153,0.1)' },
};

const details = [
  { icon: BookOpen,   label: 'Status',      value: PERSONAL_INFO.status,       accent: true  },
  { icon: GraduationCap, label: 'Degree',   value: PERSONAL_INFO.degree                      },
  { icon: Briefcase,  label: 'Institution', value: PERSONAL_INFO.institution                  },
  { icon: MapPin,     label: 'Location',    value: PERSONAL_INFO.location                     },
  { icon: MapPin,     label: 'Hometown',    value: PERSONAL_INFO.hometown                     },
  { icon: Mail,       label: 'Email',       value: PERSONAL_INFO.email,        isEmail: true  },
  { icon: Clock,      label: 'Response',    value: PERSONAL_INFO.responseTime                 },
];

const quickFacts = [
  { label: `${PROJECTS.length} Projects Deployed`, color: '#4F8EF7' },
  { label: 'Prisma + PostgreSQL', color: '#7C5CFC' },
  { label: 'Open to Hire',        color: '#00D9B5' },
  { label: 'From Damak, Jhapa',   color: '#F97316' },
];

const About = () => (
  <div style={{ background: 'transparent', minHeight: '100vh' }}>

    {/* ─── PAGE HEADER ─── */}
    <section style={{ paddingTop: '110px', paddingBottom: '64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(79,142,247,0.07) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse 40% 60% at 80% 50%, rgba(124,92,252,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Header text */}
          <div style={{ gridColumn: 'span 12' }} className="lg:!col-span-7">
            <RevealWrapper>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>── Who I am</p>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 7.6vw, 78px)', color: '#E8E8F2', letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: '20px' }}>About Me</h1>
              <p style={{ fontSize: 'clamp(15px, 3.8vw, 17px)', color: '#9AA8C7', maxWidth: '520px', lineHeight: 1.85, marginBottom: '28px' }}>
                IT student, frontend-focused developer, and lifelong learner from Damak, Jhapa, now building meaningful software in Kathmandu, Nepal.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {quickFacts.map(({ label, color }) => (
                  <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: `${color}10`, border: `1px solid ${color}25`, borderRadius: '8px', fontSize: '11px', color, fontFamily: "'JetBrains Mono', monospace", maxWidth: '100%' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    {label}
                  </span>
                ))}
              </div>
            </RevealWrapper>
          </div>

          {/* Header — mini profile card */}
          <div style={{ gridColumn: 'span 12' }} className="hidden lg:!col-span-5 lg:block">
            <RevealWrapper delay={120}>
              <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.6), rgba(124,92,252,0.6), transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {PHOTO_MODE === 'photo' && profileImg ? (
                    <img src={profileImg} alt="Arman Khan" style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 800, color: '#fff' }}>AK</span>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#E8E8F2', marginBottom: '3px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#8B8BAE' }}>IT Student · Full-Stack Developer</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '6px', padding: '3px 9px', background: 'rgba(0,217,181,0.08)', border: '1px solid rgba(0,217,181,0.2)', borderRadius: '20px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00D9B5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                      <span style={{ color: '#00D9B5', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>

    {/* ─── BIO + PHOTO + DETAILS ─── */}
    <section style={{ padding: '0 0 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '56px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left — Bio */}
          <div style={{ gridColumn: 'span 12' }} className="lg:!col-span-7">
            <RevealWrapper>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>── My story</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 3vw, 30px)', color: '#E8E8F2', marginBottom: '28px' }}>Background &amp; Motivation</h2>
            </RevealWrapper>

            {PERSONAL_INFO.bio.map((para, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <p style={{ fontSize: 'clamp(14px, 3.4vw, 15.5px)', color: i === 0 ? '#D7E0F0' : '#9AA8C7', lineHeight: 1.9, marginBottom: '18px' }}>
                  {para.split(/\b(React|Node\.js|Express|Prisma|PostgreSQL|JavaScript|C\+\+|Java|Python|full-stack|internship|junior developer)\b/gi).map((part, j) => {
                    const kw = ['react','node.js','express','prisma','postgresql','javascript','c++','java','python','full-stack','internship','junior developer'];
                    return kw.includes(part.toLowerCase())
                      ? <strong key={j} style={{ color: '#E8E8F2', fontWeight: 500 }}>{part}</strong>
                      : part;
                  })}
                </p>
              </RevealWrapper>
            ))}

            {/* Values row */}
            <RevealWrapper delay={280}>
              <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '12px' }}>
                {[
                  { icon: '🎯', title: 'Goal-Oriented', desc: 'I ship products, not just code.' },
                  { icon: '📚', title: 'Always Learning', desc: 'CS fundamentals meet modern stacks.' },
                  { icon: '🤝', title: 'Team Player', desc: 'Communication is a core skill.' },
                ].map(v => (
                  <div key={v.title} style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}>
                    <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{v.icon}</span>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '13px', color: '#E8E8F2', marginBottom: '4px' }}>{v.title}</p>
                    <p style={{ fontSize: '12px', color: '#6B6B8E', lineHeight: 1.5 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>

          {/* Right — Photo + Details */}
          <div style={{ gridColumn: 'span 12' }} className="lg:!col-span-5">
            <RevealWrapper delay={100}>

              {/* Photo — full-height portrait */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 72px rgba(0,0,0,0.45), 0 0 0 1px rgba(79,142,247,0.1)', maxWidth: '420px', margin: '0 auto' }}>
                  {/* Top gradient line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.7), rgba(124,92,252,0.7), transparent)', zIndex: 2 }} />

                  {PHOTO_MODE === 'photo' && profileImg ? (
                    <img
                      src={profileImg}
                      alt="Arman Khan"
                      style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(160deg, #1a2236 0%, #0d1117 50%, #161b27 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '80px', fontWeight: 800, background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AK</span>
                    </div>
                  )}

                  {/* Bottom gradient overlay */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(8,11,20,0.9) 0%, transparent 100%)', zIndex: 1 }} />

                  {/* Name overlay */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2 }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#E8E8F2', marginBottom: '3px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#8B8BAE' }}>IT Student · Full-Stack Developer · Kathmandu</p>
                  </div>

                  {/* Available badge */}
                  <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2, display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(8,11,20,0.85)', border: '1px solid rgba(0,217,181,0.3)', borderRadius: '20px', padding: '5px 11px', backdropFilter: 'blur(10px)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D9B5', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                    <span style={{ color: '#00D9B5', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                  </div>
                </div>
              </div>

              {/* Detail table */}
              <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A6A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Personal Info</p>
                </div>
                {details.map(({ icon: Icon, label, value, accent, isEmail }, i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 18px', borderBottom: i < details.length - 1 ? '1px solid rgba(148,163,184,0.07)' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={13} style={{ color: '#4F8EF7' }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#4A4A6A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>{label}</p>
                      {isEmail ? (
                        <a href={`mailto:${value}`} style={{ fontSize: '13px', color: '#4F8EF7', textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
                      ) : (
                        <p style={{ fontSize: '13px', color: accent ? '#00D9B5' : '#D7E0F0', wordBreak: 'break-word', fontWeight: accent ? 500 : 400 }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>

    {/* ─── SKILLS GRID ─── */}
    <section style={{ padding: '72px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>── Technical skills</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', color: '#E8E8F2' }}>Technical Expertise</h2>
            <p style={{ fontSize: '13px', color: '#6B6B8E', maxWidth: '280px', textAlign: 'left', lineHeight: 1.6 }} className="lg:text-right">Technologies I've worked with professionally and in personal projects.</p>
          </div>
        </RevealWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '14px' }}>
          {SKILLS.map((skill, i) => {
            const ac = accentMap[skill.accentColor] || accentMap.blue;
            return (
              <RevealWrapper key={skill.id} delay={i * 70}>
                <div style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: 'clamp(18px, 4vw, 24px)', transition: 'all 0.25s', height: '100%', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ac.border; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 36px ${ac.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

                  {/* Glow corner */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle at top right, ${ac.bg}, transparent 70%)`, pointerEvents: 'none' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: ac.bg, border: `1px solid ${ac.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                      {skill.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: ac.text }}>{skill.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {skill.tags.map(t => (
                      <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: ac.bg, border: `1px solid ${ac.border}`, fontSize: '10px', color: ac.text, fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </div>
    </section>

    {/* ─── TIMELINE ─── */}
    <section style={{ padding: '72px 0 88px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>── Journey</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '52px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', color: '#E8E8F2' }}>Experience &amp; Education</h2>
            <p style={{ fontSize: '13px', color: '#6B6B8E', maxWidth: '260px', textAlign: 'left', lineHeight: 1.6 }} className="lg:text-right">My path through academia and hands-on development.</p>
          </div>
        </RevealWrapper>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '1px', background: 'linear-gradient(to bottom, rgba(79,142,247,0.6), rgba(79,142,247,0.05))' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {TIMELINE.map((item, i) => (
              <RevealWrapper key={item.id} delay={i * 110}>
                <div style={{ display: 'flex', gap: '16px', paddingLeft: '30px', position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: '7px', top: '20px', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #4F8EF7', background: '#080B14', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: '0 0 12px rgba(79,142,247,0.3)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4F8EF7' }} />
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1, background: '#0D1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: 'clamp(18px, 4vw, 24px)', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.25)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,142,247,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}>

                    {/* Subtle corner glow */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '80px', background: 'radial-gradient(circle at top right, rgba(79,142,247,0.05), transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#E8E8F2', marginBottom: '4px' }}>{item.title}</h3>
                        <p style={{ fontSize: '13px', color: '#8B8BAE', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4F8EF7', flexShrink: 0 }} />
                          {item.org}
                        </p>
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4F8EF7', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {item.year}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.75, marginBottom: '16px' }}>{item.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map(t => {
                        const ac = accentMap[t.color] || accentMap.blue;
                        return <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: ac.bg, border: `1px solid ${ac.border}`, fontSize: '10px', color: ac.text, fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>;
                      })}
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealWrapper delay={320}>
          <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 26px', background: '#4F8EF7', color: '#fff', borderRadius: '11px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', width: '100%', maxWidth: '220px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3a7de0'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(79,142,247,0.38)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#4F8EF7'; e.currentTarget.style.boxShadow = 'none'; }}>
              Let's Connect <ArrowRight size={14} />
            </Link>
            <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 26px', background: 'transparent', color: '#E8E8F2', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '11px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s', width: '100%', maxWidth: '220px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'; e.currentTarget.style.color = '#4F8EF7'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#E8E8F2'; }}>
              View My Projects <ArrowRight size={14} />
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  </div>
);

export default About;
