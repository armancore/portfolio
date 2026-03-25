import React from 'react';
import ProfilePhoto from '../ui/ProfilePhoto';
import Badge from '../ui/Badge';
import { PERSONAL_INFO, PHOTO_MODE } from '../../constants';

const skillChips = ['MERN Stack', 'React', 'Tailwind', 'C++', 'Java', 'Python', 'Git'];

const stats = [
  { value: '4', label: 'Projects' },
  { value: '3+', label: 'Languages' },
  { value: '↗', label: 'Available', accent: true },
];

const HeroCard = () => {
  return (
    <div className="relative">
      {/* Radial glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl blur-3xl -z-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.12) 0%, transparent 70%)' }}
      />

      <div className="tech-panel rounded-2xl p-8 hover:border-[var(--border-hover)] transition-all duration-300">
        {/* Profile Photo */}
        <div className="flex justify-center mb-5">
          <ProfilePhoto mode={PHOTO_MODE} size="md" />
        </div>

        {/* Name & Role */}
        <div className="text-center mb-5">
          <h3 className="font-display text-lg font-bold tracking-[0.04em] text-text-primary">{PERSONAL_INFO.name}</h3>
          <p className="text-text-secondary text-sm mt-1">{PERSONAL_INFO.role}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-around mb-5 py-4 border-y border-[var(--border)]">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`font-display text-xl font-bold tracking-[0.04em] ${stat.accent ? 'text-accent2' : 'text-text-primary'}`}>
                {stat.value}
              </div>
              <div className="text-text-muted text-[11px] mt-0.5 uppercase tracking-[0.14em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {skillChips.map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 rounded-md bg-bg-tertiary/80 border border-[var(--border)] text-text-secondary text-xs font-mono"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
