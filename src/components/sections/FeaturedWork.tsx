import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { HOME_PAGE, PROJECTS } from '../../constants';
import { STAGGER, revealBody, revealCard, staggerContainer, viewport } from '../../lib/motion';
import { chip, eyebrow, monoLabel, sectionHeading } from '../../lib/styles';

const FeaturedWork = () => {
  // Only TriLearn carries featured: true, so top the preview up with the next
  // entries in order -- the two-card grid stretches badly with a single child.
  const featured = [...PROJECTS].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 2);

  return (
    <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={revealBody} initial="hidden" whileInView="show" viewport={viewport}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '52px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <p style={eyebrow}>{HOME_PAGE.workEyebrow}</p>
              <h2 style={sectionHeading}>{HOME_PAGE.workHeading}</h2>
            </div>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-signal)',
                textDecoration: 'none',
              }}
            >
              {HOME_PAGE.workCta} <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(STAGGER.tight)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))',
            gap: '20px',
          }}
        >
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              variants={revealCard(i)}
              className="panel"
              style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '8px' }}>
                <span style={monoLabel}>{p.num}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
                  <span style={chip}>{p.category}</span>
                  {p.status ? <span style={chip}>{p.status}</span> : null}
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-chalk)',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-chalk-2)',
                  lineHeight: 1.75,
                  marginBottom: '20px',
                  flex: 1,
                }}
              >
                {p.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                {p.tags.map((t) => (
                  <span key={t.label} style={chip}>
                    {t.label}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-rule)',
                  paddingTop: '16px',
                  gap: '12px',
                }}
              >
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-verified)',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="status-dot" />
                    Live Demo <ExternalLink size={11} />
                  </a>
                ) : (
                  <span style={chip}>{p.status || 'In Progress'}</span>
                )}
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  <Github size={12} /> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
