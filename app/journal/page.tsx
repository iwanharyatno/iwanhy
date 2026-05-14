import { blogPostSource } from '@/lib/source'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Iwan Haryatno',
  description: 'Articles on web development, software architecture, and the things I build.',
}

export default function BlogPage() {
  const posts = blogPostSource
    .getPages()
    .filter(p => p.data.published)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  // Helper to format ISO dates (e.g., "2026-05-01" -> "May 1, 2026")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="glow-cyan top-0 right-[-10%] opacity-30 pointer-events-none animate-pulse-glow"></div>
      <div className="glow-blue bottom-[20%] left-[-10%] opacity-20 pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <main className="container-portfolio relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-start space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-blue uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Journal
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Technical <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-secondary max-w-2xl leading-relaxed text-lg">
            Thoughts on software architecture, AI model optimization, and my findings from transitioning systems into production.
          </p>
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.url}
                className="glass p-8 flex flex-col relative group animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Inner Gradient Reveal on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-(--radius-card) pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Meta: Date & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2 text-sm font-mono text-muted">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.data.date}>{formatDate(post.data.date)}</time>
                    </div>
                    
                    {post.data.tags && post.data.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.data.tags.map(tag => (
                          <span key={tag} className="badge text-[10px]! py-0.5! px-2! bg-void">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={post.url} className="block group/title mb-3">
                    <h2 className="text-2xl font-bold text-white group-hover/title:text-accent-cyan transition-colors leading-tight">
                      {post.data.title}
                    </h2>
                  </Link>

                  {/* Summary */}
                  <p className="text-secondary leading-relaxed mb-8 grow">
                    {post.data.summary}
                  </p>

                  {/* Read More Action */}
                  <Link
                    href={post.url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan mt-auto w-fit group/btn"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State Fallback */
          <div className="glass p-16 text-center animate-fade-up flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-muted mb-4" />
            <p className="text-secondary text-lg">No public notes available yet. Check back soon.</p>
          </div>
        )}
      </main>
    </div>
  )
}