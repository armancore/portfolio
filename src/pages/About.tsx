import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../components/seo/PageMeta';
import { ABOUT_PAGE, SKILLS } from '../constants';
import {
  STAGGER,
  revealBody,
  revealCard,
  revealHeading,
  revealRule,
  staggerContainer,
  viewport,
} from '../lib/motion';
import { eyebrow, monoLabel, primaryAction, secondaryAction, sectionHeading } from '../lib/styles';

/** The measure for prose. */
const PROSE = '62ch';

const sectionInner = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8';

/**
 * The mask wipe needs a clipping parent and a block child that can carry a
 * percentage offset, so every heading on this page is built from the pair.
 */
const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: 0 }}>
    <motion.span variants={revealHeading} style={{ display: 'block' }}>
      {children}
    </motion.span>
  </h2>
);

/** Animated hairline. transformOrigin lives here because revealRule only drives
 *  scaleX -- the origin is a layout decision, not a motion one. */
const Rule = () => (
  <motion.div
    aria-hidden="true"
    variants={revealRule}
    style={{
      height: '1px',
      background: 'var(--color-rule)',
      transformOrigin: 'left',
      margin: 'calc(var(--spacing) * 5) 0 calc(var(--spacing) * 11)',
    }}
  />
);

/**
 * `pad` is the vertical rhythm in spacing units, varied per section on purpose:
 * the narrative and the closing statement get room, the reference sections are
 * tighter. Uniform padding is most of why the page used to scroll flat.
 */
const Section = ({
  children,
  pad,
  first = false,
}: {
  children: React.ReactNode;
  pad: number;
  first?: boolean;
}) => (
  <motion.section
    variants={staggerContainer(STAGGER.loose)}
    initial="hidden"
    // The header is above the fold, so it animates on mount; the rest wait
    // until they are scrolled to.
    {...(first ? { animate: 'show' } : { whileInView: 'show', viewport })}
    style={{
      paddingTop: first ? 'calc(var(--spacing) * 28)' : `calc(var(--spacing) * ${pad})`,
      paddingBottom: `calc(var(--spacing) * ${pad})`,
      ...(first ? {} : { borderTop: '1px solid var(--color-rule)' }),
    }}
  >
    <div className={sectionInner}>{children}</div>
  </motion.section>
);

