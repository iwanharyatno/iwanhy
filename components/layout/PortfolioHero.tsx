import { 
  ArrowRight, 
  Mail, 
  Terminal, 
  Database, 
  Cpu, 
  GitBranch 
} from 'lucide-react';
import { FloatingKey } from '../ui/FloatingKey';
import { GithubIcon } from '../elements/CustomIcons';
import { getDictionary, Locale } from '@/lib/get-dictionary';

export default async function PortfolioHero({
  lng
}: {
  lng: Locale
}) {
  // Read localized strings on the server side
  const dict = await getDictionary(lng);

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 z-0">
      
      {/* Ambient Glows (from utilities layer) */}
      <div className="glow-cyan top-[-10%] left-[-10%] animate-pulse-glow"></div>

      {/* Hero Section */}
      <main className="container-portfolio relative z-10 pt-4 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center justify-between">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-8 flex flex-col items-start space-y-8 animate-fade-up">
          <div className="space-y-2">
            <h2 className="md:text-3xl text-3xl font-normal text-secondary">
              {dict.hero.greeting}
            </h2>
            <h1 className="md:text-5xl text-4xl font-bold text-white tracking-tight">
              {dict.hero.name}
            </h1>
            <h2 className="md:text-3xl text-3xl text-gradient pt-2 pb-1">
              {dict.hero.role}
            </h2>
          </div>

          <p className="text-lg max-w-xl text-secondary leading-relaxed">
            {dict.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 w-full sm:w-auto">
            <a href="#projects" className="btn-ghost w-full sm:w-auto justify-center">
              {dict.hero.ctaExplore}
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </a>
            <a href="mailto:iwanharyatno1@gmail.com" target="_blank" className="glass flex items-center gap-2 px-6 py-3 text-sm font-medium hover:text-white! transition-colors w-full sm:w-auto justify-center rounded-lg cursor-pointer text-white">
              {dict.hero.ctaContact}
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="glow-blue bottom-0 right-0 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Right Column: Visuals & Floating Elements */}
        <div className="lg:col-span-4 relative w-full aspect-square md:aspect-4/5 rounded-3xl overflow-hidden hidden lg:block border border-(--color-border) shadow-2xl">
          {/* Main Portrait */}
          <img 
            src="/images/iwan.jpeg" 
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

      <div className="absolute -bottom-10 left-10 text-[10px] opacity-30 hidden lg:block pointer-events-none select-none">
        <pre className="font-mono! text-[1rem] text-muted">
{`import React from 'react';

const Portfolio = ({ content }) => {
  return (
    <div className="container">
      {status === 'ok' ? <Render content={content} /> : <Loading />}
    </div>
  )
}`}
        </pre>
      </div>

      <div className="absolute top-20 -right-10 text-[10px] opacity-15 hidden lg:block pointer-events-none select-none">
        <pre className="font-mono! text-[1.2rem] text-muted">
{`import React from 'react';

const Portfolio = ({ content }) => {
  return (
    <div className="container">
      {status === 'ok' ? <Render content={content} /> : <Loading />}
    </div>
  )
}`}
        </pre>
      </div>

      <div className="absolute bottom-8 left-1/2 animate-bounce -translate-x-1/2 flex items-center gap-2 text-sm text-muted hover:text-white cursor-pointer transition-colors">
        {dict.hero.scrollHint} <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  );
}