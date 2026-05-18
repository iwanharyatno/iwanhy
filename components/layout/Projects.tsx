import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
// Import your Fumadocs source loader
import { projectSource } from '@/lib/source'; 
import { GithubIcon } from '../elements/CustomIcons';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/get-dictionary';

export default async function PortfolioProjects({
  lng
}: {
  lng: Locale
}) {
  // 1. Fetch dictionaries asynchronously on the server
  const dict = await getDictionary(lng);

  // 2. Query Fumadocs filtered precisely by the active language path parameter
  const projects = projectSource.getPages(lng)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden" id="projects">
      
      {/* Ambient Glows */}
      <div className="glow-cyan top-0 right-[-5%] opacity-30 pointer-events-none animate-pulse-glow"></div>
      <div className="glow-blue bottom-[20%] left-[-10%] opacity-20 pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <main className="container-portfolio relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-cyan uppercase flex items-center gap-2">
            <FolderGit2 className="w-4 h-4" />
            {dict.projects.subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {dict.projects.titleMain}<span className="text-gradient">{dict.projects.titleGradient}</span>
          </h1>
          <p className="text-secondary max-w-2xl leading-relaxed text-lg">
            {dict.projects.description}
          </p>
        </div>

        {/* 3-Column Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article 
                key={project.url}
                className="glass flex flex-col overflow-hidden group animate-fade-up h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail Header */}
                <Link href={project.url} className="relative aspect-video overflow-hidden block border-b border-(--color-border)">
                  <div className="absolute inset-0 bg-void/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={project.data.thumbnail} 
                    alt={project.data.title}
                    className="w-full h-full object-cover grayscale-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </Link>

                {/* Content Body */}
                <div className="p-6 flex flex-col grow relative">
                  
                  {/* Subtle inner gradient reveal on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.data.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="badge text-[10px]! py-1! px-2!">
                          {tech}
                        </span>
                      ))}
                      {project.data.techStack.length > 4 && (
                        <span className="badge text-[10px]! py-1! px-2! text-muted!">
                          +{project.data.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Title & Summary */}
                    <Link href={project.url} className="group-hover:text-accent-cyan transition-colors">
                      <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                        {project.data.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-secondary mb-6 grow line-clamp-3">
                      {project.data.summary}
                    </p>

                    {/* Footer Links */}
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
                        {dict.projects.readDocs}
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
            <p className="text-secondary text-lg">{dict.projects.emptyState}</p>
          </div>
        )}

      </main>
    </div>
  );
}