import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Github, Linkedin, Facebook, Instagram, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_INFO } from '../../constants';
import useMagnetic from '../../hooks/useMagnetic';
import GlowLine from '../ui/GlowLine';

const iconMap = {
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

const FooterSocialIcon = ({
  social,
  styleMap,
}: {
  social: { label: string; url: string; icon: string };
  styleMap: Record<string, { color: string; border: string; bg: string; glow: string }>;
}) => {
  const { ref, style: magneticStyle } = useMagnetic(0.4);
  const style = styleMap[social.label] || styleMap.GitHub;
  const Icon = iconMap[social.icon as keyof typeof iconMap];
  if (!Icon) return null;

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} style={magneticStyle}>
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        whileHover={{
          y: -3,
          scale: 1.06,
          boxShadow: `${style.glow}, 0 0 0 1px ${style.border}`,
          filter: 'saturate(1.16) brightness(1.08)',
        }}
        whileTap={{ scale: 0.94 }}
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover-glow-crisp"
        style={{
          color: style.color,
          border: `1px solid ${style.border}`,
          background: style.bg,
        }}
      >
        <Icon size={17} />
      </motion.a>
    </motion.div>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  const socialStyle = {
    GitHub: {
      color: '#E8E8F2',
      border: 'rgba(255,255,255,0.16)',
      bg: 'rgba(255,255,255,0.05)',
      glow: '0 0 0 1px rgba(255,255,255,0.2), 0 14px 30px rgba(255,255,255,0.2)',
    },
    LinkedIn: {
      color: '#38BDF8',
      border: 'rgba(56,189,248,0.3)',
      bg: 'rgba(56,189,248,0.12)',
      glow: '0 0 0 1px rgba(56,189,248,0.28), 0 14px 30px rgba(56,189,248,0.34)',
    },
    Facebook: {
      color: '#7C5CFC',
      border: 'rgba(124,92,252,0.32)',
      bg: 'rgba(124,92,252,0.12)',
      glow: '0 0 0 1px rgba(124,92,252,0.28), 0 14px 30px rgba(124,92,252,0.34)',
    },
    Instagram: {
      color: '#EC4899',
      border: 'rgba(236,72,153,0.34)',
      bg: 'rgba(236,72,153,0.12)',
      glow: '0 0 0 1px rgba(236,72,153,0.28), 0 14px 30px rgba(236,72,153,0.32)',
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-[var(--border)] overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,16,29,0.92) 0%, rgba(6,9,18,0.98) 100%)',
      }}
    >
      <GlowLine />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 15% 0%, rgba(88,166,255,0.08), transparent 28%), radial-gradient(circle at 85% 20%, rgba(34,211,238,0.06), transparent 24%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_1fr] gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-[-0.03em] text-text-primary"
            >
              <span>Arman Khan</span>
              <span className="text-accent">.</span>
            </Link>

            <p className="text-text-secondary text-sm leading-7 mt-5 max-w-md">
              {PERSONAL_INFO.tagline} Focused on building polished web interfaces while steadily growing my backend development skills.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                whileHover={{ y: -2, borderColor: 'var(--border-hover)' }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-[var(--border-hover)] transition-all duration-200"
              >
                <Mail size={14} />
                <span>{PERSONAL_INFO.email}</span>
              </motion.a>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-sm text-text-secondary">
                <MapPin size={14} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.path} whileHover={{ x: 3 }}>
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 w-fit"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={13} />
                </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-5">
              Connect
            </p>
            <p className="text-sm text-text-secondary leading-7 max-w-sm mb-5">
              Open to internship and junior developer opportunities. Available for collaboration and project discussions.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <FooterSocialIcon key={social.label} social={social} styleMap={socialStyle} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {year} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Designed and developed by Arman Khan.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
