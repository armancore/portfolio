import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Facebook, Instagram, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_INFO, FOOTER_COPY } from '../../constants';
import GlowLine from '../ui/GlowLine';

const iconMap = {
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

// Every social mark used to carry its own brand colour and matching glow.
// Section 1 allows one accent, so they now share the neutral surface treatment
// and identify themselves by glyph and label alone.
const FooterSocialIcon = ({ social }: { social: { label: string; url: string; icon: string } }) => {
  const Icon = iconMap[social.icon as keyof typeof iconMap];
  if (!Icon) return null;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="w-11 h-11 rounded-md flex items-center justify-center border border-rule bg-panel text-chalk-2 transition-colors duration-tap ease-signal hover:text-signal hover:border-signal"
    >
      <Icon size={17} />
    </a>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule bg-void">
      <GlowLine />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr_1fr] gap-10 lg:gap-14">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-[-0.03em] text-chalk"
            >
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-signal">.</span>
            </Link>

            <p className="text-chalk-2 text-sm leading-7 mt-5 max-w-md">{FOOTER_COPY.blurb}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-rule bg-panel px-4 py-2 text-sm text-chalk-2 transition-colors duration-tap ease-signal hover:text-signal hover:border-signal"
              >
                <Mail size={14} />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="inline-flex items-center gap-2 rounded-md border border-rule bg-panel px-4 py-2 text-sm text-chalk-2">
                <MapPin size={14} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-3 mb-5">
              {FOOTER_COPY.navHeading}
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-2 text-sm text-chalk-2 transition-colors duration-tap ease-signal hover:text-signal w-fit"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={13} />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-3 mb-5">
              {FOOTER_COPY.connectHeading}
            </p>
            <p className="text-sm text-chalk-2 leading-7 max-w-sm mb-5">{FOOTER_COPY.connectBlurb}</p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <FooterSocialIcon key={social.label} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-chalk-3">
            © {year} {PERSONAL_INFO.name}. {FOOTER_COPY.rights}
          </p>
          <p className="text-xs text-chalk-3">{FOOTER_COPY.credit}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
