import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import RevealWrapper from '../ui/RevealWrapper';
import { PROJECTS } from '../../constants';

const categories = ['All', 'API', 'Tool', 'Frontend', 'Social'];

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Filter bar */}
      <RevealWrapper>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-accent text-white shadow-[0_4px_12px_rgba(79,142,247,0.3)]'
                  : 'border border-[var(--border-hover)] text-text-secondary hover:text-text-primary hover:border-accent/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-text-muted text-sm mb-8">
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </p>
      </RevealWrapper>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <RevealWrapper key={project.id} delay={i * 100}>
            <ProjectCard project={project} />
          </RevealWrapper>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
