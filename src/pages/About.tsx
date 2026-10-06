import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
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

const PROSE = '62ch';

const sectionInner = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8';

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: 0 }}>
    <m.span variants={revealHeading} style={{ display: 'block' }}>
      {children}
    </m.span>
  </h2>
);

const Rule = () => (
  <m.div
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

const Section = ({
  children,
  pad,
  first = false,
}: {
  children: React.ReactNode;
  pad: number;
  first?: boolean;
}) => (
  <m.section
    variants={staggerContainer(STAGGER.loose)}
    initial="hidden"
    {...(first ? { animate: 'show' } : { whileInView: 'show', viewport })}
    style={{
      paddingTop: first ? 'calc(var(--spacing) * 16)' : `calc(var(--spacing) * ${pad})`,
      paddingBottom: `calc(var(--spacing) * ${pad})`,
      ...(first ? {} : { borderTop: '1px solid var(--color-rule)' }),
    }}
  >
    <div className={sectionInner}>{children}</div>
  </m.section>
);

const About = () => (
  <div style={{ minHeight: '100svh' }}>
    <PageMeta path="/about" />

    <Section first pad={18}>
      <m.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 6)' }}>
        {ABOUT_PAGE.eyebrow}
      </m.p>
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
          <m.span variants={revealHeading} style={{ display: 'block' }}>
            {ABOUT_PAGE.heading}
          </m.span>
        </h1>
        <m.p
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
        </m.p>
      </div>
    </Section>

    <Section pad={28}>
      <m.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.storyEyebrow}
      </m.p>
      <Heading>{ABOUT_PAGE.storyHeading}</Heading>
      <Rule />

      {ABOUT_PAGE.story.map((para, i) =>
        i === ABOUT_PAGE.storyEmphasisIndex ? (
          <m.div key={i} variants={revealBody} className="about-breakout">
            <span className="about-breakout__marker">{ABOUT_PAGE.storyEmphasisMarker}</span>
            <p className="about-breakout__text">{para}</p>
          </m.div>
        ) : (
          <m.p
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
          </m.p>
        )
      )}
    </Section>

    <Section pad={18}>
      <m.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.skillsEyebrow}
      </m.p>
      <Heading>{ABOUT_PAGE.skillsHeading}</Heading>
      <Rule />

      <dl style={{ margin: 0 }}>
        {SKILLS.map((skill, i) => (
          <m.div key={skill.id} variants={revealCard(i)} className="about-spec-row">
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
          </m.div>
        ))}
      </dl>
    </Section>

    <Section pad={18}>
      <m.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.workEyebrow}
      </m.p>
      <Heading>{ABOUT_PAGE.workHeading}</Heading>
      <Rule />

      <div>
        {ABOUT_PAGE.values.map((v, i) => (
          <m.div key={v.title} variants={revealCard(i)} className="about-numbered-row">
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
          </m.div>
        ))}
      </div>
    </Section>

    <Section pad={32}>
      <div style={{ textAlign: 'center' }}>
        <m.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 4)' }}>
          {ABOUT_PAGE.aheadEyebrow}
        </m.p>
        <h2 style={{ ...sectionHeading, overflow: 'hidden', margin: '0 0 calc(var(--spacing) * 8)' }}>
          <m.span variants={revealHeading} style={{ display: 'block' }}>
            {ABOUT_PAGE.aheadHeading}
          </m.span>
        </h2>
        <m.p
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
        </m.p>
      </div>
    </Section>

    <Section pad={14}>
      <m.p variants={revealBody} style={{ ...eyebrow, marginBottom: 'calc(var(--spacing) * 4)' }}>
        {ABOUT_PAGE.timelineLabel}
      </m.p>
      <m.ol variants={revealBody} className="about-tape" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {ABOUT_PAGE.timeline.map((stop) => (
          <li
            key={stop.year}
            className={`about-tape__stop${'now' in stop && stop.now ? ' about-tape__stop--now' : ''}`}
          >
            <span className="about-tape__year">{stop.year}</span>
            <span className="about-tape__label">{stop.label}</span>
          </li>
        ))}
      </m.ol>
    </Section>

    <Section pad={22}>
      <m.p variants={revealBody} style={eyebrow}>
        {ABOUT_PAGE.ctaEyebrow}
      </m.p>
      <Heading>{ABOUT_PAGE.ctaHeading}</Heading>

      <m.div
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
      </m.div>
    </Section>
  </div>
);

export default About;
