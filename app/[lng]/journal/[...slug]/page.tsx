import { blogPostSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lng: Locale; slug: string | string[] }>;
}

function normalizeSlug(slug: string | string[]): string[] {
  return Array.isArray(slug) ? slug : [slug];
}

export function generateStaticParams() {
  return blogPostSource.generateParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng, slug } = await params;
  const page = blogPostSource.getPage(normalizeSlug(slug), lng);
  if (!page) return {};

  return {
    title: `${page.data.title} | Iwan Haryatno`,
    description: page.data.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { lng, slug } = await params;
  const dict = await getDictionary(lng);
  const page = blogPostSource.getPage(normalizeSlug(slug), lng);

  if (!page) notFound();

  const MDX = page.data.body;

  const formatDate = (dateString: string) => {
    const localeString = lng === "id" ? "id-ID" : "en-US";
    return new Date(dateString).toLocaleDateString(localeString, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <main className="container-portfolio">
        <div className="mx-auto max-w-4xl panel p-8">
          <Link
            href={`/${lng}/journal`}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-accent"
          >
            <span aria-hidden="true">←</span>
            {dict.journalPost.backToJournal}
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            {page.data.tags && page.data.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {page.data.tags.map((tag) => (
                  <li key={tag} className="badge">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 className="mt-4 text-3xl font-bold leading-tight text-primary md:text-5xl">
              {page.data.title}
            </h1>

            <p className="mt-4 text-xl text-secondary">{page.data.summary}</p>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span>{dict.journalPost.published}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={page.data.date}>{formatDate(page.data.date)}</time>
            </div>
          </header>

          <article className="mt-10 max-w-3xl mx-auto">
            <div className="prose-custom">
              <MDX components={mdxComponents} />
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
