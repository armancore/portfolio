import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Layers, Cpu, Globe, Code2 } from 'lucide-react';
import { BENTO_SKILLS, HOME_PAGE } from '../../constants';
import { STAGGER, revealBody, revealCard, staggerContainer, viewport } from '../../lib/motion';
import { eyebrow, sectionHeading } from '../../lib/styles';

const iconMap = { Layers, Cpu, Globe, Code2 };

const Skills = () => (
  <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={revealBody} initial="hidden" whileInView="show" viewport={viewport}>
        <p style={eyebrow}>{HOME_PAGE.skillsEyebrow}</p>
        <h2 style={{ ...sectionHeading, marginBottom: '52px' }}>{HOME_PAGE.skillsHeading}</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(STAGGER.tight)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: '14px',
        }}
      >
        {BENTO_SKILLS.map((s, i) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          return (
            <motion.div key={s.title} variants={revealCard(i)} className="panel" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-panel-2)',
                  border: '1px solid var(--color-rule)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {Icon ? <Icon size={20} style={{ color: 'var(--color-signal)' }} aria-hidden="true" /> : null}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-chalk)',
                  marginBottom: '8px',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={revealBody}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        style={{ textAlign: 'center', marginTop: '32px' }}
      >
        <Link
          to="/about"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-rule)',
            padding: '10px 20px',
            minHeight: '44px',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-chalk-2)',
            textDecoration: 'none',
          }}
        >
          {HOME_PAGE.skillsCta} <ArrowRight size={13} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Skills;
