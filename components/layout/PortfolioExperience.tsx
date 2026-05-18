import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/get-dictionary';

type ExperienceKey = 'suar' | 'promokna' | 'intermedia_head' | 'zt_corpora' | 'intermedia_staff' | 'bakaran';

interface ExperienceConfig {
  id: ExperienceKey;
  technologies: string[];
}

// Map unchanging functional metadata separately from translations
const experienceConfigurations: ExperienceConfig[] = [
  {
    id: "suar",
    technologies: ["Ghost CMS", "Node.js", "Handlebars", "Theme Dev", "Agile"]
  },
  {
    id: "promokna",
    technologies: ["Backend Architecture", "Event Systems", "Cloud Hosting", "Startup Tech"]
  },
  {
    id: "intermedia_head",
    technologies: ["AWS Cloud", "Team Leadership", "Project Management", "Technical Training"]
  },
  {
    id: "zt_corpora",
    technologies: ["API Integration", "QR Logistics", "Logistics Systems", "Debugging"]
  },
  {
    id: "intermedia_staff",
    technologies: ["Full-Stack LMS", "Automation Systems", "Process Optimization", "Git Flow"]
  },
  {
    id: "bakaran",
    technologies: ["Frontend Infrastructure", "Golang Basics", "Technical Writing", "Git Control"]
  }
];

export default async function PortfolioExperience({
  lng
}: {
  lng: Locale
}) {
  const dict = await getDictionary(lng);

  return (
    <section id="career" className="relative py-24 border-t border-(--color-border) overflow-hidden">

      {/* Ambient Glows */}
      <div className="glow-cyan top-[40%] right-[-10%] opacity-30 pointer-events-none"></div>

      <div className="container-portfolio relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-blue uppercase">
            {dict.experience.subtitle}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {dict.experience.titleMain}<span className="text-gradient">{dict.experience.titleGradient}</span>
          </h3>
          <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
            {dict.experience.description}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* THE NEON PATH */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-(--color-border) md:-translate-x-1/2 overflow-hidden">
            <div className="absolute left-0 w-full h-[30%] bg-linear-to-b from-transparent via-accent-cyan to-transparent animate-flow shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experienceConfigurations.map((config, index) => {
              const isEven = index % 2 === 0;
              const translation = dict.experience.items[config.id];

              return (
                <div key={config.id} className="relative flex flex-col md:flex-row items-start animate-fade-up group" style={{ animationDelay: `${index * 120}ms` }}>

                  {/* Neon Node Dot */}
                  <div className="absolute left-7 md:left-1/2 w-4 h-4 rounded-full border-2 border-accent-cyan bg-void transform -translate-x-1/2 mt-[1.6rem] z-10 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:bg-accent-cyan"></div>

                  {/* Desktop Layout Helper */}
                  {isEven ? (
                    <div className="hidden md:block md:w-1/2 pr-12 text-right" />
                  ) : null}

                  {/* Content Card */}
                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:-translate-y-1">

                      <div className="absolute inset-0 bg-linear-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="relative z-10">
                        {/* Role Title */}
                        <h4 className={`text-2xl font-bold text-white mb-4 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {translation.role}
                        </h4>

                        {/* Date & Company Header */}
                        <div className={`flex text-xs flex-col sm:items-center gap-3 mb-4 font-mono text-muted ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                          <div className={`flex items-center gap-1.5 text-accent-cyan ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold">{translation.company}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <Calendar className="w-4 h-4 text-accent-blue" />
                            <span>{translation.date}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={`text-secondary mb-6 leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {translation.description}
                        </p>

                        {/* Tech Stack Badges */}
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {config.technologies.map((tech) => (
                            <span key={tech} className="badge">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Desktop Layout Helper */}
                  {!isEven ? (
                    <div className="hidden md:block md:w-1/2 pl-12" />
                  ) : null}

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}