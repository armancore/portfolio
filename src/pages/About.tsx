import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  BookOpen,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Clock,
  Monitor,
  Server,
  Code2,
  Wrench,
  Network,
  FileText,
} from 'lucide-react';
import RevealWrapper from '../components/ui/RevealWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import PageMeta from '../components/seo/PageMeta';
import { ABOUT_PAGE, PERSONAL_INFO, PHOTO_MODE, PROJECTS, SKILLS, TIMELINE } from '../constants';
import { chip, eyebrow, sectionHeading } from '../lib/styles';

const profileImg = '/profile.webp';

// Same string-name-plus-lookup convention SOCIAL_LINKS and CONTACT_LINKS use.
const skillIconMap = { Monitor, Server, Code2, Wrench, Network, FileText };

const details = [
  { icon: BookOpen, label: 'Status', value: PERSONAL_INFO.status, verified: true },
  { icon: GraduationCap, label: 'Degree', value: PERSONAL_INFO.degree },
  { icon: Briefcase, label: 'Institution', value: PERSONAL_INFO.institution },
  { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location },
  { icon: MapPin, label: 'Hometown', value: PERSONAL_INFO.hometown },
  { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, isEmail: true },
  { icon: Clock, label: 'Response', value: PERSONAL_INFO.responseTime },
];

// "Open to Hire" is a live-availability claim, so it is the one fact here that
// earns phosphor. The rest are plain descriptors.
const quickFacts = [
  { label: `${PROJECTS.length} Projects Deployed` },
  { label: 'Prisma + PostgreSQL' },
  { label: 'Open to Hire', verified: true },
  { label: 'From Damak, Jhapa' },
];

const asideCopy: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-chalk-2)',
  maxWidth: '280px',
  lineHeight: 1.6,
};

