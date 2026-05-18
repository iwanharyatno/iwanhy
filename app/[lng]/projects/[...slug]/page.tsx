import { projectSource } from "@/lib/source";
import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/elements/CustomIcons"; // Adjust path if needed
import { getDictionary, Locale } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lng: Locale; slug: string | string[] }>;
}

// Helper to guarantee the slug argument maps to a valid array layout for the Fumadocs engine
function normalizeSlug(slug: string | string[]): string[] {
  return Array.isArray(slug) ? slug : [slug];
}

// Pre-build every project entry route variation at compilation time
export function generateStaticParams() {
  return projectSource.generateParams();
}

// Per-project localized SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng, slug } = await params;
  const slugArray = normalizeSlug(slug);
  const page = projectSource.getPage(slugArray, lng);
  if (!page) return {};

  return {
    title: `${page.data.title} — Iwan Haryatno`,
    description: page.data.summary,
  };
}

export default async function ProjectPostPage({ params }: Props) {
  const { lng, slug } = await params;
  const slugArray = normalizeSlug(slug);

  // 1. Concurrent server-side retrieval of localization configurations and MDX source tracks
  const dict = await getDictionary(lng);
  const page = projectSource.getPage(slugArray, lng);

  if (!page) notFound();

  const MDX = page.data.body;
  const components = useMDXComponents({});

  // 2. Dynamic multi-regional date configuration formatter
  const formatDate = (dateString: string) => {
    const localeString = lng === 'id' ? 'id-ID' : 'en-US';
    return new Date(dateString).toLocaleDateString(localeString, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Subtle Ambient Background Glows */}
      <div className="glow-cyan top-[-10%] right-[-20%] opacity-10 pointer-events-none"></div>

      <main className="container-portfolio relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Navigation Button */}
          <div className="mb-12 animate-fade-up">
            <Link
              href={`/${lng}/projects`}
              className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent-cyan transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {dict.projectPost.backToProjects}
            </Link>
          </div>

          {/* Project Documentation Header Section */}
          <header
            className="mb-12 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {/* Project Tech Stack Badges */}
            {page.data.techStack && page.data.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {page.data.techStack.map((tech: string) => (
                  <span key={tech} className="badge bg-void">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Document Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {page.data.title}
            </h1>

            {/* Project Summary Lead In */}
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {page.data.summary}
            </p>

            {/* Project Metadata Fields & Production External Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-(--color-border)">
              <div className="flex items-center gap-2 text-sm font-mono text-muted">
                <Calendar className="w-4 h-4" />
                <time dateTime={page.data.date}>
                  {formatDate(page.data.date)}
                </time>
              </div>

              {/* Action Buttons: Renders dynamically only if URLs are provided in the current MDX file */}
              {(page.data.repoUrl || page.data.liveUrl) && (
                <div className="flex items-center gap-3">
                  {page.data.repoUrl && (
                    <a
                      href={page.data.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="key-cap text-xs font-mono h-8 px-3 gap-1.5 hover:text-white transition-all text-secondary"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      {dict.projectPost.viewRepository}
                    </a>
                  )}
                  {page.data.liveUrl && (
                    <a
                      href={page.data.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="key-cap text-xs font-mono h-8 px-3 gap-1.5 hover:text-accent-cyan transition-all text-secondary"
                    >
                      {dict.projectPost.liveDemo}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Core MDX Architectural Content Body */}
          <article
            className="animate-fade-up relative z-10"
            style={{ animationDelay: "200ms" }}
          >
            <div className="prose-custom">
              <MDX components={components} />
            </div>
          </article>
          
        </div>
      </main>
    </div>
  );
}