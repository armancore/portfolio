import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
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
  Atom,
  Hexagon,
  Database,
  Triangle,
  Server,
  GitBranch,
} from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import { PERSONAL_INFO, PROJECTS } from '../constants';
import useMagnetic from '../hooks/useMagnetic';
import useIsMobile from '../hooks/useIsMobile';
import useTypewriter from '../hooks/useTypewriter';
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

const profileImg640 = '/profile-640.webp';
const profileImg960 = '/profile-960.webp';
const profileImgOriginal = '/profile.webp';
const SUBTITLE = PERSONAL_INFO.role;

// lucide has no brand marks, so each entry pairs the closest generic glyph
// with the name it stands for -- the label is what identifies the tech.
const techStack = [
  { icon: Atom, label: 'React' },
  { icon: Hexagon, label: 'Node.js' },
  { icon: Database, label: 'PostgreSQL' },
  { icon: Triangle, label: 'Prisma' },
  { icon: Server, label: 'Express' },
  { icon: GitBranch, label: 'Git' },
];

const bentoSkills = [
  { icon: Layers, title: 'Frontend', desc: 'React, Tailwind, Vite pixel-perfect UIs', color: '#2E8FFF', glow: 'rgba(46,143,255,0.15)' },
  { icon: Cpu, title: 'Backend', desc: 'Node.js, Express, Prisma, PostgreSQL', color: '#2E8FFF', glow: 'rgba(46,143,255,0.15)' },
  { icon: Globe, title: 'Networking', desc: 'TCP/IP, DNS, Linux, Cybersecurity', color: '#2E8FFF', glow: 'rgba(46,143,255,0.15)' },
  { icon: Code2, title: 'Languages', desc: 'C++, Java, Python, JavaScript', color: '#2E8FFF', glow: 'rgba(46,143,255,0.15)' },
];

const Particle = ({
  style,
  index,
  active,
}: {
  style: React.CSSProperties;
  /** Position in the particle field; staggers duration and delay. */
  index: number;
  active: boolean;
}) => (
  <motion.div
    style={style}
    animate={active ? { y: [0, -18, 0], opacity: [0.25, 0.65, 0.25] } : undefined}
    transition={
      active
        ? { duration: 3.2 + index * 0.18, repeat: Infinity, ease: 'easeInOut', delay: index * 0.14 }
        : undefined
    }
  />
);

const TechStrip = ({
  reduceAnimations,
  align = 'flex-start',
}: {
  reduceAnimations: boolean;
  align?: 'flex-start' | 'center';
}) => (
  <ul
    aria-label="Core stack"
    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: align, gap: '6px', listStyle: 'none', margin: 0, padding: 0 }}
  >
    {techStack.map(({ icon: Icon, label }, i) => (
      <motion.li
        key={label}
        initial={reduceAnimations ? false : { opacity: 0, y: 6 }}
        animate={reduceAnimations ? undefined : { opacity: 1, y: 0, transition: { delay: 0.9 + i * 0.07 } }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 9px', borderRadius: '7px', background: 'rgba(46,143,255,0.08)', border: '1px solid rgba(46,143,255,0.18)' }}
      >
        <Icon size={11} style={{ color: '#2E8FFF', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ fontSize: '10px', color: '#9BA1AD', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>{label}</span>
      </motion.li>
    ))}
  </ul>
);

const SocialButton = ({
  href,
  Icon,
  label,
  color,
  border,
  bg,
  glow,
  index,
  reduceAnimations,
}: {
  href: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  color: string;
  border: string;
  bg: string;
  glow: string;
  index: number;
  reduceAnimations: boolean;
}) => {
  const { ref, style } = useMagnetic(0.45);

  return (
    <motion.div ref={ref} style={style}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{
          scale: 1.15,
          y: -3,
          boxShadow: `${glow}, 0 0 0 1px ${border}`,
          filter: 'saturate(1.16) brightness(1.08)',
        }}
        whileTap={{ scale: 0.92 }}
        initial={reduceAnimations ? false : { opacity: 0, y: 10 }}
        animate={reduceAnimations ? undefined : { opacity: 1, y: 0, transition: { delay: 0.8 + index * 0.08 } }}
        className="hover-glow-crisp"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '10px', border: `1px solid ${border}`, background: bg, color, textDecoration: 'none', backdropFilter: 'blur(4px)' }}
      >
        <Icon size={15} />
      </motion.a>
    </motion.div>
  );
};

