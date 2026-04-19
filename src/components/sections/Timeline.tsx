import React from 'react';
import Badge from '../ui/Badge';
import RevealWrapper from '../ui/RevealWrapper';
import { TIMELINE } from '../../constants';

const Timeline = () => {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <RevealWrapper key={item.id} delay={i * 120}>
                <div className="relative flex gap-8 lg:gap-10 pl-12 lg:pl-16">
                  {/* Dot */}
                  <div className="absolute left-2 lg:left-3.5 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-bg-primary flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-bg-secondary border border-[var(--border)] rounded-xl p-6 hover:border-[var(--border-hover)] transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-text-primary">{item.title}</h3>
                        <p className="text-text-secondary text-sm mt-0.5">{item.org}</p>
                      </div>
                      <span className="font-mono text-xs text-accent bg-[var(--accent-glow)] border border-accent/20 px-3 py-1 rounded-full flex-shrink-0 self-start">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag.label} label={tag.label} color={tag.color} />
                      ))}
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
