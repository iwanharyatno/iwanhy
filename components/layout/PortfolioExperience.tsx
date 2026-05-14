import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

// --- Experience Data ---
const experiences = [
  {
    role: "Programming Instructor",
    company: "SMP Al Irsyad",
    date: "May 2026 - Present",
    description: "Developing and delivering comprehensive programming curricula. Transitioning students from visual engines like Godot to structural Python concepts, focusing on I/O, control flow, and functional programming methodologies tailored for beginner-friendly, offline-capable tablet environments.",
    technologies: ["Python", "Godot", "Curriculum Design"]
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Beton Berdikari",
    date: "May 2026",
    description: "Architected the corporate CRM and primary landing page. Integrated specialized LLM chatbot agents ('Pintu Berdikari') with highly customized system prompts optimized for natural, localized customer service interactions and strict formatting constraints.",
    technologies: ["Next.js", "AI Integrations", "LLM Prompting", "CRM Architecture"]
  },
  {
    role: "AI & Mobile Researcher",
    company: "NAILGUARD Project",
    date: "April 2026 - May 2026",
    description: "Engineered an offline-first mobile application for AI-based nail disease screening. Implemented YOLOv8 and Hybrid CapsNet-MobileNet architectures, prioritizing on-device processing and inference speed for local Android hardware without cloud dependencies.",
    technologies: ["Android", "YOLOv8", "Hybrid CapsNet", "Edge AI"]
  },
  {
    role: "Lead Systems Developer",
    company: "Freelance & Contract",
    date: "Jan 2026 - March 2026",
    description: "Spearheaded multiple complex web and desktop solutions. Developed a monolithic Clinic ERP using Laravel and React, built a high-throughput marathon registration platform utilizing Node.js and BullMQ, and bundled a standalone Next.js/Tauri Point of Sale (POS) application.",
    technologies: ["Laravel", "React", "Node.js", "BullMQ", "Tauri"]
  }
];

export default function PortfolioExperience() {
  return (
    <section id="career" className="relative py-24 border-t border-(--color-border) overflow-hidden">

      {/* Ambient Glows */}
      <div className="glow-cyan top-[40%] right-[-10%] opacity-30 pointer-events-none"></div>

      <div className="container-portfolio relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20 animate-fade-up">
          <h2 className="text-sm font-mono tracking-widest text-accent-blue uppercase">
            Career Trajectory
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            Professional <span className="text-gradient">Experience</span>
          </h3>
          <p className="text-secondary max-w-2xl mx-auto">
            A timeline of my professional journey, highlighting key roles, architectural decisions, and the digital systems I've helped build.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* 
            THE NEON PATH 
            Central line for desktop, left-aligned for mobile. 
            Contains the base track and the animated glowing segment.
          */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-(--color-border) md:-translate-x-1/2 overflow-hidden">
            {/* The animated pulsing flow line */}
            <div className="absolute left-0 w-full h-[30%] bg-linear-to-b from-transparent via-accent-cyan to-transparent animate-flow shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start animate-fade-up group" style={{ animationDelay: `${index * 150}ms` }}>
                  
                  {/* Neon Node Dot */}
                  <div className="absolute left -7 md:left-1/2 w-4 h-4 rounded-full border-2 border-accent-cyan bg-void transform -translate-x-1/2 mt-[1.6rem] z-10 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:bg-accent-cyan"></div>

                  {/* Desktop Layout Helper: Empty space for alternating sides */}
                  {isEven ? (
                    <div className="hidden md:block md:w-1/2 pr-12 text-right">
                       {/* This keeps the layout structured but content goes on the left */}
                    </div>
                  ) : null}

                  {/* Content Card */}
                  <div className={`w-full pl-16 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:-translate-y-1">
                      
                      {/* Subtle gradient overlay inside card on hover */}
                      <div className="absolute inset-0 bg-linear-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        {/* Date & Company Header */}
                        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 mb-4 text-sm font-mono text-muted ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div className={`flex items-center gap-1.5 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <Calendar className="w-4 h-4 text-accent-blue" />
                            <span>{exp.date}</span>
                          </div>
                          <span className="hidden sm:inline opacity-30">•</span>
                          <div className={`flex items-center gap-1.5 text-accent-cyan ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold">{exp.company}</span>
                          </div>
                        </div>

                        {/* Role Title */}
                        <h4 className={`text-2xl font-bold text-white mb-4 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {exp.role}
                        </h4>

                        {/* Description */}
                        <p className={`text-secondary mb-6 leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                          {exp.description}
                        </p>

                        {/* Tech Stack Badges */}
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="badge">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Desktop Layout Helper: Empty space for alternating sides */}
                  {!isEven ? (
                    <div className="hidden md:block md:w-1/2 pl-12">
                       {/* Space holder */}
                    </div>
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