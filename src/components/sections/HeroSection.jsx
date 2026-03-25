import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Facebook, Instagram } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import RevealWrapper from '../ui/RevealWrapper';
import HeroCard from './HeroCard';
import { PERSONAL_INFO } from '../../constants';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(88,166,255,0.14) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div>
            {/* Availability badge */}
            <RevealWrapper delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent2-glow)] border border-accent2/20 text-accent2 text-xs font-medium tracking-[0.08em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent3 pulse-dot" />
                Open to internship &amp; junior roles
              </div>
            </RevealWrapper>

            {/* H1 */}
            <RevealWrapper delay={80}>
              <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-[-0.04em] text-text-primary mb-4 leading-none">
                {PERSONAL_INFO.name}
              </h1>
            </RevealWrapper>

            {/* H2 */}
            <RevealWrapper delay={160}>
              <h2 className="text-text-secondary text-xl lg:text-2xl font-medium mb-6 leading-snug max-w-xl">
                {PERSONAL_INFO.role}
              </h2>
            </RevealWrapper>

            {/* Bio */}
            <RevealWrapper delay={240}>
              <p className="text-text-secondary leading-relaxed mb-8 max-w-lg text-[1.02rem]">
                {PERSONAL_INFO.bio[0]}
              </p>
            </RevealWrapper>

            {/* CTA buttons */}
            <RevealWrapper delay={320}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Button as={Link} to="/projects" variant="primary" size="lg">
                  View My Projects
                  <ArrowRight size={16} />
                </Button>
                <Button as={Link} to="/contact" variant="outline" size="lg">
                  Contact Me
                </Button>
              </div>
            </RevealWrapper>

            {/* Social links */}
            <RevealWrapper delay={400}>
              <div className="flex items-center gap-4">
                <span className="text-text-muted text-xs uppercase tracking-[0.2em] font-mono">Find me on</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Arman-techiee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-bg-tertiary/80 border border-[var(--border)] flex items-center justify-center text-text-secondary hover:text-accent2 hover:border-accent2/40 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/techiee.arman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-bg-tertiary/80 border border-[var(--border)] flex items-center justify-center text-text-secondary hover:text-accent2 hover:border-accent2/40 transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/techiee.arman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-bg-tertiary/80 border border-[var(--border)] flex items-center justify-center text-text-secondary hover:text-accent2 hover:border-accent2/40 transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
              </div>
            </RevealWrapper>
          </div>

          {/* RIGHT COLUMN — Hero Card */}
          <RevealWrapper delay={200} className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">
              <HeroCard />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