const Home = () => {
  // Only TriLearn carries featured: true, so top the preview up with the next
  // entries in order -- the two-card grid stretches badly with a single child.
  const featured = [...PROJECTS].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 2);
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [enableAmbientMotion, setEnableAmbientMotion] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const reduceAnimations = prefersReducedMotion || isMobile;
  const ambientMotion = !reduceAnimations && enableAmbientMotion;
  const { displayed: subtitleDisplayed } = useTypewriter({
    text: SUBTITLE,
    speed: 42,
    delay: 900,
    enabled: !reduceAnimations,
  });
  const viewProjectsMagnetic = useMagnetic(0.28);
  const contactMeMagnetic = useMagnetic(0.28);
  const { ref: viewProjectsRef, style: viewProjectsStyle } = viewProjectsMagnetic;
  const { ref: contactMeRef, style: contactMeStyle } = contactMeMagnetic;

  useEffect(() => {
    if (reduceAnimations) {
      setEnableAmbientMotion(false);
      return undefined;
    }

    let timeoutId: number | undefined;
    const startAmbientMotion = () => {
      timeoutId = window.setTimeout(() => setEnableAmbientMotion(true), 250);
    };

    if (document.readyState === 'complete') {
      startAmbientMotion();
    } else {
      window.addEventListener('load', startAmbientMotion, { once: true });
    }

    return () => {
      window.removeEventListener('load', startAmbientMotion);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [reduceAnimations]);

  const particles = useMemo<{ style: React.CSSProperties }[]>(
    () => (reduceAnimations ? [] :
      Array.from({ length: 12 }, (_, i) => ({
        style: {
          position: 'absolute',
          width: i % 3 === 0 ? '3px' : '2px',
          height: i % 3 === 0 ? '3px' : '2px',
          borderRadius: '50%',
          background: '#2E8FFF',
          left: `${10 + i * 7.5}%`,
          top: `${15 + ((i * 5.3) % 70)}%`,
          pointerEvents: 'none',
        },
      }))),
    [reduceAnimations]
  );

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <PageMeta path="/" />

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
              'linear-gradient(rgba(46,143,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(46,143,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            y: reduceAnimations ? 0 : heroY,
          }}
        />

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to bottom, #0A0B0D, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 1, background: 'linear-gradient(to top, #0A0B0D, transparent)' }} />

        {!reduceAnimations && (
          <>
            <motion.div
              animate={ambientMotion ? { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] } : undefined}
              transition={ambientMotion ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
              style={{ position: 'absolute', top: '15%', right: '8%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,143,255,0.12) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
            />
            <motion.div
              animate={ambientMotion ? { scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] } : undefined}
              transition={ambientMotion ? { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 } : undefined}
              style={{ position: 'absolute', bottom: '15%', left: '3%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,143,255,0.10) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
            />
            <motion.div
              animate={ambientMotion ? { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] } : undefined}
              transition={ambientMotion ? { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } : undefined}
              style={{ position: 'absolute', top: '50%', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,143,255,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
            />
          </>
        )}

        {particles.map((p, i) => (
          <Particle key={i} style={p.style} index={i} active={ambientMotion} />
        ))}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '40px', paddingBottom: '96px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              variants={reduceAnimations ? undefined : staggerContainer(0.12, 0.1)}
              initial={reduceAnimations ? false : 'hidden'}
              animate={reduceAnimations ? undefined : 'show'}
              className="order-1 lg:order-1"
            >
              <motion.div variants={heroVariants} style={{ marginBottom: '28px' }}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px 6px 10px', background: 'rgba(46,143,255,0.07)', border: '1px solid rgba(46,143,255,0.25)', borderRadius: '100px', backdropFilter: 'blur(8px)' }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2E8FFF', boxShadow: '0 0 0 3px rgba(46,143,255,0.2)', flexShrink: 0, display: 'inline-block' }}
                  />
                  <span style={{ color: '#7DB8FF', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                    shipping full-stack apps from schema to interface
                  </span>
                  <Sparkles size={10} style={{ color: '#2E8FFF', flexShrink: 0 }} />
                </motion.div>
              </motion.div>

              <motion.h1 variants={blurIn} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.035em', marginBottom: '4px' }}>
                <motion.span style={{ fontSize: 'clamp(42px, 12vw, 90px)', color: '#ECEEF2', display: 'block' }}>
                  <SplitTextReveal text="Arman" delay={0} />
                </motion.span>
                <motion.span style={{ fontSize: 'clamp(42px, 12vw, 90px)', display: 'block', color: '#2E8FFF' }}>
                  <SplitTextReveal text="Khan." delay={0.22} />
                </motion.span>
              </motion.h1>

              <motion.div variants={heroVariants} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '16px', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '1px', background: 'rgba(46,143,255,0.6)', flexShrink: 0, marginTop: '11px' }} />
                <div style={{ minWidth: 0 }}>
                  {/* minHeight reserves the two lines the full string wraps to, so the
                      typewriter does not shift the bio and CTAs while it types. */}
                  <p style={{ fontSize: 'clamp(15px, 3.5vw, 17px)', color: '#9BA1AD', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.5, maxWidth: '440px', minHeight: reduceAnimations ? undefined : '51px' }}>
                    {subtitleDisplayed}
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 2.8vw, 13px)', color: '#5C626E', lineHeight: 1.5, marginTop: '7px', maxWidth: '440px' }}>
                    {PERSONAL_INFO.context}
                  </p>
                </div>
              </motion.div>

              <motion.p variants={heroVariants} style={{ fontSize: '14.5px', color: '#9BA1AD', lineHeight: 1.85, maxWidth: '500px', marginBottom: '32px' }}>
                {PERSONAL_INFO.intro}
              </motion.p>

              <motion.div variants={heroVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <motion.div
                  ref={viewProjectsRef}
                  style={viewProjectsStyle}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/projects"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '12px', background: 'linear-gradient(135deg, #2E8FFF, #1E6FD9)', padding: '13px 24px', fontSize: '14px', fontWeight: 600, color: 'white', textDecoration: 'none', boxShadow: '0 8px 32px rgba(46,143,255,0.4), 0 0 0 1px rgba(46,143,255,0.1)' }}
                  >
                    View Projects <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.div
                  ref={contactMeRef}
                  style={contactMeStyle}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', padding: '13px 24px', fontSize: '14px', fontWeight: 500, color: '#ECEEF2', textDecoration: 'none', backdropFilter: 'blur(8px)' }}
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
                    color: '#ECEEF2',
                    border: 'rgba(255,255,255,0.16)',
                    bg: 'rgba(255,255,255,0.06)',
                    glow: '0 0 0 1px rgba(255,255,255,0.1), 0 12px 28px rgba(255,255,255,0.1)',
                  },
                  {
                    href: 'https://www.linkedin.com/in/techiee-arman/',
                    icon: Linkedin,
                    label: 'LinkedIn',
                    color: '#38BDF8',
                    border: 'rgba(56,189,248,0.28)',
                    bg: 'rgba(56,189,248,0.12)',
                    glow: '0 0 0 1px rgba(56,189,248,0.15), 0 12px 28px rgba(56,189,248,0.34)',
                  },
                  {
                    href: 'https://www.facebook.com/techiee.arman',
                    icon: Facebook,
                    label: 'Facebook',
                    color: '#1E6FD9',
                    border: 'rgba(46,143,255,0.3)',
                    bg: 'rgba(46,143,255,0.12)',
                    glow: '0 0 0 1px rgba(46,143,255,0.15), 0 12px 28px rgba(46,143,255,0.34)',
                  },
                  {
                    href: 'https://www.instagram.com/techiee.arman',
                    icon: Instagram,
                    label: 'Instagram',
                    color: '#EC4899',
                    border: 'rgba(236,72,153,0.32)',
                    bg: 'rgba(236,72,153,0.12)',
                    glow: '0 0 0 1px rgba(236,72,153,0.14), 0 12px 28px rgba(236,72,153,0.32)',
                  },
                ].map(({ href, icon: Icon, label, color, border, bg, glow }, i) => (
                  <SocialButton
                    key={href}
                    href={href}
                    Icon={Icon}
                    label={label}
                    color={color}
                    border={border}
                    bg={bg}
                    glow={glow}
                    index={i}
                    reduceAnimations={reduceAnimations}
                  />
                ))}
                <motion.span
                  initial={reduceAnimations ? false : { opacity: 0 }}
                  animate={reduceAnimations ? undefined : { opacity: 1, transition: { delay: 1.2 } }}
                  style={{ color: '#5C626E', fontSize: '12px', marginLeft: '4px' }}
                >
                  Based in Kathmandu, Nepal
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={reduceAnimations ? undefined : fadeRight}
              initial={reduceAnimations ? false : 'hidden'}
              animate={reduceAnimations ? undefined : 'show'}
              transition={reduceAnimations ? undefined : { delay: 0.4, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-2 lg:justify-self-end"
            >
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.96, 1.03, 0.96] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: '-18px', borderRadius: '40px', background: 'radial-gradient(ellipse at center, rgba(46,143,255,0.13) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '30px', background: 'transparent', border: '1px solid rgba(46,143,255,0.2)', zIndex: 3, pointerEvents: 'none' }}
                />

                <div style={{ position: 'relative', zIndex: 1, borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)', width: '100%', maxWidth: '385px', margin: '0 auto' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(46,143,255,0.9), rgba(46,143,255,0.9), transparent)', zIndex: 2 }} />

                  <motion.img
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
                    whileHover={reduceAnimations || isMobile ? undefined : { scale: 1.03 }}
                    transition={reduceAnimations ? undefined : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: 'min(560px, 82vw)', minHeight: '360px', objectFit: 'cover', display: 'block' }}
                  />

                  <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(10,11,13,0.97) 0%, rgba(10,11,13,0.65) 50%, transparent 100%)', zIndex: 2 }} />

                  <div className="hidden md:block" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 4vw, 30px)', zIndex: 3 }}>
                    {/* Name plate and stack only. The role and the student line
                        sit in the hero column immediately to the left, so
                        repeating them inside the portrait read as an echo. */}
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 4vw, 21px)', color: '#ECEEF2', letterSpacing: '-0.015em', marginBottom: '12px' }}>Arman Khan</p>
                    <TechStrip reduceAnimations={reduceAnimations} />
                  </div>

                </div>

                <div className="block md:hidden" style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '20px', color: '#ECEEF2', letterSpacing: '-0.015em', marginBottom: '12px' }}>Arman Khan</p>
                  <TechStrip reduceAnimations={reduceAnimations} align="center" />
                </div>

                  <motion.div
                    initial={reduceAnimations ? false : { opacity: 0, scale: 0.8 }}
                    animate={reduceAnimations ? undefined : { opacity: 1, scale: 1 }}
                    transition={reduceAnimations ? undefined : { delay: 1.1, type: 'spring', stiffness: 200 }}
                    style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 4, display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(10,11,13,0.8)', border: '1px solid rgba(22,163,74,0.35)', borderRadius: '20px', padding: '5px 12px', backdropFilter: 'blur(12px)' }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }}
                    />
                    <span style={{ color: '#16A34A', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                  </motion.div>
                </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: reduceAnimations ? 1 : heroOpacity }}
          initial={reduceAnimations ? false : { opacity: 0 }}
          animate={reduceAnimations ? undefined : { opacity: 1 }}
          transition={reduceAnimations ? undefined : { delay: 1.8 }}
        >
          <motion.div
            animate={reduceAnimations ? undefined : { y: [0, 6, 0] }}
            transition={reduceAnimations ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} style={{ color: '#5C626E' }} />
          </motion.div>
        </motion.div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>What I do</p>
            <h2 className="heading-accent" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: '#ECEEF2', marginBottom: '52px' }}>
              Skills and expertise
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '14px' }}>
            {bentoSkills.map((s, i) => (
              <motion.div
                key={s.title}
                variants={cardReveal}
                whileHover={{ y: -8, boxShadow: `0 0 0 1px ${s.color}66, 0 24px 50px ${s.glow}`, borderColor: `${s.color}75`, filter: 'saturate(1.12)' }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ position: 'relative', cursor: 'default', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(145deg, #1A1D23, #111317)', boxShadow: '0 0 0 1px rgba(46,143,255,0.06), 0 18px 40px rgba(46,143,255,0.05)', padding: '28px', transition: 'border-color 0.15s ease-out, box-shadow 0.15s ease-out, filter 0.15s ease-out' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${s.color}18, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '80px', height: '80px', background: `radial-gradient(circle at bottom left, ${s.color}0a, transparent 65%)`, pointerEvents: 'none' }} />

                <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: '#ECEEF2', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#9BA1AD', lineHeight: 1.65 }}>{s.desc}</p>

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
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)', padding: '10px 20px', fontSize: '13px', color: '#9BA1AD', textDecoration: 'none', background: 'rgba(255,255,255,0.02)' }}>
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
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Featured work</p>
                <h2 className="heading-accent" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 42px)', color: '#ECEEF2' }}>Things I have built</h2>
              </div>
              <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#2E8FFF', textDecoration: 'none' }}>
                All projects <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer(0.14)} initial="hidden" whileInView="show" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))', gap: '20px' }}>
            {featured.map((p) => (
              <motion.div
                key={p.id}
                variants={cardReveal}
                whileHover={{ y: -6, borderColor: 'rgba(46,143,255,0.42)', boxShadow: '0 0 0 1px rgba(46,143,255,0.09), 0 22px 50px rgba(46,143,255,0.09), 0 22px 50px rgba(0,0,0,0.36)', filter: 'saturate(1.1) brightness(1.05)' }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(145deg, #1A1D23, #111317)', boxShadow: '0 0 0 1px rgba(46,143,255,0.06), 0 18px 40px rgba(46,143,255,0.05)', padding: '30px', transition: 'border-color 0.15s ease-out, box-shadow 0.15s ease-out, filter 0.15s ease-out', cursor: 'default' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(46,143,255,0.7), rgba(46,143,255,0.7), transparent)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5C626E' }}>{p.num}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.1)', fontSize: '10px', color: '#16A34A', fontFamily: "'JetBrains Mono', monospace" }}>{p.category}</span>
                    {p.status ? <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(46,143,255,0.1)', border: '1px solid rgba(46,143,255,0.22)', fontSize: '10px', color: '#2E8FFF', fontFamily: "'JetBrains Mono', monospace" }}>{p.status}</span> : null}
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', color: '#ECEEF2', marginBottom: '10px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#9BA1AD', lineHeight: 1.75, marginBottom: '20px', flex: 1 }}>{p.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                  {p.tags.map((t) => (
                    <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: 'rgba(46,143,255,0.08)', border: '1px solid rgba(46,143,255,0.18)', fontSize: '10px', color: '#2E8FFF', fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#16A34A', fontWeight: 500, textDecoration: 'none' }}>
                      Live Demo <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(46,143,255,0.1)', border: '1px solid rgba(46,143,255,0.22)', fontSize: '11px', color: '#2E8FFF', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                      {p.status || 'In Progress'}
                    </span>
                  )}
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#5C626E', textDecoration: 'none' }}>
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
            <div style={{ position: 'relative', background: 'linear-gradient(145deg, #1A1D23, #111317)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: 'clamp(52px, 6vw, 88px)', textAlign: 'center', overflow: 'hidden' }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(46,143,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,143,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
              />

              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(46,143,255,0.7), transparent)' }} />

              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px', position: 'relative' }}>Let us work together</p>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', color: '#ECEEF2', letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: '16px', position: 'relative' }}>
                Have a project in mind?
              </h2>
              <p style={{ fontSize: '15.5px', color: '#9BA1AD', maxWidth: '450px', margin: '0 auto 36px', lineHeight: 1.75, position: 'relative' }}>
                Open to internship and junior developer roles. Let us build something great together.
              </p>

              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '13px', background: 'linear-gradient(135deg, #2E8FFF, #1E6FD9)', padding: '14px 28px', fontSize: '14.5px', fontWeight: 600, color: 'white', textDecoration: 'none', boxShadow: '0 12px 36px rgba(46,143,255,0.38)', position: 'relative' }}
              >
                {PERSONAL_INFO.email}
              </motion.a>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', position: 'relative' }}>
                <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#5C626E' }}>Responds within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
