import React from 'react';
import { Mail } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import RevealWrapper from '../ui/RevealWrapper';
import { PERSONAL_INFO } from '../../constants';

const ContactCTA = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="relative bg-bg-secondary border border-[var(--border)] rounded-2xl p-12 lg:p-16 text-center overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 -z-0 opacity-40"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(79,142,247,0.15) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <RevealWrapper>
              <SectionLabel text="Let's work together" className="justify-center mb-6" />
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
                Have a project in mind?
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto mb-8 text-lg">
                I'm currently open to internship and junior developer roles. If you have a project, opportunity, or just want to connect — I'd love to hear from you.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={120}>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent text-white rounded-xl font-medium text-base hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_30px_rgba(79,142,247,0.42)] hover-glow-crisp transition-all duration-200"
              >
                <Mail size={18} />
                {PERSONAL_INFO.email}
              </a>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <div className="flex items-center justify-center gap-2 mt-6 text-text-muted text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent3 pulse-dot" />
                <span>Currently available — response within {PERSONAL_INFO.responseTime}</span>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
