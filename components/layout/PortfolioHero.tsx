import { 
  FileText, 
  ArrowRight, 
  Mail, 
  Terminal, 
  Database, 
  Cpu, 
  GitBranch, 
  Command 
} from 'lucide-react';
import { TechBadge } from '../ui/TechBadge';
import { FloatingKey } from '../ui/FloatingKey';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
  </svg>
);

export default function PortfolioHero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Ambient Glows (from utilities layer) */}
      <div className="glow-cyan top-[-10%] left-[-10%] animate-pulse-glow"></div>
      <div className="glow-blue bottom-[10%] right-[10%] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      {/* Navigation Bar */}
      <nav className="container-portfolio relative z-10 flex items-center justify-between py-8">
        <div className="text-3xl font-bold">
          IHY<span className="text-accent-cyan">.</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#home" className="glass px-4 py-2 rounded-full text-white!">Home</a>
          <a href="#projects" className="hover:text-text-accent-cyan]">Projects</a>
          <a href="#notes" className="hover:text-accent-cyan">Notes</a>
          <a href="#about" className="hover:text-text-accent-cyan]">About</a>
        </div>

        <div className="flex items-center space-x-5">
          <a href="#" className="hover:text-white"><GithubIcon className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white"><LinkedinIcon className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white"><XIcon className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white"><FileText className="w-5 h-5" /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container-portfolio relative z-10 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 animate-fade-up">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-normal">Hey there,</h2>
            <h1 className="text-5xl sm:text-7xl">
              I'm Iwan Haryatno
            </h1>
            <h2 className="text-4xl sm:text-5xl text-gradient pt-2 pb-1">
              Web Developer
            </h2>
          </div>

          <p className="text-lg max-w-xl">
            Building robust, scalable digital systems with a special focus on performance, clean code, and developer experience. From cloud-native apps to creative AI integrations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 w-full sm:w-auto">
            <button className="btn-ghost w-full sm:w-auto justify-center">
              Explore My Projects 
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>
            <button className="glass flex items-center gap-2 px-6 py-3 text-sm font-medium hover:text-white! transition-colors w-full sm:w-auto justify-center rounded-lg cursor-pointer">
              Get in Touch
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Visuals & Floating Elements */}
        <div className="lg:col-span-5 relative w-full aspect-square md:aspect-4/5 rounded-3xl overflow-hidden hidden lg:block border border-(--color-border) shadow-2xl">
          {/* Main Portrait Placeholder */}
          <img 
            src="/api/placeholder/600/800" 
            alt="Iwan Haryatno" 
            className="object-cover w-full h-full opacity-90 grayscale-20 hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent"></div>

          {/* Floating 3D/Glassmorphism Keys */}
          <FloatingKey className="top-[10%] left-[10%] rotate-[-15deg] animation-delay-0">
            <GithubIcon />
          </FloatingKey>
          
          <FloatingKey className="top-[5%] right-[20%] rotate-10 animation-delay-100">
            <Cpu className="w-4 h-4 text-accent-cyan" />
          </FloatingKey>
          
          <FloatingKey className="bottom-[25%] left-[5%] rotate-[-5deg] animation-delay-200">
            <Terminal className="w-5 h-5 text-green-400" />
          </FloatingKey>
          
          <FloatingKey className="top-[35%] right-[5%] rotate-15 animation-delay-300">
            vLLM
          </FloatingKey>
          
          <FloatingKey className="bottom-[15%] right-[15%] rotate-[-10deg] animation-delay-400">
            <Database className="w-4 h-4 text-accent-cyan" />
          </FloatingKey>
          
          <FloatingKey className="bottom-[5%] right-[40%] rotate-[5deg] animation-delay-500">
            <GitBranch className="w-4 h-4 text-purple-400" />
          </FloatingKey>
        </div>

      </main>

      {/* Faint Background Code Snippet */}
      <div className="absolute bottom-10 left-10 text-[10px] opacity-30 hidden lg:block pointer-events-none select-none">
        <pre className="font-mono! text-muted">
{`import React from 'react';

const Portfolio = () => {
  return (
    <div className="container">
      {status === 'ok'}
    </div>
  )
}`}
        </pre>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 animate-bounce -translate-x-1/2 flex items-center gap-2 text-sm text-muted hover:text-white cursor-pointer transition-colors">
        Keep going <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  );
}