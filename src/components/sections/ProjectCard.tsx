import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import Badge from '../ui/Badge';

const ProjectCard = ({ project }) => {
  const isFeatured = Boolean(project.featured);
  const badgeColor = project.category === 'API'
    ? 'teal'
    : project.category === 'Tool'
      ? 'orange'
      : project.category === 'Social'
        ? 'pink'
        : 'blue';

  return (
    <div className="group relative bg-bg-secondary border border-[var(--border)] rounded-xl p-6 hover:-translate-y-1 hover:border-accent/40 hover:bg-bg-tertiary hover:shadow-[0_0_0_1px_rgba(79,142,247,0.18),0_22px_50px_rgba(79,142,247,0.18),0_22px_50px_rgba(0,0,0,0.36)] hover:brightness-105 transition-all duration-150 ease-out flex flex-col h-full overflow-hidden">
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-text-muted">{project.num}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {isFeatured ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/15 px-2.5 py-1 font-mono text-[10px] text-blue-200">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          ) : null}
          <Badge label={project.category} color={badgeColor} />
          {project.status ? <Badge label={project.status} color="orange" /> : null}
        </div>
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
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
          >
            Live Demo
            <ExternalLink size={13} />
          </a>
        ) : (
          <span className="inline-flex items-center rounded-md border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs font-medium font-mono text-orange-400">
            {project.status || 'In Progress'}
          </span>
        )}
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