const About = () => {
  return (
    <div style={{ minHeight: '100svh' }}>
      <PageMeta path="/about" />

      <section style={{ paddingTop: '110px', paddingBottom: '72px', position: 'relative' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div style={{ gridColumn: 'span 12' }} className="lg:col-span-7!">
              <p style={{ ...eyebrow, marginBottom: '14px' }}>{ABOUT_PAGE.eyebrow}</p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(var(--text-3xl), 7.6vw, var(--text-5xl))',
                  color: 'var(--color-chalk)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.0,
                  marginBottom: '20px',
                }}
              >
                {ABOUT_PAGE.heading}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(var(--text-base), 3.8vw, var(--text-lg))',
                  color: 'var(--color-chalk-2)',
                  maxWidth: '520px',
                  lineHeight: 1.85,
                  marginBottom: '28px',
                }}
              >
                {ABOUT_PAGE.intro}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {quickFacts.map(({ label, verified }) => (
                  <span
                    key={label}
                    style={{
                      ...chip,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 13px',
                      color: verified ? 'var(--color-verified)' : 'var(--color-chalk-2)',
                    }}
                  >
                    <span className={verified ? 'status-dot' : 'status-dot status-dot--idle'} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: 'span 12' }} className="hidden lg:col-span-5! lg:block">
              <div className="panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {PHOTO_MODE === 'photo' && profileImg ? (
                    <img
                      src={profileImg}
                      alt="Arman Khan"
                      loading="lazy"
                      width={60}
                      height={60}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: 'var(--radius-lg)',
                        objectFit: 'cover',
                        border: '1px solid var(--color-rule)',
                        flexShrink: 0,
                      }}
                    />
                  ) : null}
                  <div>
                    {/* The page heading two columns over already states the
                        role, and the Personal Info table below repeats degree,
                        institution and location. Name and status is all this
                        card needs to add. */}
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-chalk)',
                        letterSpacing: '-0.015em',
                        marginBottom: '8px',
                      }}
                    >
                      {PERSONAL_INFO.name}
                    </p>
                    <span
                      style={{
                        ...chip,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: 'var(--color-verified)',
                      }}
                    >
                      <span className="status-dot" />
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 88px', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '64px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div style={{ gridColumn: 'span 12' }} className="lg:col-span-7!">
              <RevealWrapper>
                <p style={eyebrow}>{ABOUT_PAGE.storyEyebrow}</p>
                <h2 style={{ ...sectionHeading, marginBottom: '30px' }}>{ABOUT_PAGE.storyHeading}</h2>
              </RevealWrapper>

              {PERSONAL_INFO.bio.map((para, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <p
                    style={{
                      fontSize: 'clamp(var(--text-sm), 3.4vw, var(--text-base))',
                      color: i === 0 ? 'var(--color-chalk)' : 'var(--color-chalk-2)',
                      lineHeight: 1.95,
                      marginBottom: '20px',
                    }}
                  >
                    {para
                      .split(
                        /\b(React|Node\.js|Express|Prisma|PostgreSQL|JavaScript|C\+\+|Java|Python|full-stack|internship|junior developer)\b/gi
                      )
                      .map((part, j) => {
                        const kw = [
                          'react',
                          'node.js',
                          'express',
                          'prisma',
                          'postgresql',
                          'javascript',
                          'c++',
                          'java',
                          'python',
                          'full-stack',
                          'internship',
                          'junior developer',
                        ];
                        return kw.includes(part.toLowerCase()) ? (
                          <strong key={j} style={{ color: 'var(--color-chalk)', fontWeight: 600 }}>
                            {part}
                          </strong>
                        ) : (
                          part
                        );
                      })}
                  </p>
                </ScrollReveal>
              ))}

              <RevealWrapper delay={280}>
                <div
                  style={{
                    marginTop: '32px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                    gap: '12px',
                  }}
                >
                  {ABOUT_PAGE.values.map((v, i) => (
                    <ScrollReveal key={v.title} delay={i * 0.08}>
                      <div className="panel" style={{ padding: '20px', height: '100%' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-chalk)',
                            marginBottom: '5px',
                          }}
                        >
                          {v.title}
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-chalk-2)', lineHeight: 1.55 }}>
                          {v.desc}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </RevealWrapper>
            </div>

            <div style={{ gridColumn: 'span 12' }} className="lg:col-span-5!">
              <RevealWrapper delay={100}>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: '1px solid var(--color-rule)',
                      maxWidth: '420px',
                      margin: '0 auto',
                    }}
                  >
                    {PHOTO_MODE === 'photo' && profileImg ? (
                      <img
                        src={profileImg}
                        alt="Portrait of Arman Khan"
                        loading="lazy"
                        style={{
                          width: '100%',
                          aspectRatio: '3/4',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          display: 'block',
                        }}
                      />
                    ) : null}

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px',
                        background: 'linear-gradient(to top, var(--color-void), transparent)',
                      }}
                    >
                      {/* A portrait caption, not a second bio. The role and the
                          student line are already in the page heading above. */}
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'var(--text-lg)',
                          color: 'var(--color-chalk)',
                          letterSpacing: '-0.015em',
                          marginBottom: '10px',
                        }}
                      >
                        {PERSONAL_INFO.name}
                      </p>
                      <div style={{ width: '44px', height: '2px', background: 'var(--color-signal)' }} />
                    </div>

                    <span
                      style={{
                        ...chip,
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'var(--color-void)',
                        color: 'var(--color-verified)',
                      }}
                    >
                      <span className="status-dot" />
                      Available
                    </span>
                  </div>
                </div>

                <div className="panel" style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-rule)' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-chalk-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {ABOUT_PAGE.infoHeading}
                    </p>
                  </div>
                  {details.map(({ icon: Icon, label, value, verified, isEmail }, i) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '14px 18px',
                        borderBottom: i < details.length - 1 ? '1px solid var(--color-rule)' : 'none',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--color-panel-2)',
                          border: '1px solid var(--color-rule)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={13} style={{ color: 'var(--color-signal)' }} aria-hidden="true" />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-chalk-3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '3px',
                          }}
                        >
                          {label}
                        </p>
                        {isEmail ? (
                          <a
                            href={`mailto:${value}`}
                            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-signal)', wordBreak: 'break-all' }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: verified ? 'var(--color-verified)' : 'var(--color-chalk)',
                              wordBreak: 'break-word',
                            }}
                          >
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '88px 0', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <p style={eyebrow}>{ABOUT_PAGE.skillsEyebrow}</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '44px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <h2 style={sectionHeading}>{ABOUT_PAGE.skillsHeading}</h2>
              <p style={asideCopy} className="lg:text-right">
                {ABOUT_PAGE.skillsAside}
              </p>
            </div>
          </RevealWrapper>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '14px',
            }}
          >
            {SKILLS.map((skill, i) => {
              const SkillIcon = skillIconMap[skill.icon as keyof typeof skillIconMap];
              return (
                <ScrollReveal key={skill.id} delay={i * 0.08}>
                  <div className="panel" style={{ height: '100%', padding: 'clamp(18px,4vw,24px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--color-panel-2)',
                          border: '1px solid var(--color-rule)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {SkillIcon ? (
                          <SkillIcon size={19} style={{ color: 'var(--color-signal)' }} aria-hidden="true" />
                        ) : null}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'var(--text-base)',
                          color: 'var(--color-chalk)',
                        }}
                      >
                        {skill.title}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {skill.tags.map((t) => (
                        <span key={t.label} style={chip}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '88px 0 100px', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealWrapper>
            <p style={eyebrow}>{ABOUT_PAGE.journeyEyebrow}</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '56px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <h2 style={sectionHeading}>{ABOUT_PAGE.journeyHeading}</h2>
              <p style={{ ...asideCopy, maxWidth: '260px' }} className="lg:text-right">
                {ABOUT_PAGE.journeyAside}
              </p>
            </div>
          </RevealWrapper>

          <div style={{ position: 'relative' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '15px',
                top: '8px',
                bottom: '8px',
                width: '1px',
                background: 'var(--color-rule)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <div style={{ display: 'flex', gap: '16px', paddingLeft: '30px', position: 'relative' }}>
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '9px',
                        top: '24px',
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        border: '1px solid var(--color-signal)',
                        background: 'var(--color-void)',
                        zIndex: 1,
                      }}
                    />

                    <div className="panel" style={{ flex: 1, padding: 'clamp(18px,4vw,26px)' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '10px',
                          marginBottom: '12px',
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: 'var(--text-base)',
                              color: 'var(--color-chalk)',
                              marginBottom: '4px',
                            }}
                          >
                            {item.title}
                          </h3>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-chalk-2)' }}>{item.org}</p>
                        </div>
                        <span style={{ ...chip, color: 'var(--color-signal)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {item.year}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-chalk-2)',
                          lineHeight: 1.8,
                          marginBottom: '16px',
                        }}
                      >
                        {item.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {item.tags.map((t) => (
                          <span key={t.label} style={chip}>
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <RevealWrapper delay={320}>
            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-signal)',
                  padding: '13px 28px',
                  minHeight: '44px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-void)',
                  textDecoration: 'none',
                }}
              >
                {ABOUT_PAGE.ctaContact} <ArrowRight size={14} />
              </Link>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-rule)',
                  padding: '13px 28px',
                  minHeight: '44px',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-chalk)',
                  textDecoration: 'none',
                }}
              >
                {ABOUT_PAGE.ctaProjects} <ArrowRight size={14} />
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
};

export default About;
