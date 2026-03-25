import React from 'react';
import ProfilePhoto from '../ui/ProfilePhoto';
import SectionLabel from '../ui/SectionLabel';
import RevealWrapper from '../ui/RevealWrapper';
import { PERSONAL_INFO, PHOTO_MODE } from '../../constants';

const details = [
  { label: 'Status', value: PERSONAL_INFO.status, accent: true },
  { label: 'Degree', value: PERSONAL_INFO.degree },
  { label: 'Institution', value: PERSONAL_INFO.institution },
  { label: 'Location', value: PERSONAL_INFO.location },
  { label: 'Email', value: PERSONAL_INFO.email, isEmail: true },
  { label: 'Response Time', value: PERSONAL_INFO.responseTime },
];

const AboutBio = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <RevealWrapper>
          <SectionLabel text="About" className="mb-4" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-12">
            A bit about me
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Bio Paragraphs — 60% */}
          <div className="lg:col-span-3 space-y-5">
            {PERSONAL_INFO.bio.map((para, i) => (
              <RevealWrapper key={i} delay={i * 100}>
                <p className="text-text-secondary leading-relaxed">
                  {para.split(/\b(MERN stack|React|Node\.js|MongoDB|full-stack|Java|C\+\+|Python|JavaScript|internship|junior developer)\b/gi).map((part, j) => {
                    const keywords = ['mern stack', 'react', 'node.js', 'mongodb', 'full-stack', 'java', 'c++', 'python', 'javascript', 'internship', 'junior developer'];
                    if (keywords.includes(part.toLowerCase())) {
                      return <strong key={j} className="text-text-primary font-medium">{part}</strong>;
                    }
                    return part;
                  })}
                </p>
              </RevealWrapper>
            ))}
          </div>

          {/* Right — Photo + Detail table — 40% */}
          <div className="lg:col-span-2">
            <RevealWrapper delay={150}>
              <div className="flex justify-center lg:justify-start mb-8">
                <ProfilePhoto mode={PHOTO_MODE} size="lg" />
              </div>

              <div className="bg-bg-secondary border border-[var(--border)] rounded-xl overflow-hidden">
                {details.map((detail, i) => (
                  <div
                    key={detail.label}
                    className={`flex gap-3 px-5 py-3.5 ${i !== details.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                  >
                    <span className="text-text-muted text-xs font-mono uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">
                      {detail.label}
                    </span>
                    {detail.isEmail ? (
                      <a
                        href={`mailto:${detail.value}`}
                        className="text-accent text-sm hover:underline break-all"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className={`text-sm break-all ${detail.accent ? 'text-accent3 font-medium' : 'text-text-primary'}`}>
                        {detail.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBio;
