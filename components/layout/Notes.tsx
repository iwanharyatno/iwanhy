import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { blogPostSource } from '@/lib/source'; 

export default function PortfolioNotes() {
  const recentPosts = blogPostSource.getPages()
    .filter((page) => page.data.published !== false)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="notes" className="relative py-24 border-t border-(--color-border) overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="glow-blue bottom-[10%] left-[-10%] opacity-30 pointer-events-none"></div>

      <div className="container-portfolio relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-blue uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Writings & Research
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            Technical <span className="text-gradient">Notes</span>
          </h3>
          <p className="text-secondary max-w-2xl leading-relaxed">
            Thoughts on software architecture, AI model optimization, and my findings from transitioning systems into production.
          </p>
        </div>

        {/* 2-Column Grid for Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recentPosts.map((post, index) => (
            <article 
              key={post.url}
              className="glass p-8 flex flex-col relative group animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-(--radius-card) pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Meta: Date & Tags */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-mono text-muted">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.data.date}>{formatDate(post.data.date)}</time>
                  </div>
                  
                  {/* Display up to 2 tags */}
                  {post.data.tags && post.data.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.data.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="badge text-[10px]! py-0.5! px-2! bg-void">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <Link href={post.url} className="block group/title mb-3">
                  <h4 className="text-2xl font-bold text-white group-hover/title:text-accent-cyan transition-colors">
                    {post.data.title}
                  </h4>
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

        {/* Empty State Fallback (If no published posts exist yet) */}
        {recentPosts.length === 0 && (
          <div className="glass p-12 text-center animate-fade-up flex flex-col items-center">
            <BookOpen className="w-8 h-8 text-muted mb-4" />
            <p className="text-secondary">No public notes available yet. Check back soon.</p>
          </div>
        )}

        {/* View All CTA */}
        {recentPosts.length > 0 && (
          <div className="mt-16 flex justify-center animate-fade-up" style={{ animationDelay: '600ms' }}>
            <Link href="/journal" className="btn-ghost">
              View All Notes
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}