import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { HOME_PAGE, PROJECTS } from '../../constants';
import { STAGGER, revealBody, revealCard, revealHeading, staggerContainer, viewport } from '../../lib/motion';
import { chip, eyebrow, monoLabel, sectionHeading } from '../../lib/styles';

/**
 * An asymmetric pair, not two equal cards.
 *
 * The lead project takes seven columns and states its case at full measure; the
 * second takes five and stays compact. Two equal panels said the two projects
 * were equally important, which is not what "featured" means, and repeated the
 * shape of the band above.
 */
const FeaturedWork = () => {
  // Only TriLearn carries featured: true, so top the preview up with the next
  // entry in order -- the pair needs a second child to be a pair at all.
  const [lead, second] = [...PROJECTS]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 2);

  const renderLinks = (p: typeof lead) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--color-rule)',
        paddingTop: 'calc(var(--spacing) * 4)',
        marginTop: 'calc(var(--spacing) * 5)',
        gap: 'calc(var(--spacing) * 3)',
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
            gap: 'calc(var(--spacing) * 1.5)',
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
        className="link-quiet"
        style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing))', textDecoration: 'none' }}
      >
        <Github size={12} /> GitHub
      </a>
    </div>
  );

  return (
    <motion.section
      variants={staggerContainer(STAGGER.tight)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      style={{ padding: 'calc(var(--spacing) * 22) 0', borderTop: '1px solid var(--color-rule)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'calc(var(--spacing) * 13)',
            flexWrap: 'wrap',
            gap: 'calc(var(--spacing) * 3)',
          }}
        >
          <div>
            <motion.p variants={revealBody} style={eyebrow}>
              {HOME_PAGE.workEyebrow}
            </motion.p>
            <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: 0 }}>
              <motion.span variants={revealHeading} style={{ display: 'block' }}>
                {HOME_PAGE.workHeading}
              </motion.span>
            </h2>
          </div>
          <motion.div variants={revealBody}>
            <Link
              to="/projects"
              className="link-quiet"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'calc(var(--spacing) * 1.5)',
                fontSize: 'var(--text-sm)',
                textDecoration: 'none',
              }}
            >
              {HOME_PAGE.workCta} <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="home-pair">
          {/* Lead — seven columns, description at full measure. */}
          <motion.article variants={revealCard(0)} className="home-pair__lead panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'calc(var(--spacing) * 2)' }}>
              <span style={monoLabel}>{lead.num}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'calc(var(--spacing) * 1.5)' }}>
                <span style={chip}>{lead.type}</span>
                {lead.status ? <span style={chip}>{lead.status}</span> : null}
              </div>
            </div>

            {/* Same type scale as the second card. The asymmetry is in the
                column widths and the extra detail, not in the type size --
                oversized headings made the pair look like two different
                components rather than two projects. */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-lg)',
                color: 'var(--color-chalk)',
                lineHeight: 1.3,
                margin: 'calc(var(--spacing) * 4) 0 calc(var(--spacing) * 2)',
              }}
            >
              {lead.title}
            </h3>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-chalk-2)',
                lineHeight: 1.7,
                maxWidth: '58ch',
                margin: 0,
              }}
            >
              {lead.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'calc(var(--spacing) * 1.5)', marginTop: 'calc(var(--spacing) * 5)' }}>
              {lead.tags.map((t) => (
                <span key={t.label} style={chip}>
                  {t.label}
                </span>
              ))}
            </div>

            {renderLinks(lead)}
          </motion.article>

          {/* Second — five columns, compact. */}
          <motion.article variants={revealCard(1)} className="home-pair__second panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'calc(var(--spacing) * 2)' }}>
              <span style={monoLabel}>{second.num}</span>
              <span style={chip}>{second.type}</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-lg)',
                color: 'var(--color-chalk)',
                lineHeight: 1.3,
                margin: 'calc(var(--spacing) * 4) 0 calc(var(--spacing) * 2)',
              }}
            >
              {second.title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.7, margin: 0 }}>
              {second.description}
            </p>

            {renderLinks(second)}
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedWork;
