import React from 'react';
import { LayoutTemplate, Server, Box, BrainCircuit } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/get-dictionary';

type CategoryKey = 'frontend' | 'backend' | 'devops' | 'ai';

interface SkillConfig {
  id: CategoryKey;
  icon: React.ReactNode;
  skills: string[];
}

const skillConfigurations: SkillConfig[] = [
  {
    id: "frontend",
    icon: <LayoutTemplate className="w-5 h-5 text-accent-cyan" />,
    skills: ["React", "Next.js", "Svelte", "Flutter", "Tailwind CSS"]
  },
  {
    id: "backend",
    icon: <Server className="w-5 h-5 text-accent-blue" />,
    skills: ["Laravel", "Node.js", "C# / WinForms", "Kotlin", "PostgreSQL", "BullMQ"]
  },
  {
    id: "devops",
    icon: <Box className="w-5 h-5 text-purple-400" />,
    skills: ["Docker", "docker-compose", "AWS", "Cloudflare R2", "Modal.com"]
  },
  {
    id: "ai",
    icon: <BrainCircuit className="w-5 h-5 text-green-400" />,
    skills: ["YOLOv8", "EfficientNet", "Hybrid Models", "Grad-CAM", "vLLM", "Prompt Engineering"]
  }
];

export default async function PortfolioSkills({
  lng
}: {
  lng: Locale
}) {
  const dict = await getDictionary(lng);

  return (
    <section id="techs" className="relative py-24 border-t border-(--color-border) overflow-hidden">
      
      {/* Background Ambient Glow (Subtle) */}
      <div className="glow-blue top-[20%] left-[-20%] opacity-50 pointer-events-none"></div>
      
      <div className="container-portfolio relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-cyan uppercase">
            {dict.skills.subtitle}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {dict.skills.titleMain}<span className="text-gradient">{dict.skills.titleGradient}</span>
          </h3>
          <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
            {dict.skills.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillConfigurations.map((category, index) => {
            // Target the dynamic translation matching this category ID
            const translation = dict.skills.categories[category.id];

            return (
              <div 
                key={category.id}
                className="glass p-6 flex flex-col h-full animate-fade-up group cursor-default"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-surface border border-(--color-border) group-hover:border-accent-cyan transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {translation.title}
                  </h4>
                </div>
                
                {/* Card Description */}
                <p className="text-sm text-muted mb-6 grow leading-relaxed">
                  {translation.description}
                </p>

                {/* Badges Container */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}