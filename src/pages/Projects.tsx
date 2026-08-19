import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import { PROJECTS, PROJECTS_PAGE } from '../constants';
import type { Project, ProjectStatus, ProjectType } from '../constants';
import {
  DURATION,
  EASE,
  STAGGER,
  revealBody,
  revealHeading,
  revealRule,
  staggerContainer,
  viewport,
} from '../lib/motion';
import { chip, eyebrow, monoLabel } from '../lib/styles';

const MotionLink = motion.create(Link);

const STACK_AXIS_SIZE = 5;
const VISIBLE_TAGS = 3;

const typeAxis = [...new Set(PROJECTS.map((p) => p.type))] as ProjectType[];

const statusAxis = [...new Set(PROJECTS.map((p) => p.status))] as ProjectStatus[];

const stackAxis = (() => {
  const counts = new Map<string, number>();
  PROJECTS.forEach((p) => p.tags.forEach((t) => counts.set(t.label, (counts.get(t.label) ?? 0) + 1)));
  return [...counts.entries()]
    .filter(([, n]) => n > 1 && n < PROJECTS.length - 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, STACK_AXIS_SIZE)
    .map(([label]) => label);
})();

const toggle = <T,>(set: Set<T>, value: T) => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const extra = project.tags.length - VISIBLE_TAGS;
  const detailHref = project.slug ? `/projects/${project.slug}` : null;
  const externalHref = project.liveUrl ?? project.githubUrl;
  const isLive = project.status === 'live';

  const body = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'calc(var(--spacing) * 3)' }}>
        <span style={monoLabel}>{project.num}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing) * 2)' }}>
          {project.badge ? (
            <span style={{ ...chip, color: 'var(--color-signal)', borderColor: 'var(--color-signal)' }}>
              {project.badge}
            </span>
          ) : null}
          <span
            className={isLive ? 'status-dot' : 'status-dot status-dot--idle'}
            title={project.status}
          />
        </span>
      </div>

      <h2
        className="pj-clamp-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-lg)',
          color: 'var(--color-chalk)',
          lineHeight: 1.3,
          minHeight: '2.6em',
          margin: 'calc(var(--spacing) * 4) 0 calc(var(--spacing) * 2)',
        }}
      >
        {project.title}
      </h2>

      <p
        className="pj-clamp-4"
        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)', lineHeight: 1.7, margin: 0 }}
      >
        {project.description}
      </p>

      <div style={{ flex: 1, minHeight: 'calc(var(--spacing) * 5)' }} />

      <div className="pj-tags">
        {project.tags.slice(0, VISIBLE_TAGS).map((t) => (
          <span key={t.label} style={chip}>
            {t.label}
          </span>
        ))}
        {extra > 0 ? <span style={{ ...chip, color: 'var(--color-chalk-3)' }}>+{extra}</span> : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'calc(var(--spacing) * 3)',
          borderTop: '1px solid var(--color-rule)',
          paddingTop: 'calc(var(--spacing) * 4)',
          marginTop: 'calc(var(--spacing) * 4)',
        }}
      >
        {project.liveUrl ? (
          <span
            style={{
              ...monoLabel,
              color: 'var(--color-verified)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'calc(var(--spacing) * 1.5)',
            }}
          >
            {PROJECTS_PAGE.viewLive} <ExternalLink size={11} />
          </span>
        ) : (
          <span style={monoLabel}>{PROJECTS_PAGE.viewPending}</span>
        )}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing) * 2)' }}>
          {project.githubUrl ? (
            <span style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center' }}>
              <Github size={12} />
            </span>
          ) : null}

          {detailHref ? (
            <ArrowRight className="pj-card__go" size={13} aria-hidden="true" />
          ) : (
            <ArrowUpRight className="pj-card__go" size={13} aria-hidden="true" />
          )}
        </span>
      </div>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.enter, ease: EASE, delay: Math.min(index, 5) * STAGGER.tight },
    },
    viewport,
    className: 'panel pj-card',
  };

  if (detailHref) {
    return (
      <MotionLink {...motionProps} to={detailHref}>
        {body}
      </MotionLink>
    );
  }

  return externalHref ? (
    <motion.a {...motionProps} href={externalHref} target="_blank" rel="noopener noreferrer">
      {body}
    </motion.a>
  ) : (
    <motion.article {...motionProps}>{body}</motion.article>
  );
};

