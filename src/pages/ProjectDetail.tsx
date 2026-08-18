import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import NotFound from './NotFound';
import { PROJECTS, PROJECT_DETAIL } from '../constants';
import { STAGGER, revealBody, revealHeading, revealRule, staggerContainer } from '../lib/motion';
import { chip, eyebrow, monoLabel, secondaryAction } from '../lib/styles';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: PROJECT_DETAIL.typeLabel, value: project.type },
    { label: PROJECT_DETAIL.statusLabel, value: project.status },
    {
      label: PROJECT_DETAIL.stackLabel,
      value: project.tags.map((t) => t.label).join(' · '),
    },
  ];

  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path={`/projects/${project.slug}`} />

      <motion.section
        variants={staggerContainer(STAGGER.loose, 0.05)}
        initial="hidden"
        animate="show"
        style={{
          paddingTop: 'calc(var(--spacing) * 16)',
          paddingBottom: 'calc(var(--spacing) * 20)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={revealBody} style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <Link
              to="/projects"
              className="link-quiet"
              style={{
                ...monoLabel,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'calc(var(--spacing) * 2)',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={13} aria-hidden="true" />
              {PROJECT_DETAIL.back}
            </Link>
          </motion.div>

          <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 3)' }}>
            {project.num}
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
              {project.title}
            </motion.span>
          </h1>

          <motion.p
            variants={revealBody}
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-chalk-2)',
              maxWidth: '62ch',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {project.longDescription}
          </motion.p>

          <motion.div
            aria-hidden="true"
            variants={revealRule}
            style={{
              height: '1px',
              background: 'var(--color-rule)',
              transformOrigin: 'left',
              margin: 'calc(var(--spacing) * 12) 0 calc(var(--spacing) * 8)',
            }}
          />

          <motion.dl variants={revealBody} style={{ margin: 0, maxWidth: '62ch' }}>
            {rows.map((row) => (
              <div key={row.label} className="about-spec-row">
                <dt style={monoLabel}>{row.label}</dt>
                <dd
                  className="about-spec-row__values"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-chalk)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {row.value}
                </dd>
                <span aria-hidden="true" />
              </div>
            ))}
          </motion.dl>

          {project.badge ? (
            <motion.div variants={revealBody} style={{ marginTop: 'calc(var(--spacing) * 6)' }}>
              <span style={{ ...chip, color: 'var(--color-signal)', borderColor: 'var(--color-signal)' }}>
                {project.badge}
              </span>
            </motion.div>
          ) : null}

          <motion.div
            variants={revealBody}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'calc(var(--spacing) * 3)',
              marginTop: 'calc(var(--spacing) * 10)',
            }}
          >
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
                style={secondaryAction}
              >
                {PROJECT_DETAIL.viewLive} <ExternalLink size={14} aria-hidden="true" />
              </a>
            ) : (
              <span style={{ ...monoLabel, alignSelf: 'center' }}>{PROJECT_DETAIL.notDeployed}</span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
                style={secondaryAction}
              >
                <Github size={14} aria-hidden="true" /> {PROJECT_DETAIL.viewSource}
              </a>
            ) : null}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectDetail;