const About = () => (
  <div style={{ minHeight: '100svh' }}>
    <PageMeta path="/about" />

    {/* 1 — Asymmetric split. Breaks the stacked pattern immediately. */}
    <Section first pad={18}>
      <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 6)' }}>
        {ABOUT_PAGE.eyebrow}
      </motion.p>
      <div className="about-split">
        <h1
          className="about-split__heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: 'var(--color-chalk)',
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            margin: 0,
            overflow: 'hidden',
          }}
        >
          <motion.span variants={revealHeading} style={{ display: 'block' }}>
            {ABOUT_PAGE.heading}
          </motion.span>
        </h1>
        <motion.p
          variants={revealBody}
          className="about-split__body"
          style={{
            fontSize: 'clamp(var(--text-base), 3.8vw, var(--text-lg))',
            color: 'var(--color-chalk-2)',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {ABOUT_PAGE.intro}
        </motion.p>
      </div>
    </Section>

    {/* 2 — The centrepiece, and the page's widest vertical rhythm. Prose only:
        no card, no callout, no icon, and no anchor wrapping any of it. */}
    <Section pad={28}>
      <motion.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.storyEyebrow}
      </motion.p>
      <Heading>{ABOUT_PAGE.storyHeading}</Heading>
      <Rule />

      {ABOUT_PAGE.story.map((para, i) =>
        i === ABOUT_PAGE.storyEmphasisIndex ? (
          // Out of the column: full container width, larger, against a rule.
          <motion.div key={i} variants={revealBody} className="about-breakout">
            <span className="about-breakout__marker">{ABOUT_PAGE.storyEmphasisMarker}</span>
            <p className="about-breakout__text">{para}</p>
          </motion.div>
        ) : (
          <motion.p
            key={i}
            variants={revealBody}
            style={{
              maxWidth: PROSE,
              fontSize: 'var(--text-base)',
              color: 'var(--color-chalk-2)',
              lineHeight: 1.9,
              margin: i === ABOUT_PAGE.story.length - 1 ? 0 : '0 0 calc(var(--spacing) * 6)',
            }}
          >
            {para}
          </motion.p>
        )
      )}
    </Section>

    {/* 3 — A specification sheet. Tighter rhythm than the narrative sections. */}
    <Section pad={18}>
      <motion.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.skillsEyebrow}
      </motion.p>
      <Heading>{ABOUT_PAGE.skillsHeading}</Heading>
      <Rule />

      <dl style={{ margin: 0 }}>
        {SKILLS.map((skill, i) => (
          <motion.div key={skill.id} variants={revealCard(i)} className="about-spec-row">
            <dt style={monoLabel}>{skill.title}</dt>
            <dd
              className="about-spec-row__values"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-chalk-2)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {skill.tags.map((t) => t.label).join(' · ')}
            </dd>
            <span style={{ ...monoLabel, textAlign: 'right' }} aria-hidden="true">
              {String(skill.tags.length).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </dl>
    </Section>

    {/* 4 — A numbered list. Three equal cards was the most generic shape here. */}
    <Section pad={18}>
      <motion.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.workEyebrow}
      </motion.p>
      <Heading>{ABOUT_PAGE.workHeading}</Heading>
      <Rule />

      <div>
        {ABOUT_PAGE.values.map((v, i) => (
          <motion.div key={v.title} variants={revealCard(i)} className="about-numbered-row">
            <span className="about-numbered-row__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-chalk)',
                  margin: '0 0 calc(var(--spacing) * 2)',
                }}
              >
                {v.title}
              </p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-chalk-2)', lineHeight: 1.6, margin: 0 }}>
                {v.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>

    {/* 5 — The closing statement, and the only centred section on the page. */}
    <Section pad={32}>
      <div style={{ textAlign: 'center' }}>
        <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 4)' }}>
          {ABOUT_PAGE.aheadEyebrow}
        </motion.p>
        <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: '0 0 calc(var(--spacing) * 8)' }}>
          <motion.span variants={revealHeading} style={{ display: 'block' }}>
            {ABOUT_PAGE.aheadHeading}
          </motion.span>
        </h2>
        <motion.p
          variants={revealBody}
          style={{
            maxWidth: '46ch',
            margin: '0 auto',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-chalk-2)',
            lineHeight: 1.8,
          }}
        >
          {ABOUT_PAGE.ahead}
        </motion.p>
      </div>
    </Section>

    {/* 6 — A measuring tape across the page. Tightest rhythm on the page. */}
    <Section pad={14}>
      <motion.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 4)' }}>
        {ABOUT_PAGE.timelineLabel}
      </motion.p>
      <motion.ol variants={revealBody} className="about-tape" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {ABOUT_PAGE.timeline.map((stop) => (
          <li
            key={stop.year}
            className={`about-tape__stop${'now' in stop && stop.now ? ' about-tape__stop--now' : ''}`}
          >
            <span className="about-tape__year">{stop.year}</span>
            <span className="about-tape__label">{stop.label}</span>
          </li>
        ))}
      </motion.ol>
    </Section>

    {/* 7 — Close. The Contact CTA is the only amber on the page. */}
    <Section pad={22}>
      <motion.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.ctaEyebrow}
      </motion.p>
      <Heading>{ABOUT_PAGE.ctaHeading}</Heading>

      <motion.div
        variants={revealBody}
        style={{
          marginTop: 'calc(var(--spacing) * 8)',
          display: 'flex',
          gap: 'calc(var(--spacing) * 3)',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/contact" style={primaryAction}>
          {ABOUT_PAGE.ctaContact} <ArrowRight size={14} />
        </Link>
        <Link to="/projects" style={secondaryAction}>
          {ABOUT_PAGE.ctaProjects} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </Section>
  </div>
);

export default About;
