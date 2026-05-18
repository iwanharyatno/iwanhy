import { projectSource } from "@/lib/source";
import Link from "next/link";
import type { Metadata } from "next";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../../../components/elements/CustomIcons"; // Verified path
import { getDictionary, Locale } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lng: Locale }>;
}

// Generate dynamic localized SEO headers at build time
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return {
    title: dict.projectsPage.metaTitle,
    description: dict.projectsPage.metaDescription,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  // Fetch only the projects that match the current language context track via Fumadocs
  const allProjects = projectSource
    .getPages(lng)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="glow-cyan top-0 right-[-5%] opacity-30 pointer-events-none animate-pulse-glow"></div>
      <div
        className="glow-blue bottom-[20%] left-[-10%] opacity-20 pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <main className="container-portfolio relative z-10">
        {/* Page Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-cyan uppercase flex items-center gap-2">
            <FolderGit2 className="w-4 h-4" />
            {dict.projectsPage.subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {dict.projectsPage.titleMain}<span className="text-gradient">{dict.projectsPage.titleGradient}</span>
          </h1>
          <p className="text-secondary max-w-2xl leading-relaxed text-lg">
            {dict.projectsPage.description}
          </p>
        </div>

        {/* Projects Grid (Responsive 1 -> 2 -> 3 columns) */}
        {allProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <article
                key={project.url}
                className="glass group flex flex-col overflow-hidden animate-fade-up h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail Header */}
                <Link
                  href={project.url}
                  className="relative aspect-video overflow-hidden block border-b border-(--color-border)"
                >
                  {/* Inner void overlay removed on hover */}
                  <div className="absolute inset-0 bg-void/30 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img
                    src={project.data.thumbnail}
                    alt={project.data.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full grayscale-40 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                {/* Content Body */}
                <div className="p-6 flex flex-col grow relative">
                  {/* Subtle inner gradient reveal on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Title & Summary */}
                    <Link
                      href={project.url}
                      className="group-hover:text-accent-cyan transition-colors"
                    >
                      <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                        {project.data.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-secondary leading-relaxed mb-6 grow line-clamp-3">
                      {project.data.summary}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.data.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="badge text-[10px]! py-1! px-2!"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.data.techStack.length > 4 && (
                        <span className="badge text-[10px]! py-1! px-2! text-muted!">
                          +{project.data.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-(--color-border) mt-auto">
                      <div className="flex items-center gap-3">
                        {project.data.repoUrl && (
                          <a
                            href={project.data.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-white transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon className="w-5 h-5" />
                          </a>
                        )}
                        {project.data.liveUrl && (
                          <a
                            href={project.data.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent-cyan transition-colors"
                            aria-label="Live Demo"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      <Link
                        href={project.url}
                        className="text-sm font-mono text-accent-cyan hover:text-white transition-colors flex items-center gap-1 group/link"
                      >
                        {dict.projectsPage.readDocs}
                        <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State Fallback */
          <div className="glass p-16 text-center animate-fade-up flex flex-col items-center">
            <FolderGit2 className="w-10 h-10 text-muted mb-4" />
            <p className="text-secondary text-lg">
              {dict.projectsPage.emptyState}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}