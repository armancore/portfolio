import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
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

/** Hoisted: motion.create() inside render would mint a new component type on
 *  every render, remounting the card and throwing away its animation state. */
const MotionLink = motion.create(Link);

/** How many stack toggles the bar will show. */
const STACK_AXIS_SIZE = 5;
/** Chips shown on a card before the rest become a "+N". */
const VISIBLE_TAGS = 3;

const typeAxis = [...new Set(PROJECTS.map((p) => p.type))] as ProjectType[];

/**
 * Only rendered when it has more than one reachable option. Everything is live
 * or in progress today; the axis appears on its own once the values actually
 * separate something.
 */
const statusAxis = [...new Set(PROJECTS.map((p) => p.status))] as ProjectStatus[];

/**
 * The stack axis, derived from the tags that actually exist.
 *
 * A tag carried by almost every project cannot separate anything, so anything
 * appearing on all-but-one is dropped before the top five are taken. Ties break
 * alphabetically so the bar is stable across builds.
 */
const stackAxis = (() => {
  const counts = new Map<string, number>();
  PROJECTS.forEach((p) => p.tags.forEach((t) => counts.set(t.label, (counts.get(t.label) ?? 0) + 1)));
  return [...counts.entries()]
    .filter(([, n]) => n > 1 && n < PROJECTS.length - 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, STACK_AXIS_SIZE)
    .map(([label]) => label);
})();

/** Toggles a value in a set, returning a new set. */
const toggle = <T,>(set: Set<T>, value: T) => {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const extra = project.tags.length - VISIBLE_TAGS;
  // The card now leads to the detail page rather than straight off-site. The
  // live and source links live on that page, so a click no longer leaves the
  // site before the reader has seen what the project is.
  const detailHref = project.slug ? `/projects/${project.slug}` : null;
  const externalHref = project.liveUrl ?? project.githubUrl;
  const isLive = project.status === 'live';

  const body = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'calc(var(--spacing) * 3)' }}>
        <span style={monoLabel}>{project.num}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing) * 2)' }}>
          {/* The page's only amber, on the only project that earns emphasis. */}
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
          // Two lines reserved whether the title needs them or not, so a
          // one-line title does not make its whole row shorter than the next.
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

      {/* Pushes the footer to a common baseline across every card in the row. */}
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
        {/* Phosphor is a live-state signal, so "Live demo" carries it. A project
            that has not shipped says so in muted text instead. */}
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
        {project.githubUrl ? (
          <span style={{ ...monoLabel, display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--spacing))' }}>
            <Github size={12} />
          </span>
        ) : null}
      </div>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    // whileInView rather than a plain `animate`: the cards sit below the fold
    // and this is the pattern the rest of the site uses.
    whileInView: {
      opacity: 1,
      y: 0,
      // Capped so a late card in a long list is not left waiting.
      transition: { duration: DURATION.enter, ease: EASE, delay: Math.min(index, 5) * STAGGER.tight },
    },
    viewport,
    className: 'panel pj-card',
  };

  // A project with neither a deployment nor a public repo has nowhere to go, so
  // it renders as an article rather than as a link to nothing.
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

  // OR within an axis, AND across axes. An empty axis means "no constraint",
  // which is what makes the first click narrow rather than widen.
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

  const reset = () => {
    setTypes(new Set());
    setStacks(new Set());
    setStatuses(new Set());
  };

  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/projects" />

      {/* Header */}
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

      {/* Filters and grid.
          Deliberately plain: the survivors are rendered and the rest are not.
          No AnimatePresence, no `layout`, no `layoutId` -- all three are what
          broke this before. Cards appear and disappear without an exit
          animation, and each keeps its own initial/whileInView, so nothing
          inherits a variant that could strand it at opacity 0. */}
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
              {typeAxis.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="pj-toggle"
                  aria-pressed={types.has(t)}
                  onClick={() => setTypes((prev) => toggle(prev, t))}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="pj-axis">
              <span className="pj-axis__label">{PROJECTS_PAGE.stackAxisLabel}</span>
              {stackAxis.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="pj-toggle"
                  aria-pressed={stacks.has(s)}
                  onClick={() => setStacks((prev) => toggle(prev, s))}
                >
                  {s}
                </button>
              ))}
            </div>

            {statusAxis.length > 1 ? (
              <div className="pj-axis">
                <span className="pj-axis__label">{PROJECTS_PAGE.statusAxisLabel}</span>
                {statusAxis.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="pj-toggle"
                    aria-pressed={statuses.has(s)}
                    onClick={() => setStatuses((prev) => toggle(prev, s))}
                  >
                    {s}
                  </button>
                ))}
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
            {/* Only offered when there is something to reset. */}
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
