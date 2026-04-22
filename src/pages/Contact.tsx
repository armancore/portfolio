import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Github, Linkedin, Facebook, Instagram, ArrowRight, ExternalLink } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import ContactForm from '../components/sections/ContactForm';
import PageMeta from '../components/seo/PageMeta';
import { PERSONAL_INFO, CONTACT_LINKS } from '../constants';
import { fadeUp, staggerContainer, blurIn } from '../lib/motion';

const iconMap = { Mail, Github, Linkedin, Facebook, Instagram };

const accentForLink = (iconName) => {
  const map = {
    Mail: { icon: '#4F8EF7', bg: 'rgba(79,142,247,0.1)', border: 'rgba(79,142,247,0.22)' },
    Github: { icon: '#E8E8F2', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
    Linkedin: { icon: '#38BDF8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.22)' },
    Facebook: { icon: '#7C5CFC', bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.22)' },
    Instagram: { icon: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.22)' },
  };
  return map[iconName] || map.Mail;
};

const RECIPIENT_EMAIL = 'arman.techiee@gmail.com';

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const reduceAnimations = prefersReducedMotion || isMobile;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
  <div style={{ background: 'transparent', minHeight: '100vh' }}>
    <PageMeta
      title="Contact | Arman Khan"
      description="Get in touch with Arman Khan for internship opportunities, junior developer roles, collaborations, or project discussions."
    />

    <section style={{ paddingTop: '110px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        animate={reduceAnimations ? undefined : { opacity: [0.4, 0.9, 0.4], scale: [1, 1.12, 1] }}
        transition={reduceAnimations ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,217,181,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={reduceAnimations ? undefined : { opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
        transition={reduceAnimations ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 20% 50%, rgba(79,142,247,0.06) 0%, transparent 65%)', pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={staggerContainer(0.1, 0.05)} initial={reduceAnimations ? false : 'hidden'} animate={reduceAnimations ? undefined : 'show'}>
          <motion.p variants={fadeUp} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4F8EF7', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Contact
          </motion.p>
          <motion.div variants={blurIn} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(44px, 7vw, 78px)', color: '#E8E8F2', letterSpacing: '-0.035em', lineHeight: 1.05 }}>
              Let&apos;s Connect
            </h1>
            <motion.div
              animate={reduceAnimations ? undefined : { boxShadow: ['0 0 0px rgba(0,217,181,0)', '0 0 16px rgba(0,217,181,0.3)', '0 0 0px rgba(0,217,181,0)'] }}
              transition={reduceAnimations ? undefined : { duration: 3, repeat: Infinity }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(0,217,181,0.08)', border: '1px solid rgba(0,217,181,0.22)', borderRadius: '100px' }}
            >
              <motion.span
                animate={reduceAnimations ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={reduceAnimations ? undefined : { duration: 2, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D9B5', display: 'inline-block' }}
              />
              <span style={{ color: '#00D9B5', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>Available</span>
            </motion.div>
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(14px, 3.6vw, 16.5px)', color: '#8B8BAE', maxWidth: '500px', lineHeight: 1.82 }}>
            Whether you have a job opportunity, a project to collaborate on, or just want to say hi my inbox is always open.
          </motion.p>
        </motion.div>
      </div>
    </section>

    <section style={{ padding: '36px 0 88px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '44px' }}>
          <div>
            <RevealWrapper>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '23px', color: '#E8E8F2', marginBottom: '10px' }}>Get in touch</h2>
              <p style={{ fontSize: '14.5px', color: '#8B8BAE', lineHeight: 1.9, marginBottom: '32px' }}>
                {PERSONAL_INFO.bio[2]}
              </p>
            </RevealWrapper>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {CONTACT_LINKS.map((link, i) => {
                const Icon = iconMap[link.iconName];
                const ac = accentForLink(link.iconName);
                return (
                  <ScrollReveal key={link.label} delay={i * 0.06}>
                    <motion.a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={reduceAnimations ? undefined : { x: 5, borderColor: ac.border, background: 'rgba(255,255,255,0.05)', boxShadow: `0 0 0 1px ${ac.border}, 0 14px 28px rgba(2,6,23,0.36)`, filter: 'saturate(1.1)' }}
                    style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(145deg, #0f1520, #0D1117)', padding: '14px 16px', textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s, transform 0.2s' }}
                  >
                      <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: ac.bg, border: `1px solid ${ac.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {Icon && <Icon size={17} style={{ color: ac.icon }} />}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ fontSize: '13.5px', color: '#E8E8F2', fontWeight: 500, marginBottom: '2px', overflowWrap: 'anywhere' }}>{link.label}</p>
                        <p style={{ fontSize: '11px', color: '#4A4A6A', fontFamily: "'JetBrains Mono', monospace" }}>{link.sublabel}</p>
                      </div>
                      <ArrowRight size={13} style={{ color: '#4A4A6A', flexShrink: 0 }} />
                    </motion.a>
                  </ScrollReveal>
                );
              })}
            </div>

            <RevealWrapper delay={380}>
              <motion.div
                animate={reduceAnimations ? undefined : { borderColor: ['rgba(0,217,181,0.18)', 'rgba(0,217,181,0.4)', 'rgba(0,217,181,0.18)'] }}
                transition={reduceAnimations ? undefined : { duration: 4, repeat: Infinity }}
                style={{ background: 'linear-gradient(145deg, rgba(0,217,181,0.05), rgba(0,217,181,0.02))', border: '1px solid rgba(0,217,181,0.18)', borderRadius: '14px', padding: '20px', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,217,181,0.6), transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <motion.span
                    animate={reduceAnimations ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={reduceAnimations ? undefined : { duration: 2, repeat: Infinity }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00D9B5', display: 'inline-block' }}
                  />
                  <span style={{ color: '#00D9B5', fontSize: '13px', fontWeight: 600 }}>Currently Available</span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#8B8BAE', lineHeight: 1.78 }}>
                  Open to internship and junior developer positions. I bring energy, curiosity, and a genuine drive to ship great software.
                </p>
              </motion.div>
            </RevealWrapper>

            <RevealWrapper delay={440}>
              <div style={{ marginTop: '16px' }}>
                <motion.a
                  href={`https://mail.google.com/mail/?view=cm&to=${RECIPIENT_EMAIL}&su=Hello%20Arman`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceAnimations ? undefined : { scale: 1.04, y: -1 }}
                  whileTap={reduceAnimations ? undefined : { scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', borderRadius: '10px', border: '1px solid rgba(79,142,247,0.25)', background: 'rgba(79,142,247,0.07)', padding: '10px 18px', fontSize: '12px', color: '#4F8EF7', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", boxShadow: '0 0 0 1px rgba(79,142,247,0.12)' }}
                >
                  <Mail size={12} />
                  Open Gmail directly
                  <ExternalLink size={11} />
                </motion.a>
              </div>
            </RevealWrapper>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  </div>
  );
};

export default Contact;
