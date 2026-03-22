// Component to display individual project cards
function ProjectCard({ project }) {
  const title = project?.title || 'Untitled Project';
  const description = project?.description || 'No description provided yet.';
  const techStack = Array.isArray(project?.techStack) ? project.techStack : [];
  const githubLink = project?.githubLink || '#';
  const liveLink = project?.liveLink;
  const features = Array.isArray(project?.features) ? project.features : [];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900/80">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity group-hover:opacity-20 bg-gradient-to-br from-cyan-500 to-blue-500" />

      {/* Project Image - Placeholder with gradient */}
      {project?.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-4xl text-slate-700 opacity-30">→</div>
        </div>
      )}

      {/* Project Content */}
      <div className="p-8">
        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-slate-400">{description}</p>

        {/* Tech Stack - display as tags */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/20"
              >
                {tech}
              </span>
            ))}

            {techStack.length === 0 && (
              <span className="inline-block rounded-full border border-slate-600 bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                Tech stack coming soon
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        {features.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
              Key Features
            </div>
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-cyan-400 flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-6 border-t border-slate-800">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-center text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700/50 hover:text-white"
          >
            View Code
          </a>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-center text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
