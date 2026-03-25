import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import RevealWrapper from '../ui/RevealWrapper';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../constants';

const FeaturedProjects = () => {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <RevealWrapper>
          <SectionLabel text="Work" className="mb-4" />
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-3">
                Featured Projects
              </h2>
              <p className="text-text-secondary max-w-lg">
                Real applications I've designed, built, and deployed — each one tackling a specific problem with clean code and great UX.
              </p>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-accent text-sm hover:text-accent/80 transition-colors flex-shrink-0 ml-8"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {featured.map((project, i) => (
            <RevealWrapper key={project.id} delay={i * 120}>
              <ProjectCard project={project} />
            </RevealWrapper>
          ))}
        </div>

        {/* Mobile view all */}
        <RevealWrapper delay={200}>
          <div className="flex justify-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-hover)] text-text-primary rounded-lg hover:border-accent hover:text-accent transition-all duration-200 text-sm"
            >
              View All Projects
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hidden md:flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-hover)] text-text-primary rounded-lg hover:border-accent hover:text-accent transition-all duration-200 text-sm"
            >
              View All Projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};

export default FeaturedProjects;
