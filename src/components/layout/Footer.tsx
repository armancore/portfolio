import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_INFO, FOOTER_COPY } from '../../constants';
import { STAGGER, revealBody, staggerContainer, viewport } from '../../lib/motion';

const iconMap = {
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer(STAGGER.tight)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className="footer-top">
          <motion.div variants={revealBody} className="footer-identity">
            <Link to="/" className="footer-wordmark">
              {PERSONAL_INFO.name}

              <span className="footer-wordmark__stop">.</span>
            </Link>

            <p className="footer-blurb">{FOOTER_COPY.blurb}</p>
          </motion.div>

          <motion.div variants={revealBody} className="footer-stacks">
            <nav className="footer-stack" aria-label={FOOTER_COPY.navLabel}>
              {NAV_LINKS.map((link) => (
                <Link key={link.path} to={link.path} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav className="footer-stack" aria-label={FOOTER_COPY.socialLabel}>
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {Icon ? <Icon size={14} strokeWidth={1.5} aria-hidden="true" /> : null}
                    {social.label}

                    <ArrowUpRight
                      className="footer-link__out"
                      size={12}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>
          </motion.div>
        </div>

        <motion.p variants={revealBody} className="footer-contact">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="footer-email">
            {PERSONAL_INFO.email}
          </a>
          <span aria-hidden="true" className="footer-contact__sep">
            ·
          </span>
          <span>{PERSONAL_INFO.location}</span>
        </motion.p>

        <motion.div variants={revealBody} className="footer-baseline">
          <p>
            © {year} {PERSONAL_INFO.name}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
