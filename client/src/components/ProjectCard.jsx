// Component to display individual project cards
function ProjectCard({ project }) {
  return (
    <div className="neo-card group animate-fade-in relative overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Project Image */}
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-slate-100">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-slate-400">{project.description}</p>

        {/* Tech Stack - display as tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-block rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-future flex-1 rounded-md px-4 py-2 text-center text-sm font-medium text-slate-200"
          >
            GitHub
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md border border-purple-300/50 bg-purple-400/10 px-4 py-2 text-center text-sm font-medium text-purple-200 transition-all hover:shadow-[0_0_26px_rgba(168,85,247,0.3)]"
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
