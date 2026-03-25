import React from 'react';
import SectionLabel from '../ui/SectionLabel';
import RevealWrapper from '../ui/RevealWrapper';

const overviewCols = [
  {
    icon: '💻',
    title: 'Frontend',
    color: 'blue',
    items: ['React', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: '⚙️',
    title: 'Backend & DB',
    color: 'purple',
    items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    icon: '🔤',
    title: 'Languages',
    color: 'orange',
    items: ['C++', 'Java', 'Python', 'Git/GitHub'],
  },
];

const colorMap = {
  blue: {
    border: 'hover:border-accent/40',
    bg: 'hover:bg-[var(--accent-glow)]',
    icon: 'bg-[var(--accent-glow)] border border-accent/20',
    title: 'text-accent',
    dot: 'bg-accent',
  },
  purple: {
    border: 'hover:border-accent2/40',
    bg: 'hover:bg-[var(--accent2-glow)]',
    icon: 'bg-[var(--accent2-glow)] border border-accent2/20',
    title: 'text-accent2',
    dot: 'bg-accent2',
  },
  orange: {
    border: 'hover:border-orange-500/40',
    bg: 'hover:bg-orange-500/5',
    icon: 'bg-orange-500/10 border border-orange-500/20',
    title: 'text-orange-400',
    dot: 'bg-orange-400',
  },
};

const SkillsOverview = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <RevealWrapper>
          <SectionLabel text="Skills" className="mb-4" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            What I work with
          </h2>
          <p className="text-text-secondary max-w-xl mb-12">
            A snapshot of my core technical areas — from frontend interfaces to backend systems and the languages that power them.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {overviewCols.map((col, i) => {
            const c = colorMap[col.color];
            return (
              <RevealWrapper key={col.title} delay={i * 100}>
                <div
                  className={`group bg-bg-secondary border border-[var(--border)] rounded-xl p-6 ${c.border} ${c.bg} transition-all duration-200 hover:-translate-y-1`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${c.icon} flex items-center justify-center text-xl mb-4`}>
                    {col.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-lg font-bold mb-4 ${c.title}`}>{col.title}</h3>

                  {/* Items */}
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-text-secondary text-sm">
                        <span className={`w-1 h-1 rounded-full ${c.dot} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
