import React from 'react';
import { Mail, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import RevealWrapper from '../ui/RevealWrapper';
import { PERSONAL_INFO, CONTACT_LINKS } from '../../constants';

const iconMap = {
  Mail,
  Github,
  Linkedin,
  Facebook,
  Instagram,
};

const ContactInfo = () => {
  return (
    <div>
      <RevealWrapper>
        <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
          Get in touch
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          {PERSONAL_INFO.bio[2]}
        </p>
      </RevealWrapper>

      {/* Contact links */}
      <div className="space-y-3 mb-8">
        {CONTACT_LINKS.map((link, i) => {
          const Icon = iconMap[link.iconName];
          return (
            <RevealWrapper key={link.label} delay={i * 80}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 bg-bg-secondary border border-[var(--border)] rounded-xl hover:border-[var(--border-hover)] hover:bg-bg-tertiary transition-all duration-200 group"
              >
                {/* Icon box */}
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${link.bgColor}`}>
                  {Icon && <Icon size={16} />}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate group-hover:text-accent transition-colors">
                    {link.label}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">{link.sublabel}</p>
                </div>
              </a>
            </RevealWrapper>
          );
        })}
      </div>

      {/* Availability box */}
      <RevealWrapper delay={400}>
        <div className="bg-bg-secondary border border-[var(--border)] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent3 pulse-dot" />
            <span className="text-accent3 text-sm font-medium">Currently Available</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            Open to internship and junior developer positions. I bring energy, curiosity, and a genuine drive to ship great software.
          </p>
        </div>
      </RevealWrapper>
    </div>
  );
};

export default ContactInfo;
