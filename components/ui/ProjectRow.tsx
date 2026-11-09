import Image from "next/image";
import Link from "next/link";

interface ProjectData {
  title: string;
  summary: string;
  thumbnail?: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
}

interface ProjectLike {
  url: string;
  data: ProjectData;
}

interface ProjectRowProps {
  project: ProjectLike;
  index: number;
  openProject: string;
  repository: string;
  liveDemo: string;
  headingLevel?: "h2" | "h3";
}

export function ProjectRow({
  project,
  index,
  openProject,
  repository,
  liveDemo,
  headingLevel = "h3",
}: ProjectRowProps) {
  const reverse = index % 2 === 1;
  const Heading = headingLevel;

  return (
    <article className="grid grid-cols-1 gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:items-center md:gap-10">
      <div className={`md:col-span-6 ${reverse ? "md:order-2" : ""}`}>
        <div className="panel overflow-hidden">
          {project.data.thumbnail ? (
            <Image
              src={project.data.thumbnail}
              alt={project.data.title}
              width={800}
              height={450}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          ) : (
            <div className="schematic-frame flex aspect-video items-center justify-center bg-surface">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Fig. {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={`md:col-span-6 ${reverse ? "md:order-1" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-wider text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rule-accent" aria-hidden="true" />
        </div>

        <Heading className="mt-3 text-2xl font-bold text-primary">
          <Link href={project.url} className="hover:text-accent">
            {project.data.title}
          </Link>
        </Heading>

        <p className="mt-3 text-secondary">{project.data.summary}</p>

        {project.data.techStack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.data.techStack.slice(0, 6).map((tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={project.url} className="btn-ghost">
            {openProject}
          </Link>
          {project.data.repoUrl ? (
            <a
              href={project.data.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent"
            >
              {repository}
            </a>
          ) : null}
          {project.data.liveUrl ? (
            <a
              href={project.data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent"
            >
              {liveDemo}
              <span aria-hidden="true"> ↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
