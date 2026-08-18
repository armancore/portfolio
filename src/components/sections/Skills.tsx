import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BENTO_SKILLS, HOME_PAGE } from '../../constants';
import { STAGGER, revealBody, revealCard, revealHeading, revealRule, staggerContainer, viewport } from '../../lib/motion';
import { eyebrow, sectionHeading } from '../../lib/styles';

/**
 * A four-across band, not a grid of cards.
 *
 * The hero above is a two-column split and the featured work below is an
 * asymmetric pair, so this reads as a strip: an index, a name and a line per
 * area, divided by hairlines. The icons are gone with the cards -- four amber
 * glyphs were four accents on a page allowed one.
 */
const Skills = () => (
  <motion.section
    variants={staggerContainer(STAGGER.tight)}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    style={{ padding: 'calc(var(--spacing) * 22) 0', borderTop: '1px solid var(--color-rule)' }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.p variants={revealBody} style={eyebrow}>
        {HOME_PAGE.skillsEyebrow}
      </motion.p>
      <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: 0 }}>
        <motion.span variants={revealHeading} style={{ display: 'block' }}>
          {HOME_PAGE.skillsHeading}
        </motion.span>
      </h2>

      <motion.div
        aria-hidden="true"
        variants={revealRule}
        style={{
          height: '1px',
          background: 'var(--color-rule)',
          transformOrigin: 'left',
          margin: 'calc(var(--spacing) * 6) 0 0',
        }}
      />

      <div className="home-band">
        {BENTO_SKILLS.map((s, i) => (
          <motion.div key={s.title} variants={revealCard(i)} className="home-band__cell">
            <span className="home-band__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-lg)',
                color: 'var(--color-chalk)',
                margin: 'calc(var(--spacing) * 3) 0 calc(var(--spacing) * 2)',
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.65, margin: 0 }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={revealBody} style={{ marginTop: 'calc(var(--spacing) * 8)' }}>
        <Link to="/about" className="link-quiet" style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing) * 2)', fontSize: 'var(--text-sm)', textDecoration: 'none' }}>
          {HOME_PAGE.skillsCta} <ArrowRight size={13} />
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

export default Skills;
