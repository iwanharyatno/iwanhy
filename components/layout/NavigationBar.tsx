"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../elements/CustomIcons";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";

// Define navigation nodes with translation lookup keys and immediate structural fallbacks
const navLinks = [
  { path: "/", key: "home", defaultLabel: "Home" },
  { path: "/journal", key: "journal", defaultLabel: "Journal" },
  { path: "/projects", key: "projects", defaultLabel: "Projects" },
];

export default function Navbar({
  lng
}: {
  lng: Locale
}) {
  const pathname = usePathname();
  const [navigationDict, setNavigationDict] = useState<Record<string, string> | null>(null);

  // Extract the active locale segment cleanly from the URL pathway context
  const segments = pathname.split("/");
  const currentLocale = segments[1] || lng || "en";

  // Hydrate client state safely from the localized JSON dictionary chunks
  useEffect(() => {
    getDictionary(lng).then((data) => {
      setNavigationDict(data.navbar);
    });
  }, [currentLocale]);

  return (
    <header className="fixed z-50 top-0 left-0 right-0 bg-void/85 backdrop-blur-md border-b border-(--color-border) shadow-2xl shadow-black/50">
      
      {/* Inner container to maintain global layout alignment */}
      <nav className="container-portfolio flex items-center justify-between py-4">
        <div className="text-3xl font-bold text-white">
          IHY<span className="text-accent-cyan">.</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navLinks.map((link) => {
            // Compute localized absolute path targets
            const targetHref = link.path === "/" ? `/${currentLocale}` : `/${currentLocale}${link.path}`;
            
            // Strictly check link highlight matching criteria against active routes
            const isHomeActive = link.path === "/" && (pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`);
            const isSubPageActive = link.path !== "/" && pathname.startsWith(`/${currentLocale}${link.path}`);
            const isActive = isHomeActive || isSubPageActive;

            // Use translated dictionary value, fall back cleanly if promise is resolving
            const activeLabel = navigationDict?.[link.key] || link.defaultLabel;

            return (
              <Link
                key={link.path}
                href={targetHref}
                className={`relative px-4 py-2 rounded-full transition-colors ${
                  isActive 
                    ? "text-white" 
                    : "text-secondary hover:text-accent-cyan"
                }`}
              >
                {/* The Sliding Glass Highlight */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 glass rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{activeLabel}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions Block: Socials + Language Selection */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-5 border-r border-(--color-border) pr-5">
            <a href="https://github.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-secondary"><GithubIcon className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-secondary"><LinkedinIcon className="w-5 h-5" /></a>
            <a href="https://x.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-secondary"><XIcon className="w-5 h-5" /></a>
          </div>
          
          {/* Integrated Language Switcher Component */}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}