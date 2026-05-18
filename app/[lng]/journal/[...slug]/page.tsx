import { blogPostSource } from "@/lib/source";
import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowLeft } from "lucide-react";
import { getDictionary, Locale } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lng: Locale; slug: string }>;
}

// Pre-build every post variation at build time
export function generateStaticParams() {
  return blogPostSource.generateParams();
}

// Per-post localized SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng, slug } = await params;
  const page = blogPostSource.getPage([slug], lng);
  if (!page) return {};

  return {
    title: `${page.data.title} — Iwan Haryatno`,
    description: page.data.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { lng, slug } = await params;
  
  // 1. Fetch translations and MDX content streams concurrently on the server
  const dict = await getDictionary(lng);
  const page = blogPostSource.getPage([slug], lng);
  
  if (!page) notFound();

  const MDX = page.data.body;
  const components = useMDXComponents({});

  // 2. Format ISO dates cleanly according to current language standards
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
      {/* Subtle Ambient Glows - kept dim to maintain readability */}
      <div className="glow-blue top-[-10%] right-[-20%] opacity-10 pointer-events-none"></div>

      <main className="container-portfolio relative z-10">
        {/* Constrain width for optimal reading line length */}
        <div className="max-w-3xl mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-12 animate-fade-up">
            <Link
              href={`/${lng}/journal`}
              className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent-cyan transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {dict.journalPost.backToJournal}
            </Link>
          </div>

          {/* Post Header */}
          <header
            className="mb-12 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {/* Localized Tags */}
            {page.data.tags && page.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {page.data.tags.map((tag) => (
                  <span key={tag} className="badge bg-void">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {page.data.title}
            </h1>

            {/* Summary / Lead Paragraph */}
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {page.data.summary}
            </p>

            {/* Meta Data */}
            <div className="flex items-center justify-between pb-8 border-b border-(--color-border)">
              <div className="flex items-center gap-2 text-sm font-mono text-muted">
                <Calendar className="w-4 h-4" />
                <time dateTime={page.data.date}>
                  {formatDate(page.data.date)}
                </time>
              </div>
              <div className="text-sm font-mono text-muted">SYS.LOG // IHY</div>
            </div>
          </header>

          {/* MDX Body Layout */}
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