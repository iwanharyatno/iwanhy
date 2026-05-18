import { blogPostSource } from '@/lib/source'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BookOpen, Calendar, ArrowRight } from 'lucide-react'
import { getDictionary, Locale } from '@/lib/get-dictionary'

interface Props {
  params: Promise<{ lng: Locale }>;
}

// Dynamically generate localized SEO metadata headers 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return {
    title: dict.journalPage.metaTitle,
    description: dict.journalPage.metaDescription,
  };
}

export default async function BlogPage({ params }: Props) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  // Filter content streams specifically mapping to the active route locale context
  const posts = blogPostSource
    .getPages(lng)
    .filter(p => p.data.published)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  // Format dates smoothly based on the viewer's language environment
  const formatDate = (dateString: string) => {
    const formatLocale = lng === 'id' ? 'id-ID' : 'en-US';
    return new Date(dateString).toLocaleDateString(formatLocale, {
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
            {dict.journalPage.subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {dict.journalPage.titleMain}<span className="text-gradient">{dict.journalPage.titleGradient}</span>
          </h1>
          <p className="text-secondary max-w-2xl leading-relaxed text-lg">
            {dict.journalPage.description}
          </p>
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.url}
                className="glass p-8 flex flex-col relative group animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] h-full"
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
                    {dict.journalPage.readMore}
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
            <p className="text-secondary text-lg">{dict.journalPage.emptyState}</p>
          </div>
        )}
      </main>
    </div>
  )
}