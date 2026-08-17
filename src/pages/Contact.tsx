import React from 'react';
import { Mail, Github, Linkedin, Facebook, Instagram, ArrowRight, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import ContactForm from '../components/sections/ContactForm';
import PageMeta from '../components/seo/PageMeta';
import { PERSONAL_INFO, CONTACT_LINKS, CONTACT_PAGE } from '../constants';
import type { ContactIconName } from '../constants';
import { chip, eyebrow } from '../lib/styles';

const iconMap: Record<ContactIconName, LucideIcon> = { Mail, Github, Linkedin, Facebook, Instagram };

const RECIPIENT_EMAIL = PERSONAL_INFO.email;

const Contact = () => {
  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/contact" />

      <section style={{ paddingTop: '110px', paddingBottom: '60px', position: 'relative' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 3)' }}>{CONTACT_PAGE.eyebrow}</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(var(--text-3xl), 7vw, var(--text-5xl))',
                color: 'var(--color-chalk)',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
              }}
            >
              {CONTACT_PAGE.heading}
            </h1>
            {/* Sits beside a display-size h1 rather than in a tag list, so it
                carries more padding than the shared chip. */}
            <span style={{ ...chip, padding: '6px 13px', color: 'var(--color-verified)' }}>
              <span className="status-dot" />
              {CONTACT_PAGE.availableLabel}
            </span>
          </div>
          <p
            style={{
              fontSize: 'clamp(var(--text-sm), 3.6vw, var(--text-base))',
              color: 'var(--color-chalk-2)',
              maxWidth: '500px',
              lineHeight: 1.82,
            }}
          >
            {CONTACT_PAGE.intro}
          </p>
        </div>
      </section>

      <section style={{ padding: '36px 0 88px', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '44px',
            }}
          >
            <div>
              <RevealWrapper>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-xl)',
                    color: 'var(--color-chalk)',
                    marginBottom: '28px',
                  }}
                >
                  {CONTACT_PAGE.getInTouchHeading}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-chalk-2)',
                    lineHeight: 1.9,
                    marginBottom: '32px',
                  }}
                >
                  {PERSONAL_INFO.bio[2]}
                </p>
              </RevealWrapper>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {CONTACT_LINKS.map((link, i) => {
                  const Icon = iconMap[link.iconName];
                  return (
                    <ScrollReveal key={link.label} delay={i * 0.06}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="panel"
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '14px 16px',
                          textDecoration: 'none',
                          transition: 'border-color var(--duration-tap) var(--ease-signal)',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--color-panel-2)',
                            border: '1px solid var(--color-rule)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {Icon && <Icon size={17} style={{ color: 'var(--color-signal)' }} aria-hidden="true" />}
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-chalk)',
                              marginBottom: '2px',
                              overflowWrap: 'anywhere',
                            }}
                          >
                            {link.label}
                          </p>
                          <p
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--color-chalk-3)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {link.sublabel}
                          </p>
                        </div>
                        <ArrowRight size={13} style={{ color: 'var(--color-chalk-3)', flexShrink: 0 }} />
                      </a>
                    </ScrollReveal>
                  );
                })}
              </div>

              <RevealWrapper delay={380}>
                <div className="panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className="status-dot" />
                    <span style={{ color: 'var(--color-verified)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {CONTACT_PAGE.availabilityHeading}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.78 }}>
                    {CONTACT_PAGE.availabilityBody}
                  </p>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={440}>
                <div style={{ marginTop: '16px' }}>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${RECIPIENT_EMAIL}&su=Hello%20Arman`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-rule)',
                      padding: '10px 18px',
                      minHeight: '44px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-signal)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Mail size={12} />
                    {CONTACT_PAGE.gmailCta}
                    <ExternalLink size={11} />
                  </a>
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
