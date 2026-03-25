import React from 'react';
import Badge from '../ui/Badge';
import RevealWrapper from '../ui/RevealWrapper';
import { SKILLS } from '../../constants';

const accentStyles = {
  blue: {
    icon: 'bg-[var(--accent-glow)] border border-accent/20',
    title: 'text-accent',
    border: 'hover:border-accent/30',
    glow: 'hover:shadow-[0_0_20px_rgba(79,142,247,0.06)]',
  },
  purple: {
    icon: 'bg-[var(--accent2-glow)] border border-accent2/20',
    title: 'text-accent2',
    border: 'hover:border-accent2/30',
    glow: 'hover:shadow-[0_0_20px_rgba(124,92,252,0.06)]',
  },
  orange: {
    icon: 'bg-orange-500/10 border border-orange-500/20',
    title: 'text-orange-400',
    border: 'hover:border-orange-500/30',
    glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.06)]',
  },
  teal: {
    icon: 'bg-[var(--accent3-glow)] border border-accent3/20',
    title: 'text-accent3',
    border: 'hover:border-accent3/30',
    glow: 'hover:shadow-[0_0_20px_rgba(0,217,181,0.06)]',
  },
  pink: {
    icon: 'bg-pink-500/10 border border-pink-500/20',
    title: 'text-pink-400',
    border: 'hover:border-pink-500/30',
    glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.06)]',
  },
};

const SkillsGrid = () => {
  return (
    <section className="py-0 pb-24 lg:pb-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => {
            const styles = accentStyles[skill.accentColor] || accentStyles.blue;
            return (
              <RevealWrapper key={skill.id} delay={i * 80}>
                <div
                  className={`bg-bg-secondary border border-[var(--border)] rounded-xl p-6 ${styles.border} ${styles.glow} transition-all duration-200 hover:-translate-y-0.5 h-full`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${styles.icon} flex items-center justify-center text-xl mb-4`}>
                    {skill.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-base font-bold mb-2 ${styles.title}`}>
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-xs leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <Badge key={tag.label} label={tag.label} color={tag.color} />
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
