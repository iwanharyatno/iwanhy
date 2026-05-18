import React from 'react';
import Link from 'next/link';
import { Mail, Terminal, XIcon } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../elements/CustomIcons'; // Adjust path as needed
import { getDictionary, Locale } from '@/lib/get-dictionary';

export default async function Footer({
  lng
}: {
  lng: Locale
}) {
  const dict = await getDictionary(lng);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-(--color-border) bg-void pt-16 pb-8 overflow-hidden">

      {/* Subtle Ambient Glow */}
      <div className="glow-cyan bottom-[-20%] left-[20%] opacity-10 pointer-events-none"></div>

      <div className="container-portfolio relative z-10 animate-fade-up">

        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Bio (Spans 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lng}`} className="text-3xl font-bold mb-4 inline-block group text-white">
              IHY<span className="text-accent-cyan group-hover:text-white transition-colors">.</span>
            </Link>
            <p className="text-secondary max-w-sm mb-6 leading-relaxed">
              {dict.footer.bio}
            </p>

            {/* Cyber Theme Status Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono text-muted bg-surface w-fit px-3 py-1.5 rounded-full border border-(--color-border)">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
              </span>
              {dict.footer.status}
            </div>
          </div>

          {/* Column 2: Internal Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide">{dict.footer.navHeading}</h4>
            <ul className="space-y-3 text-sm text-secondary">
              <li>
                <Link href={`/${lng}`} className="hover:text-accent-cyan transition-colors">{dict.footer.navHome}</Link>
              </li>
              <li>
                <Link href={`/${lng}/projects`} className="hover:text-accent-cyan transition-colors">{dict.footer.navProjects}</Link>
              </li>
              <li>
                <Link href={`/${lng}/journal`} className="hover:text-accent-cyan transition-colors">{dict.footer.navJournal}</Link>
              </li>
              <li>
                <Link href={`/${lng}/#career`} className="hover:text-accent-cyan transition-colors">{dict.footer.navExperience}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: External Connect */}
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide">{dict.footer.connectHeading}</h4>
            <ul className="space-y-3 text-sm text-secondary">
              <li>
                <a href="https://github.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <GithubIcon className="w-4 h-4 group-hover:text-white text-muted transition-colors" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/iwanharyatno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-blue transition-colors group">
                  <LinkedinIcon className="w-4 h-4 group-hover:text-accent-blue text-muted transition-colors" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <XIcon className="w-4 h-4 group-hover:text-white text-muted transition-colors" /> X (Twitter)
                </a>
              </li>
              <li>
                <a href="mailto:iwanharyatno1@gmail.com" className="flex items-center gap-2 hover:text-accent-cyan transition-colors group">
                  <Mail className="w-4 h-4 group-hover:text-accent-cyan text-muted transition-colors" /> Email
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Tech Stack */}
        <div className="pt-8 border-t border-(--color-border) flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {currentYear} Iwan Haryatno. {dict.footer.copyright}</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-secondary transition-colors">{dict.footer.resume}</a>
            <span className="opacity-30">|</span>
            <div className="font-mono flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-accent-cyan" />
              {dict.footer.builtWith} Next.js
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}