import React from 'react';
import { motion } from 'motion/react';
import PageMeta from '../components/seo/PageMeta';
import ContactForm from '../components/sections/ContactForm';
import { CONTACT_LINKS, CONTACT_PAGE, CONTACT_SECONDARY } from '../constants';
import {
  STAGGER,
  revealBody,
  revealCard,
  revealHeading,
  revealRule,
  staggerContainer,
  viewport,
} from '../lib/motion';
import { eyebrow, monoLabel } from '../lib/styles';

const Contact = () => (
  <div style={{ minHeight: '100svh' }}>
    <PageMeta path="/contact" />

    <motion.section
      variants={staggerContainer(STAGGER.loose, 0.05)}
      initial="hidden"
      animate="show"
      style={{
        paddingTop: 'calc(var(--spacing) * 16)',
        paddingBottom: 'calc(var(--spacing) * 10)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 3)' }}>
          {CONTACT_PAGE.eyebrow}
        </motion.p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: 'var(--color-chalk)',
            letterSpacing: '-0.035em',
            lineHeight: 1.03,
            margin: '0 0 calc(var(--spacing) * 4)',
            overflow: 'hidden',
          }}
        >
          <motion.span variants={revealHeading} style={{ display: 'block' }}>
            {CONTACT_PAGE.heading}
          </motion.span>
        </h1>
        <motion.p
          variants={revealBody}
          style={{
            fontSize: 'clamp(var(--text-sm), 3.6vw, var(--text-base))',
            color: 'var(--color-chalk-2)',
            maxWidth: '62ch',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {CONTACT_PAGE.intro}
        </motion.p>
      </div>
    </motion.section>

    <section style={{ paddingBottom: 'calc(var(--spacing) * 25)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          aria-hidden="true"
          variants={revealRule}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{
            height: '1px',
            background: 'var(--color-rule)',
            transformOrigin: 'left',
            margin: '0 0 calc(var(--spacing) * 10)',
          }}
        />

        <div className="contact-split">
          <div className="contact-split__form">
            <ContactForm />
          </div>

          <aside className="contact-split__direct">
            <motion.p
              variants={revealBody}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 5)' }}
            >
              {CONTACT_PAGE.directHeading}
            </motion.p>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {CONTACT_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  variants={revealCard(i)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="contact-row"
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="link-quiet"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-chalk)',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {link.label}
                    </span>
                    <span style={{ ...monoLabel, display: 'block', marginTop: 'calc(var(--spacing))' }}>
                      {link.sublabel}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.p
              variants={revealBody}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              style={{ ...monoLabel, marginTop: 'calc(var(--spacing) * 5)' }}
            >
              {CONTACT_PAGE.alsoOn}{' '}
              {CONTACT_SECONDARY.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 ? ' · ' : ''}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-quiet">
                    {s.label}
                  </a>
                </React.Fragment>
              ))}
            </motion.p>
          </aside>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
