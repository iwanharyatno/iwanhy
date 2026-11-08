"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon, XIcon } from "../elements/CustomIcons";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Locale } from "@/lib/get-dictionary";

interface NavbarLabels {
  home: string;
  journal: string;
  projects: string;
  menu: string;
  close: string;
  primary: string;
}

const navLinks = [
  { path: "/", key: "home" as const },
  { path: "/journal", key: "journal" as const },
  { path: "/projects", key: "projects" as const },
];

export default function Navbar({
  lng,
  labels,
}: {
  lng: Locale;
  labels: NavbarLabels;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-100 border-b border-border bg-void">
      <nav
        aria-label={labels.primary}
        className="container-portfolio flex items-center justify-between gap-4 py-2"
      >
        <Link
          href={`/${lng}`}
          className="inline-flex min-h-11 items-center text-xl font-bold text-primary"
        >
          IHY<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center md:flex">
          {navLinks.map((link) => {
            const targetHref =
              link.path === "/" ? `/${lng}` : `/${lng}${link.path}`;
            const isHomeActive =
              link.path === "/" &&
              (pathname === `/${lng}` || pathname === `/${lng}/`);
            const isSubPageActive =
              link.path !== "/" && pathname.startsWith(`/${lng}${link.path}`);
            const isActive = isHomeActive || isSubPageActive;

            return (
              <Link
                key={link.path}
                href={targetHref}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 px-3 text-sm transition-colors ${
                  isActive
                    ? "border-accent text-primary"
                    : "border-transparent text-secondary hover:text-accent"
                }`}
              >
                {labels[link.key]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center border-r border-border pr-2 sm:flex">
            <a
              href="https://github.com/iwanharyatno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center text-secondary transition-colors hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/iwanharyatno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center text-secondary transition-colors hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/iwanharyatno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="inline-flex h-11 w-11 items-center justify-center text-secondary transition-colors hover:text-accent"
            >
              <XIcon className="h-5 w-5" />
            </a>
          </div>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
            className="inline-flex min-h-11 items-center border border-border-strong px-3 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-void md:hidden">
          <div className="container-portfolio flex flex-col py-2">
            {navLinks.map((link) => {
              const targetHref =
                link.path === "/" ? `/${lng}` : `/${lng}${link.path}`;
              const isHomeActive =
                link.path === "/" &&
                (pathname === `/${lng}` || pathname === `/${lng}/`);
              const isSubPageActive =
                link.path !== "/" &&
                pathname.startsWith(`/${lng}${link.path}`);
              const isActive = isHomeActive || isSubPageActive;

              return (
                <Link
                  key={link.path}
                  href={targetHref}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center border-l-2 px-3 text-sm ${
                    isActive
                      ? "border-accent text-primary"
                      : "border-transparent text-secondary"
                  }`}
                >
                  {labels[link.key]}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
