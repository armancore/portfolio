import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Badge from '../ui/Badge';

const ProjectCard = ({ project }) => {
  const badgeColor = project.category === 'API'
    ? 'teal'
    : project.category === 'Tool'
      ? 'orange'
      : project.category === 'Social'
        ? 'pink'
        : 'blue';

  return (
    <div className="group relative bg-bg-secondary border border-[var(--border)] rounded-xl p-6 hover:border-[var(--border-hover)] hover:bg-bg-tertiary transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-text-muted">{project.num}</span>
        <Badge label={project.category} color={badgeColor} />
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <Badge key={tag.label} label={tag.label} color={tag.color} />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
        >
          Live Demo
          <ExternalLink size={13} />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-text-muted text-xs hover:text-text-secondary transition-colors"
        >
          <Github size={13} />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
