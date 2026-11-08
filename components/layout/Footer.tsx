import Link from "next/link";
import { GithubIcon, LinkedinIcon, XIcon } from "../elements/CustomIcons";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";

export default async function Footer({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-void">
      <div className="container-portfolio py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link
              href={`/${lng}`}
              className="inline-flex min-h-11 items-center text-xl font-bold text-primary"
            >
              IHY<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-secondary">{dict.footer.bio}</p>
          </div>

          <nav aria-label={dict.footer.navLabel} className="md:col-span-3">
            <h3 className="text-sm font-bold text-primary">{dict.footer.navHeading}</h3>
            <ul className="mt-2 text-sm">
              <li>
                <Link href={`/${lng}`} className="inline-flex min-h-11 items-center text-secondary hover:text-accent">
                  {dict.footer.navHome}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/projects`} className="inline-flex min-h-11 items-center text-secondary hover:text-accent">
                  {dict.footer.navProjects}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/journal`} className="inline-flex min-h-11 items-center text-secondary hover:text-accent">
                  {dict.footer.navJournal}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}/#career`} className="inline-flex min-h-11 items-center text-secondary hover:text-accent">
                  {dict.footer.navExperience}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-primary">{dict.footer.connectHeading}</h3>
            <ul className="mt-2 text-sm">
              <li>
                <a
                  href="https://github.com/iwanharyatno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/iwanharyatno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/iwanharyatno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-accent"
                >
                  <XIcon className="h-4 w-4" /> X
                </a>
              </li>
              <li>
                <a
                  href="mailto:iwanharyatno1@gmail.com"
                  className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-accent"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Iwan Haryatno. {dict.footer.copyright}</p>
          <p className="font-mono">
            {dict.footer.builtWith} Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
