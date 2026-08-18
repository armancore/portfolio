import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import PageMeta from '../components/seo/PageMeta';
import { NOT_FOUND_COPY } from '../constants';
import { STAGGER, revealBody, revealHeading, revealRule, staggerContainer } from '../lib/motion';
import { eyebrow, primaryAction } from '../lib/styles';

const NotFound = () => (
  <div style={{ minHeight: '100svh' }}>
    <PageMeta path="/404" />

    <motion.section
      variants={staggerContainer(STAGGER.loose, 0.05)}
      initial="hidden"
      animate="show"
      style={{
        paddingTop: 'calc(var(--spacing) * 20)',
        paddingBottom: 'calc(var(--spacing) * 25)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 3)' }}>
          {NOT_FOUND_COPY.label}
        </motion.p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: 'var(--color-chalk)',
            letterSpacing: '-0.035em',
            lineHeight: 1.03,
            margin: '0 0 calc(var(--spacing) * 5)',
            overflow: 'hidden',
          }}
        >
          <motion.span variants={revealHeading} style={{ display: 'block' }}>
            {NOT_FOUND_COPY.heading}
          </motion.span>
        </h1>

        <motion.p
          variants={revealBody}
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-chalk-2)',
            lineHeight: 1.8,
            maxWidth: '52ch',
            margin: 0,
          }}
        >
          {NOT_FOUND_COPY.body}
        </motion.p>

        <motion.div
          aria-hidden="true"
          variants={revealRule}
          style={{
            height: '1px',
            background: 'var(--color-rule)',
            transformOrigin: 'left',
            margin: 'calc(var(--spacing) * 10) 0',
          }}
        />

        <motion.div variants={revealBody}>
          <Link to="/" style={primaryAction}>
            <ArrowLeft size={15} aria-hidden="true" />
            {NOT_FOUND_COPY.cta}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  </div>
);

export default NotFound;
