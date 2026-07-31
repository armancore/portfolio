import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Mail,
  BookOpen,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Clock,
  Monitor,
  Server,
  Code2,
  Wrench,
  Network,
  FileText,
} from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageMeta from '../components/seo/PageMeta';
import { ACCENT, PERSONAL_INFO, PHOTO_MODE, PROJECTS, SKILLS, TIMELINE } from '../constants';
import { fadeUp, staggerContainer, viewport, blurIn } from '../lib/motion';

const profileImg = '/profile.webp';

// Same string-name-plus-lookup convention SOCIAL_LINKS and CONTACT_LINKS use.
const skillIconMap = { Monitor, Server, Code2, Wrench, Network, FileText };

const details = [
  { icon: BookOpen, label: 'Status', value: PERSONAL_INFO.status, accent: true },
  { icon: GraduationCap, label: 'Degree', value: PERSONAL_INFO.degree },
  { icon: Briefcase, label: 'Institution', value: PERSONAL_INFO.institution },
  { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location },
  { icon: MapPin, label: 'Hometown', value: PERSONAL_INFO.hometown },
  { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, isEmail: true },
  { icon: Clock, label: 'Response', value: PERSONAL_INFO.responseTime },
];

const quickFacts = [
  { label: `${PROJECTS.length} Projects Deployed`, accent: ACCENT },
  { label: 'Prisma + PostgreSQL', accent: ACCENT },
  {
    label: 'Open to Hire',
    accent: {
      bg: 'var(--status-glow)',
      border: 'color-mix(in srgb, var(--color-status) 22%, transparent)',
      text: 'var(--color-status)',
    },
  },
  { label: 'From Damak, Jhapa', accent: ACCENT },
];

const values = [
  { icon: '🎯', title: 'Goal-Oriented', desc: 'I ship products, not just code.' },
  { icon: '📚', title: 'Fundamentals First', desc: 'CS fundamentals meet modern stacks.' },
  { icon: '🤝', title: 'Team Player', desc: 'Communication is a core skill.' },
];

