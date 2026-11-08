import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";

export default async function PortfolioHero({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);

  return (
    <section className="relative pb-16 pt-28 md:pb-24">
      <div className="container-portfolio grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {dict.hero.greeting}
          </p>

          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-primary">
            {dict.hero.name}
          </h1>

          <p className="mt-3 text-xl text-accent md:text-2xl">{dict.hero.role}</p>

          <p className="mt-6 max-w-xl text-secondary">{dict.hero.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${lng}/projects`} className="btn-primary">
              {dict.hero.ctaExplore}
            </Link>
            <a href="mailto:iwanharyatno1@gmail.com" className="btn-ghost">
              {dict.hero.ctaContact}
            </a>
          </div>

          <a
            href="#techs"
            className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-accent"
          >
            {dict.hero.scrollHint}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="schematic-frame panel p-3">
            <div className="relative aspect-square w-full overflow-hidden border border-border">
              <Image
                src="/images/iwan.webp"
                alt={dict.hero.portraitAlt}
                width={640}
                height={640}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>Fig. 01</span>
              <span>Iwan Haryatno</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
