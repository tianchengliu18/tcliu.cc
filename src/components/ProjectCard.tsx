import type { ResearchProject } from "@/content/research/projects";

interface Props {
  project: ResearchProject;
  locale: string;
}

export default function ProjectCard({ project, locale }: Props) {
  const title = locale === "zh" ? project.titleZh : project.titleEn;
  const description =
    locale === "zh" ? project.descriptionZh : project.descriptionEn;

  return (
    <div className="group border border-border-light rounded-lg p-5 bg-bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Placeholder image area */}
      <div className="w-full h-32 rounded-md bg-bg-secondary mb-4 flex items-center justify-center">
        <span className="text-text-tertiary text-[13px]">Image</span>
      </div>

      <h3 className="font-body text-base font-semibold text-text-primary mb-1.5 group-hover:text-accent transition-colors">
        {title}
      </h3>

      {project.venue && (
        <p className="text-[13px] text-accent-secondary font-medium mb-2">
          {project.venue}
        </p>
      )}

      <p className="text-base text-text-secondary leading-relaxed mb-3">
        {description}
      </p>

      {project.links.length > 0 && (
        <div className="flex gap-2">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] px-2.5 py-1 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