const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const reduceAnimations = prefersReducedMotion;

  return (
  <div style={{ background: 'transparent', minHeight: '100vh' }}>
    <PageMeta
      title="About | Arman Khan"
      description="Arman Khan builds full-stack web applications with React, Node.js, and PostgreSQL. IT student from Damak, Jhapa, now based in Kathmandu, Nepal."
    />

    <section style={{ paddingTop: '110px', paddingBottom: '72px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(46,143,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(46,143,255,0.035) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        animate={reduceAnimations ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
        transition={reduceAnimations ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'radial-gradient(ellipse 55% 65% at 25% 50%, rgba(46,143,255,0.08) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={reduceAnimations ? undefined : { opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
        transition={reduceAnimations ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse 40% 55% at 80% 50%, rgba(46,143,255,0.06) 0%, transparent 65%)', pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial={reduceAnimations ? false : 'hidden'}
            animate={reduceAnimations ? undefined : 'show'}
            style={{ gridColumn: 'span 12' }}
            className="lg:!col-span-7"
          >
            <motion.p variants={fadeUp} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Who I am
            </motion.p>
            <motion.h1 variants={blurIn} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 7.6vw, 80px)', color: '#ECEEF2', letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: '20px' }}>
              About Me
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 3.8vw, 17px)', color: '#9BA1AD', maxWidth: '520px', lineHeight: 1.85, marginBottom: '28px' }}>
              I build full-stack web applications with React, Node.js, and PostgreSQL. Originally from Damak, Jhapa, now studying IT and building software in Kathmandu, Nepal.
            </motion.p>

            <motion.div variants={staggerContainer(0.07)} initial={reduceAnimations ? false : 'hidden'} animate={reduceAnimations ? undefined : 'show'} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {quickFacts.map(({ label, accent }) => (
                <motion.span
                  key={label}
                  variants={fadeUp}
                  whileHover={reduceAnimations ? undefined : { scale: 1.04, y: -2 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 13px', background: accent.bg, border: `1px solid ${accent.border}`, borderRadius: '9px', fontSize: '11px', color: accent.text, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent.text, flexShrink: 0 }} />
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div style={{ gridColumn: 'span 12' }} className="hidden lg:!col-span-5 lg:block">
            <motion.div
              initial={reduceAnimations ? false : { opacity: 0, x: 40 }}
              animate={reduceAnimations ? undefined : { opacity: 1, x: 0 }}
              transition={reduceAnimations ? undefined : { delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ background: 'linear-gradient(145deg, #1A1D23, #111317)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(46,143,255,0.7), rgba(46,143,255,0.7), transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {PHOTO_MODE === 'photo' && profileImg ? (
                    <img
                      src={profileImg}
                      alt="Arman Khan"
                      loading="lazy"
                      width={60}
                      height={60}
                      style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'linear-gradient(135deg, #2E8FFF, #1E6FD9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 800, color: '#fff' }}>AK</span>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '16px', color: '#ECEEF2', marginBottom: '3px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#9BA1AD', lineHeight: 1.5 }}>{PERSONAL_INFO.role}</p>
                    <p style={{ fontSize: '10.5px', color: '#5C626E', lineHeight: 1.5, marginTop: '3px', marginBottom: '8px' }}>{PERSONAL_INFO.context}</p>
                    <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 9px', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.1)', borderRadius: '20px' }}>
                      <motion.span
                        animate={reduceAnimations ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                        transition={reduceAnimations ? undefined : { duration: 2, repeat: Infinity }}
                        style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }}
                      />
                      <span style={{ color: '#16A34A', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ padding: '0 0 88px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '64px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div style={{ gridColumn: 'span 12' }} className="lg:!col-span-7">
            <RevealWrapper>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>My story</p>
              <h2 className="heading-accent" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', color: '#ECEEF2', marginBottom: '30px' }}>
                Background and Motivation
              </h2>
            </RevealWrapper>

            {PERSONAL_INFO.bio.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p style={{ fontSize: 'clamp(14px, 3.4vw, 15.5px)', color: i === 0 ? '#ECEEF2' : '#9BA1AD', lineHeight: 1.95, marginBottom: '20px' }}>
                  {para.split(/\b(React|Node\.js|Express|Prisma|PostgreSQL|JavaScript|C\+\+|Java|Python|full-stack|internship|junior developer)\b/gi).map((part, j) => {
                    const kw = ['react', 'node.js', 'express', 'prisma', 'postgresql', 'javascript', 'c++', 'java', 'python', 'full-stack', 'internship', 'junior developer'];
                    return kw.includes(part.toLowerCase()) ? (
                      <strong key={j} style={{ color: '#ECEEF2', fontWeight: 500 }}>{part}</strong>
                    ) : (
                      part
                    );
                  })}
                </p>
              </ScrollReveal>
            ))}

            <RevealWrapper delay={280}>
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '12px' }}>
                {values.map((v, i) => (
                  <ScrollReveal key={v.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={reduceAnimations ? undefined : { y: -5, borderColor: 'rgba(46,143,255,0.38)', boxShadow: '0 0 0 1px rgba(46,143,255,0.09), 0 14px 34px rgba(46,143,255,0.1)', filter: 'saturate(1.1)' }}
                      style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #1A1D23, #111317)', padding: '20px', transition: 'border-color 0.25s, box-shadow 0.25s' }}
                    >
                      <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{v.icon}</span>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '13px', color: '#ECEEF2', marginBottom: '5px' }}>{v.title}</p>
                      <p style={{ fontSize: '12px', color: '#9BA1AD', lineHeight: 1.55 }}>{v.desc}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </RevealWrapper>
          </div>

          <div style={{ gridColumn: 'span 12' }} className="lg:!col-span-5">
            <RevealWrapper delay={100}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <motion.div
                  animate={reduceAnimations ? undefined : { opacity: [0.3, 0.7, 0.3] }}
                  transition={reduceAnimations ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: '-8px', borderRadius: '32px', border: '1px solid rgba(46,143,255,0.18)', pointerEvents: 'none', zIndex: 0 }}
                />
                <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 36px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(46,143,255,0.08)', maxWidth: '420px', margin: '0 auto', zIndex: 1 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(46,143,255,0.8), rgba(46,143,255,0.8), transparent)', zIndex: 2 }} />

                  {PHOTO_MODE === 'photo' && profileImg ? (
                    <motion.img
                      src={profileImg}
                      alt="Portrait of Arman Khan"
                      loading="lazy"
                      whileHover={reduceAnimations ? undefined : { scale: 1.04 }}
                      transition={reduceAnimations ? undefined : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(160deg, #1A1D23 0%, #111317 50%, #1A1D23 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '80px', fontWeight: 800, background: 'linear-gradient(135deg, #2E8FFF, #1E6FD9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AK</span>
                    </div>
                  )}

                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', background: 'linear-gradient(to top, rgba(10,11,13,0.95) 0%, transparent 100%)', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '19px', color: '#ECEEF2', marginBottom: '3px' }}>Arman Khan</p>
                    <p style={{ fontSize: '12px', color: '#9BA1AD', lineHeight: 1.5 }}>{PERSONAL_INFO.role}</p>
                    <p style={{ fontSize: '10.5px', color: '#5C626E', lineHeight: 1.5, marginTop: '3px' }}>{PERSONAL_INFO.context}</p>
                  </div>

                  <motion.div
                    animate={reduceAnimations ? undefined : { boxShadow: ['0 0 0px rgba(22,163,74,0)', '0 0 12px rgba(22,163,74,0.15)', '0 0 0px rgba(22,163,74,0)'] }}
                    transition={reduceAnimations ? undefined : { duration: 3, repeat: Infinity }}
                    style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2, display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(10,11,13,0.85)', border: '1px solid rgba(22,163,74,0.3)', borderRadius: '20px', padding: '5px 12px', backdropFilter: 'blur(10px)' }}
                  >
                    <motion.span
                      animate={reduceAnimations ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={reduceAnimations ? undefined : { duration: 2, repeat: Infinity }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }}
                    />
                    <span style={{ color: '#16A34A', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
                  </motion.div>

                </div>
              </div>

              <div style={{ background: 'linear-gradient(145deg, #1A1D23, #111317)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.125)' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#5C626E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Personal Info</p>
                </div>
                {details.map(({ icon: Icon, label, value, accent, isEmail }, i) => (
                  <motion.div
                    key={label}
                    whileHover={reduceAnimations ? undefined : { background: 'rgba(46,143,255,0.04)' }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 18px', borderBottom: i < details.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(46,143,255,0.08)', border: '1px solid rgba(46,143,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={13} style={{ color: '#2E8FFF' }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#5C626E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>{label}</p>
                      {isEmail ? (
                        <a href={`mailto:${value}`} style={{ fontSize: '13px', color: '#2E8FFF', textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
                      ) : (
                        <p style={{ fontSize: '13px', color: accent ? '#16A34A' : '#ECEEF2', wordBreak: 'break-word', fontWeight: accent ? 500 : 400 }}>{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>

    <section style={{ padding: '88px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Technical skills</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '44px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="heading-accent" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 40px)', color: '#ECEEF2' }}>Technical Expertise</h2>
            <p style={{ fontSize: '13px', color: '#9BA1AD', maxWidth: '280px', lineHeight: 1.6 }} className="lg:text-right">
              Technologies I've worked with professionally and in personal projects.
            </p>
          </div>
        </RevealWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '14px' }}>
          {SKILLS.map((skill, i) => {
            const SkillIcon = skillIconMap[skill.icon as keyof typeof skillIconMap];
            return (
            <ScrollReveal key={skill.id} delay={i * 0.08}>
              <motion.div
                whileHover={reduceAnimations ? undefined : { y: -6, borderColor: ACCENT.border, boxShadow: `0 0 0 1px ${ACCENT.border}, 0 20px 44px ${ACCENT.glow}`, filter: 'saturate(1.1)' }}
                style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #1A1D23, #111317)', padding: 'clamp(18px,4vw,24px)', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', background: `radial-gradient(circle at top right, ${ACCENT.bg}, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: ACCENT.bg, border: `1px solid ${ACCENT.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {SkillIcon ? <SkillIcon size={19} style={{ color: ACCENT.text }} aria-hidden="true" /> : null}
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '14.5px', color: ACCENT.text }}>{skill.title}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skill.tags.map((t) => (
                    <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: ACCENT.bg, border: `1px solid ${ACCENT.border}`, fontSize: '10px', color: ACCENT.text, fontFamily: "'JetBrains Mono', monospace" }}>{t.label}</span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>

    <section style={{ padding: '88px 0 100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#2E8FFF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Journey</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 className="heading-accent" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 40px)', color: '#ECEEF2' }}>Experience and Education</h2>
            <p style={{ fontSize: '13px', color: '#9BA1AD', maxWidth: '260px', lineHeight: 1.6 }} className="lg:text-right">
              My path through academia and hands-on development.
            </p>
          </div>
        </RevealWrapper>

        <div style={{ position: 'relative' }}>
          <motion.div
            initial={reduceAnimations ? false : { scaleY: 0 }}
            whileInView={reduceAnimations ? undefined : { scaleY: 1 }}
            viewport={reduceAnimations ? undefined : viewport}
            transition={reduceAnimations ? undefined : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '1px', background: 'linear-gradient(to bottom, rgba(46,143,255,0.7), rgba(46,143,255,0.05))', transformOrigin: 'top' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: '16px', paddingLeft: '30px', position: 'relative' }}>
                  <motion.div
                    initial={reduceAnimations ? false : { scale: 0 }}
                    whileInView={reduceAnimations ? undefined : { scale: 1 }}
                    viewport={reduceAnimations ? undefined : { once: true }}
                    transition={reduceAnimations ? undefined : { delay: i * 0.1 + 0.2, type: 'spring', stiffness: 250 }}
                    style={{ position: 'absolute', left: '7px', top: '22px', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #2E8FFF', background: '#0A0B0D', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: '0 0 14px rgba(46,143,255,0.4)' }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E8FFF' }} />
                  </motion.div>

                  <motion.div
                  whileHover={reduceAnimations ? undefined : { borderColor: 'rgba(46,143,255,0.38)', boxShadow: '0 0 0 1px rgba(46,143,255,0.08), 0 14px 36px rgba(46,143,255,0.09)', filter: 'saturate(1.1)' }}
                    style={{ flex: 1, overflow: 'hidden', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #1A1D23, #111317)', padding: 'clamp(18px,4vw,26px)', transition: 'border-color 0.25s, box-shadow 0.25s', position: 'relative' }}
                  >
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '80px', background: 'radial-gradient(circle at top right, rgba(46,143,255,0.06), transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '16.5px', color: '#ECEEF2', marginBottom: '4px' }}>{item.title}</h3>
                        <p style={{ fontSize: '13px', color: '#9BA1AD', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2E8FFF', flexShrink: 0 }} />
                          {item.org}
                        </p>
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#2E8FFF', background: 'rgba(46,143,255,0.1)', border: '1px solid rgba(46,143,255,0.2)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {item.year}
                      </span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#9BA1AD', lineHeight: 1.8, marginBottom: '16px' }}>{item.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map((t) => (
                        <span key={t.label} style={{ padding: '3px 9px', borderRadius: '6px', background: ACCENT.bg, border: `1px solid ${ACCENT.border}`, fontSize: '10px', color: ACCENT.text, fontFamily: "'JetBrains Mono', monospace" }}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <RevealWrapper delay={320}>
          <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <motion.div whileHover={reduceAnimations ? undefined : { scale: 1.04, y: -2 }} whileTap={reduceAnimations ? undefined : { scale: 0.97 }}>
              <Link
                to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '13px', background: 'linear-gradient(135deg, #2E8FFF, #1E6FD9)', padding: '13px 28px', fontSize: '14px', fontWeight: 600, color: 'white', textDecoration: 'none', boxShadow: '0 10px 30px rgba(46,143,255,0.35)' }}
              >
                Let&apos;s Connect <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={reduceAnimations ? undefined : { scale: 1.04, y: -2 }} whileTap={reduceAnimations ? undefined : { scale: 0.97 }}>
              <Link
                to="/projects"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '13px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', padding: '13px 28px', fontSize: '14px', fontWeight: 500, color: '#ECEEF2', textDecoration: 'none' }}
              >
                View My Projects <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  </div>
  );
};

export default About;
