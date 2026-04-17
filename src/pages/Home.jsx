import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
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
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import { PERSONAL_INFO, PROJECTS } from '../constants';
import {
  fadeUp,
  fadeRight,
  scaleIn,
  staggerContainer,
  heroVariants,
  viewport,
  blurIn,
  cardReveal,
} from '../lib/motion';

let profileImg = null;
try {
  profileImg = new URL('../assets/profile.webp', import.meta.url).href;
} catch {
  // The profile image is optional during development.
}

const statsData = [
  { value: `${PROJECTS.length + 1}+`, label: 'Projects' },
  { value: '4+', label: 'Languages' },
  { value: '1+', label: 'Experience' },
];

const bentoSkills = [
  { icon: Layers, title: 'Frontend', desc: 'React, Tailwind, Vite pixel-perfect UIs', color: '#4F8EF7', glow: 'rgba(79,142,247,0.22)' },
  { icon: Cpu, title: 'Learning Backend', desc: 'Node.js, Express, Prisma, PostgreSQL', color: '#8b9cff', glow: 'rgba(139,156,255,0.22)' },
  { icon: Globe, title: 'Networking', desc: 'TCP/IP, DNS, Linux, Cybersecurity', color: '#22d3ee', glow: 'rgba(34,211,238,0.22)' },
  { icon: Code2, title: 'Languages', desc: 'C++, Java, Python, JavaScript', color: '#F97316', glow: 'rgba(249,115,22,0.22)' },
];

const Particle = ({ style, index }) => (
  <motion.div
    style={style}
    animate={{ y: [0, -18, 0], opacity: [0.25, 0.65, 0.25] }}
    transition={{ duration: 3.2 + index * 0.18, repeat: Infinity, ease: 'easeInOut', delay: index * 0.14 }}
  />
);

