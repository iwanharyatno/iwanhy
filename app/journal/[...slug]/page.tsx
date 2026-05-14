import { blogPostSource } from '@/lib/source'
import { useMDXComponents } from '@/mdx-components'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar, ArrowLeft } from 'lucide-react'

// Pre-build every post as a static page at build time — zero runtime functions
export function generateStaticParams() {
  return blogPostSource.generateParams()
}

// Per-post SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = blogPostSource.getPage([slug])
  if (!page) return {}

  return {
    title: `${page.data.title} — Iwan Haryatno`,
    description: page.data.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>   // Next.js 15+ params is a Promise
}) {
  const { slug } = await params
  const page = blogPostSource.getPage([slug])
  if (!page) notFound()

  const MDX = page.data.body
  const components = useMDXComponents({})

  // Helper to format ISO dates cleanly
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Subtle Ambient Glows - kept very dim to avoid distracting the reader */}
      <div className="glow-blue top-[-10%] right-[-20%] opacity-10 pointer-events-none"></div>

      <main className="container-portfolio relative z-10">
        
        {/* Constrain width for optimal reading experience (approx 65-75 chars per line) */}
        <div className="max-w-3xl mx-auto">
          
          {/* Back Navigation */}
          <div className="mb-12 animate-fade-up">
            <Link 
              href="/journal" 
              className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent-cyan transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
            
            {/* Tags */}
            {page.data.tags && page.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {page.data.tags.map(tag => (
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
            
            {/* Meta Data (Date & Author/System string) */}
            <div className="flex items-center justify-between pb-8 border-b border-(--color-border)">
              <div className="flex items-center gap-2 text-sm font-mono text-muted">
                <Calendar className="w-4 h-4" />
                <time dateTime={page.data.date}>{formatDate(page.data.date)}</time>
              </div>
              <div className="text-sm font-mono text-muted">
                SYS.LOG // IHY
              </div>
            </div>
          </header>

          {/* MDX Body — Elements styled via mdx-components.tsx and base layers */}
          <article className="animate-fade-up relative z-10" style={{ animationDelay: '200ms' }}>
            {/* 
              Note: The styling of h1, h2, p, code, etc. inside this MDX component 
              is governed by your globals.css @layer base and mdx-components.tsx. 
            */}
            <div className="prose-custom">
              <MDX components={components} />
            </div>
          </article>

        </div>
      </main>
    </div>
  )
}