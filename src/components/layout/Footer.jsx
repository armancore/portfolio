import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Facebook, Instagram, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_INFO } from '../../constants';
import GlowLine from '../ui/GlowLine';

const iconMap = {
  Github,
  Facebook,
  Instagram,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[var(--border)] overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,16,29,0.92) 0%, rgba(6,9,18,0.98) 100%)',
      }}
    >
      <GlowLine />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 0%, rgba(88,166,255,0.08), transparent 28%), radial-gradient(circle at 85% 20%, rgba(34,211,238,0.06), transparent 24%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_1fr] gap-10 lg:gap-14">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-[-0.03em] text-text-primary"
            >
              <span>Arman Khan</span>
              <span className="text-accent">.</span>
            </Link>

            <p className="text-text-secondary text-sm leading-7 mt-5 max-w-md">
              {PERSONAL_INFO.tagline} Focused on building polished web interfaces and practical full-stack applications.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-[var(--border-hover)] transition-all duration-200"
              >
                <Mail size={14} />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-2 text-sm text-text-secondary">
                <MapPin size={14} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 w-fit"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={13} />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-5">
              Connect
            </p>
            <p className="text-sm text-text-secondary leading-7 max-w-sm mb-5">
              Open to internship and junior developer opportunities. Available for collaboration and project discussions.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon];
                if (!Icon) return null;

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl border border-[var(--border)] bg-white/[0.03] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-[var(--border-hover)] hover:bg-white/[0.06] transition-all duration-200"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {year} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Designed and developed with React, Vite, and a focus on clean user experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