const Home = () => {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 2);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (!profileImg) return undefined;
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = profileImg;
    preload.fetchPriority = 'high';
    document.head.appendChild(preload);
    return () => document.head.removeChild(preload);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        style: {
          position: 'absolute',
          width: i % 3 === 0 ? '3px' : '2px',
          height: i % 3 === 0 ? '3px' : '2px',
          borderRadius: '50%',
          background: i % 2 === 0 ? '#4F8EF7' : '#8b9cff',
          left: `${10 + i * 7.5}%`,
          top: `${15 + ((i * 5.3) % 70)}%`,
          pointerEvents: 'none',
        },
      })),
    []
  );

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta
        title="Arman Khan"
        description="IT student from Nepal currently learning frontend and backend development through hands-on projects with React, Node.js, Express, Prisma, and PostgreSQL."
      />

      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '64px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage:
              'linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            y: heroY,
          }}
        />

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to bottom, #080B14, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to top, #080B14, transparent)' }} />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '15%', right: '8%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          style={{ position: 'absolute', bottom: '15%', left: '3%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.10) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', top: '50%', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
        />

        {particles.map((p, i) => (
          <Particle key={i} style={p.style} index={i} />
        ))}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '40px', paddingBottom: '96px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="show" className="order-1 lg:order-1">
              <motion.div variants={heroVariants} style={{ marginBottom: '28px' }}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px 6px 10px', background: 'rgba(79,142,247,0.07)', border: '1px solid rgba(79,142,247,0.25)', borderRadius: '100px', backdropFilter: 'blur(8px)' }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4F8EF7', boxShadow: '0 0 0 3px rgba(79,142,247,0.2)', flexShrink: 0, display: 'inline-block' }}
                  />
                  <span style={{ color: '#A9C6FF', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                    building polished frontend and learning backend
                  </span>
                  <Sparkles size={10} style={{ color: '#4F8EF7', flexShrink: 0 }} />
                </motion.div>
              </motion.div>

              <motion.h1 variants={blurIn} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.035em', marginBottom: '4px' }}>
                <motion.span style={{ fontSize: 'clamp(42px, 12vw, 90px)', color: '#E8E8F2', display: 'block' }}>Arman</motion.span>
                <motion.span style={{ fontSize: 'clamp(42px, 12vw, 90px)', display: 'block', background: 'linear-gradient(125deg, #4F8EF7 15%, #7C5CFC 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Khan.
                </motion.span>
              </motion.h1>

              <motion.div variants={heroVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '1px', background: 'rgba(79,142,247,0.6)' }} />
                <p style={{ fontSize: 'clamp(15px, 3.5vw, 17px)', color: '#8B8BAE', fontWeight: 300, letterSpacing: '0.01em' }}>
                  IT Student | Learning Frontend & Backend
                </p>
              </motion.div>

              <motion.p variants={heroVariants} style={{ fontSize: '14.5px', color: '#6B6B8E', lineHeight: 1.85, maxWidth: '500px', marginBottom: '32px' }}>
                {PERSONAL_INFO.bio[0]}
              </motion.p>

              <motion.div variants={heroVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/projects"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '12px', background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', padding: '13px 24px', fontSize: '14px', fontWeight: 600, color: 'white', textDecoration: 'none', boxShadow: '0 8px 32px rgba(79,142,247,0.4), 0 0 0 1px rgba(79,142,247,0.2)' }}
                  >
                    View Projects <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', padding: '13px 24px', fontSize: '14px', fontWeight: 500, color: '#E8E8F2', textDecoration: 'none', backdropFilter: 'blur(8px)' }}
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={heroVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  {
                    href: 'https://github.com/armancore',
                    icon: Github,
                    label: 'GitHub',
                    color: '#E8E8F2',
                    border: 'rgba(255,255,255,0.16)',
                    bg: 'rgba(255,255,255,0.06)',
                    glow: '0 8px 20px rgba(255,255,255,0.12)',
                  },
                  {
                    href: 'https://www.linkedin.com/in/techiee-arman/',
                    icon: Linkedin,
                    label: 'LinkedIn',
                    color: '#38BDF8',
                    border: 'rgba(56,189,248,0.28)',
                    bg: 'rgba(56,189,248,0.12)',
                    glow: '0 8px 20px rgba(56,189,248,0.25)',
                  },
                  {
                    href: 'https://www.facebook.com/techiee.arman',
                    icon: Facebook,
                    label: 'Facebook',
                    color: '#7C5CFC',
                    border: 'rgba(124,92,252,0.3)',
                    bg: 'rgba(124,92,252,0.12)',
                    glow: '0 8px 20px rgba(124,92,252,0.25)',
                  },
                  {
                    href: 'https://www.instagram.com/techiee.arman',
                    icon: Instagram,
                    label: 'Instagram',
                    color: '#EC4899',
                    border: 'rgba(236,72,153,0.32)',
                    bg: 'rgba(236,72,153,0.12)',
                    glow: '0 8px 20px rgba(236,72,153,0.24)',
                  },
                ].map(({ href, icon: Icon, label, color, border, bg, glow }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3, boxShadow: glow }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 + i * 0.08 } }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '10px', border: `1px solid ${border}`, background: bg, color, textDecoration: 'none', backdropFilter: 'blur(4px)' }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.2 } }} style={{ color: '#3A3A5C', fontSize: '12px', marginLeft: '4px' }}>
                  Based in Kathmandu, Nepal
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-2 lg:justify-self-end"
            >
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.96, 1.03, 0.96] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: '-18px', borderRadius: '40px', background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.13) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '30px', background: 'transparent', border: '1px solid rgba(79,142,247,0.2)', zIndex: 3, pointerEvents: 'none' }}
                />

                <div style={{ position: 'relative', zIndex: 1, borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)', width: '100%', maxWidth: '385px', margin: '0 auto' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.9), rgba(124,92,252,0.9), transparent)', zIndex: 2 }} />

                  {profileImg ? (
                    <motion.img
                      className="hero-profile-image"
                      src={profileImg}
                      alt="Arman Khan"
                      fetchPriority="high"
                      loading="eager"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: '100%', height: 'min(560px, 82vw)', minHeight: '360px', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: 'min(560px, 82vw)', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #141b2c 0%, #0d1117 50%, #161b27 100%)' }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '80px', fontWeight: 800, background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AK</span>
                    </div>
                  )}

                  <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(8,11,20,0.97) 0%, rgba(8,11,20,0.65) 50%, transparent 100%)', zIndex: 2 }} />

                  <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 4vw, 30px)', zIndex: 3 }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 4vw, 21px)', color: '#E8E8F2', marginBottom: '4px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#8B8BAE', marginBottom: '14px' }}>IT Student | Learning Frontend & Backend</p>
                    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                      {statsData.map((s) => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '17px', color: '#E8E8F2' }}>{s.value}</p>
                          <p style={{ fontSize: '9px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="block md:hidden" style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '20px', color: '#E8E8F2', marginBottom: '4px' }}>Arman Khan</p>
                  <p style={{ fontSize: '12px', color: '#8B8BAE', marginBottom: '14px' }}>IT Student | Learning Frontend & Backend</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '18px' }}>
                    {statsData.map((s) => (
                      <div key={`m-${s.label}`} style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#E8E8F2' }}>{s.value}</p>
                        <p style={{ fontSize: '9px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
                      </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                    style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 4, display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(8,11,20,0.8)', border: '1px solid rgba(0,217,181,0.35)', borderRadius: '20px', padding: '5px 12px', backdropFilter: 'blur(12px)' }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D9B5', display: 'inline-block' }}
                    />
                    <span style={{ color: '#00D9B5', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                  </motion.div>
                </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} style={{ color: '#3A3A5C' }} />
          </motion.div>
        </motion.div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>What I do</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: '#E8E8F2', marginBottom: '52px' }}>
              Skills and expertise
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '14px' }}>
            {bentoSkills.map((s, i) => (
              <motion.div
                key={s.title}
                variants={cardReveal}
                whileHover={{ y: -8, boxShadow: `0 24px 50px ${s.glow}`, borderColor: `${s.color}60` }}
                style={{ position: 'relative', cursor: 'default', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(145deg, #0f1520, #0D1117)', padding: '28px', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${s.color}18, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '80px', height: '80px', background: `radial-gradient(circle at bottom left, ${s.color}0a, transparent 65%)`, pointerEvents: 'none' }} />

                <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: '#E8E8F2', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#8B8BAE', lineHeight: 1.65 }}>{s.desc}</p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px', background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)`, transformOrigin: 'center' }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} style={{ textAlign: 'center', marginTop: '32px' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)', padding: '10px 20px', fontSize: '13px', color: '#8B8BAE', textDecoration: 'none', background: 'rgba(255,255,255,0.02)' }}>
                Full skills breakdown <ArrowRight size={13} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '52px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Featured work</p>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: '#E8E8F2' }}>Things I have built</h2>
              </div>
              <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#4F8EF7', textDecoration: 'none' }}>
                All projects <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer(0.14)} initial="hidden" whileInView="show" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))', gap: '20px' }}>
            {featured.map((p) => (
              <motion.div
                key={p.id}
                variants={cardReveal}
                whileHover={{ y: -6 }}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(145deg, #0f1520, #0D1117)', padding: '30px', transition: 'border-color 0.25s', cursor: 'default' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.7), rgba(124,92,252,0.7), transparent)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4A6A' }}>{p.num}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(0,217,181,0.08)', border: '1px solid rgba(0,217,181,0.2)', fontSize: '10px', color: '#00D9B5', fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                    {p.status ? <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.22)', fontSize: '10px', color: '#F97316', fontFamily: "'JetBrains Mono', monospace" }}>{p.status}</span> : null}
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#E8E8F2', marginBottom: '10px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#8B8BAE', lineHeight: 1.75, marginBottom: '20px', flex: 1 }}>{p.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                  {p.tags.map((t) => (
                    <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.18)', fontSize: '10px', color: '#4F8EF7', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#4F8EF7', fontWeight: 500, textDecoration: 'none' }}>
                      Live Demo <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.22)', fontSize: '11px', color: '#F97316', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                      {p.status || 'In Progress'}
                    </span>
                  )}
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#4A4A6A', textDecoration: 'none' }}>
                    <Github size={12} /> GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={viewport}>
            <div style={{ position: 'relative', background: 'linear-gradient(145deg, #0f1520, #0D1117)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: 'clamp(52px, 6vw, 88px)', textAlign: 'center', overflow: 'hidden' }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(79,142,247,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
              />

              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.7), transparent)' }} />

              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px', position: 'relative' }}>Let us work together</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', color: '#E8E8F2', letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: '16px', position: 'relative' }}>
                Have a project in mind?
              </h2>
              <p style={{ fontSize: '15.5px', color: '#8B8BAE', maxWidth: '450px', margin: '0 auto 36px', lineHeight: 1.75, position: 'relative' }}>
                Open to internship and junior developer roles. Let us build something great together.
              </p>

              <motion.a
                href="mailto:arman.techiee@gmail.com"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '13px', background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)', padding: '14px 28px', fontSize: '14.5px', fontWeight: 600, color: 'white', textDecoration: 'none', boxShadow: '0 12px 36px rgba(79,142,247,0.38)', position: 'relative' }}
              >
                arman.techiee@gmail.com
              </motion.a>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', position: 'relative' }}>
                <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D9B5', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#4A4A6A' }}>Responds within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