const Projects = () => {
  const [types, setTypes] = useState<Set<ProjectType>>(new Set());
  const [stacks, setStacks] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<ProjectStatus>>(new Set());

  const active = types.size + stacks.size + statuses.size > 0;

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => {
        if (types.size && !types.has(p.type)) return false;
        if (statuses.size && !statuses.has(p.status)) return false;
        if (stacks.size && !p.tags.some((t) => stacks.has(t.label))) return false;
        return true;
      }),
    [types, stacks, statuses]
  );

  // A chip's count is what you would get by selecting it, so it ignores its own
  // axis and respects the others. Zero means the chip is a dead end.
  const countFor = useMemo(() => {
    const matches = (
      p: Project,
      t: Set<ProjectType>,
      st: Set<string>,
      s: Set<ProjectStatus>
    ) => {
      if (t.size && !t.has(p.type)) return false;
      if (s.size && !s.has(p.status)) return false;
      if (st.size && !p.tags.some((tag) => st.has(tag.label))) return false;
      return true;
    };

    return {
      type: (t: ProjectType) =>
        PROJECTS.filter((p) => matches(p, new Set([t]), stacks, statuses)).length,
      stack: (s: string) =>
        PROJECTS.filter((p) => matches(p, types, new Set([s]), statuses)).length,
      status: (s: ProjectStatus) =>
        PROJECTS.filter((p) => matches(p, types, stacks, new Set([s]))).length,
    };
  }, [types, stacks, statuses]);

  const reset = () => {
    setTypes(new Set());
    setStacks(new Set());
    setStatuses(new Set());
  };

  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/projects" />

      <motion.section
        variants={staggerContainer(STAGGER.loose, 0.05)}
        initial="hidden"
        animate="show"
        style={{ paddingTop: 'calc(var(--spacing) * 16)', paddingBottom: 'calc(var(--spacing) * 10)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 3)' }}>
            {PROJECTS_PAGE.eyebrow}
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
              {PROJECTS_PAGE.heading}
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
            {PROJECTS_PAGE.intro}
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
              margin: '0 0 calc(var(--spacing) * 7)',
            }}
          />

          <div className="pj-filters">
            <div className="pj-axis">
              <span className="pj-axis__label">{PROJECTS_PAGE.typeAxisLabel}</span>
              {typeAxis.map((t) => {
                const n = countFor.type(t);
                const on = types.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    className="pj-toggle"
                    aria-pressed={on}
                    disabled={!on && n === 0}
                    title={!on && n === 0 ? PROJECTS_PAGE.noMatchHint : undefined}
                    onClick={() => setTypes((prev) => toggle(prev, t))}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="pj-axis">
              <span className="pj-axis__label">{PROJECTS_PAGE.stackAxisLabel}</span>
              {stackAxis.map((s) => {
                const n = countFor.stack(s);
                const on = stacks.has(s);
                return (
                  <button
                    key={s}
                    type="button"
                    className="pj-toggle"
                    aria-pressed={on}
                    disabled={!on && n === 0}
                    title={!on && n === 0 ? PROJECTS_PAGE.noMatchHint : undefined}
                    onClick={() => setStacks((prev) => toggle(prev, s))}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {statusAxis.length > 1 ? (
              <div className="pj-axis">
                <span className="pj-axis__label">{PROJECTS_PAGE.statusAxisLabel}</span>
                {statusAxis.map((s) => {
                  const n = countFor.status(s);
                  const on = statuses.has(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      className="pj-toggle"
                      aria-pressed={on}
                      disabled={!on && n === 0}
                      title={!on && n === 0 ? PROJECTS_PAGE.noMatchHint : undefined}
                      onClick={() => setStatuses((prev) => toggle(prev, s))}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'calc(var(--spacing) * 4)',
              margin: 'calc(var(--spacing) * 6) 0 calc(var(--spacing) * 8)',
            }}
          >
            <p style={monoLabel} aria-live="polite">
              {filtered.length} {PROJECTS_PAGE.countSuffix}
            </p>

            {active ? (
              <button type="button" className="pj-toggle" onClick={reset}>
                {PROJECTS_PAGE.resetLabel}
              </button>
            ) : null}
          </div>

          {filtered.length > 0 ? (
            <div className="pj-grid">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="pj-empty">
              <p style={{ ...monoLabel, color: 'var(--color-chalk)', marginBottom: 'calc(var(--spacing) * 3)' }}>
                {PROJECTS_PAGE.emptyHeading}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-chalk-2)',
                  maxWidth: '46ch',
                  margin: '0 auto calc(var(--spacing) * 6)',
                  lineHeight: 1.7,
                }}
              >
                {PROJECTS_PAGE.emptyBody}
              </p>
              <button type="button" className="pj-toggle" onClick={reset}>
                {PROJECTS_PAGE.resetLabel}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
