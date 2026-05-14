import React from 'react';
import { LayoutTemplate, Server, Box, BrainCircuit } from 'lucide-react';

// --- Skill Data Structure ---
const skillCategories = [
  {
    title: "Frontend Architecture",
    icon: <LayoutTemplate className="w-5 h-5 text-accent-cyan" />,
    description: "Building responsive, highly interactive client-side applications.",
    skills: ["React", "Next.js", "Svelte", "Flutter", "Tailwind CSS"]
  },
  {
    title: "Backend & Systems",
    icon: <Server className="w-5 h-5 text-accent-blue" />,
    description: "Architecting robust APIs, microservices, and database schemas.",
    skills: ["Laravel", "Node.js", "C# / WinForms", "Kotlin", "PostgreSQL", "BullMQ"]
  },
  {
    title: "DevOps & Infrastructure",
    icon: <Box className="w-5 h-5 text-purple-400" />,
    description: "Containerization, cloud deployments, and continuous integration.",
    skills: ["Docker", "docker-compose", "AWS", "Cloudflare R2", "Modal.com"]
  },
  {
    title: "AI & Machine Learning",
    icon: <BrainCircuit className="w-5 h-5 text-green-400" />,
    description: "Implementing local inference, vision models, and LLM integrations.",
    skills: ["YOLOv8", "EfficientNet", "Hybrid Models", "Grad-CAM", "vLLM", "Prompt Engineering"]
  }
];

export default function PortfolioSkills() {
  return (
    <section id="techs" className="relative py-24 border-t border-(--color-border) overflow-hidden">
      
      {/* Background Ambient Glow (Subtle) */}
      <div className="glow-blue top-[20%] left-[-20%] opacity-50 pointer-events-none"></div>
      
      <div className="container-portfolio relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-cyan uppercase">
            Technical Arsenal
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            Tools & <span className="text-gradient">Technologies</span>
          </h3>
          <p className="text-secondary max-w-2xl mx-auto">
            A comprehensive overview of the frameworks, languages, and architectures I leverage to bring digital solutions from concept to production.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="glass p-6 flex flex-col h-full animate-fade-up group cursor-default"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-surface border border-(--color-border) group-hover:border-accent-cyan transition-colors duration-300">
                  {category.icon}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {category.title}
                </h4>
              </div>
              
              {/* Card Description */}
              <p className="text-sm text-muted mb-6 grow">
                {category.description}
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
          ))}
        </div>

      </div>
    </section>
  );
}