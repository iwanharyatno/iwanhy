"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, XIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../elements/CustomIcons";

// Define our routes to easily map over them
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/journal", label: "Journal" },
  { path: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed z-50 top-0 left-0 right-0 bg-void/85 backdrop-blur-md border-b border-(--color-border) shadow-2xl shadow-black/50">
      
      {/* Inner container to maintain global layout alignment */}
      <nav className="container-portfolio flex items-center justify-between py-4">
        <div className="text-3xl font-bold">
          IHY<span className="text-accent-cyan">.</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
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
                {/* Text needs to be relative/z-10 to sit above the absolute glass pill */}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-5">
          <a href="https://github.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><GithubIcon className="w-5 h-5" /></a>
          <a href="https://linkedin.com/in/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
          <a href="https://x.com/iwanharyatno" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><XIcon className="w-5 h-5" /></a>
          {/* <a href="#" target="_blank" className="hover:text-white transition-colors"><FileText className="w-5 h-5" /></a> */}
        </div>
      </nav>
    </header>
  );
}