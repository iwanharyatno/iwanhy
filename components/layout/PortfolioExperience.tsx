import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ExperienceKey =
  | "suar"
  | "promokna"
  | "intermedia_head"
  | "zt_corpora"
  | "intermedia_staff"
  | "bakaran";

interface ExperienceConfig {
  id: ExperienceKey;
  technologies: string[];
}

const experienceConfigurations: ExperienceConfig[] = [
  {
    id: "suar",
    technologies: ["Ghost CMS", "Node.js", "Handlebars", "Theme Dev", "Agile"],
  },
  {
    id: "promokna",
    technologies: ["Backend Architecture", "Event Systems", "Cloud Hosting", "Startup Tech"],
  },
  {
    id: "intermedia_head",
    technologies: ["AWS Cloud", "Team Leadership", "Project Management", "Technical Training"],
  },
  {
    id: "zt_corpora",
    technologies: ["API Integration", "QR Logistics", "Logistics Systems", "Debugging"],
  },
  {
    id: "intermedia_staff",
    technologies: ["Full-Stack LMS", "Automation Systems", "Process Optimization", "Git Flow"],
  },
  {
    id: "bakaran",
    technologies: ["Frontend Infrastructure", "Golang Basics", "Technical Writing", "Git Control"],
  },
];

export default async function PortfolioExperience({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);

  return (
    <section id="career" className="py-16 md:py-24">
      <div className="container-portfolio">
        <SectionHeader
          align="center"
          eyebrow={dict.experience.eyebrow}
          title={dict.experience.title}
          description={dict.experience.description}
        />

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div
            className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {experienceConfigurations.map((config, index) => {
              const isEven = index % 2 === 0;
              const translation = dict.experience.items[config.id];

              return (
                <div key={config.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <span
                    className="absolute left-4 top-6 z-10 h-2 w-2 -translate-x-1/2 bg-accent md:left-1/2"
                    aria-hidden="true"
                  />

                  <div
                    className={
                      isEven
                        ? "pl-10 md:col-start-2 md:pl-12"
                        : "pl-10 md:col-start-1 md:row-start-1 md:pl-0 md:pr-12"
                    }
                  >
                    <article className="panel p-6">
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">
                        {translation.date}
                      </p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        {translation.role}
                      </h3>

                      <p className="mt-1 text-sm text-accent">{translation.company}</p>

                      <p className="mt-3 text-sm text-secondary">
                        {translation.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {config.technologies.map((tech) => (
                          <li key={tech} className="badge">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
