import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";

type CategoryKey = "frontend" | "backend" | "devops" | "ai";

interface SkillConfig {
  id: CategoryKey;
  span: string;
  skills: string[];
}

const skillConfigurations: SkillConfig[] = [
  {
    id: "frontend",
    span: "md:col-span-7",
    skills: ["React", "Next.js", "Svelte", "Flutter", "Tailwind CSS"],
  },
  {
    id: "backend",
    span: "md:col-span-5",
    skills: ["Laravel", "Node.js", "C# / WinForms", "Kotlin", "PostgreSQL", "BullMQ"],
  },
  {
    id: "devops",
    span: "md:col-span-5",
    skills: ["Docker", "docker-compose", "AWS", "Cloudflare R2", "Modal.com"],
  },
  {
    id: "ai",
    span: "md:col-span-7",
    skills: ["YOLOv8", "EfficientNet", "Hybrid Models", "Grad-CAM", "vLLM", "Prompt Engineering"],
  },
];

export default async function PortfolioSkills({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);

  return (
    <section id="techs" className="py-16 md:py-24">
      <div className="container-portfolio">
        <SectionHeader
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
          description={dict.skills.description}
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-12">
          {skillConfigurations.map((category, index) => {
            const translation = dict.skills.categories[category.id];

            return (
              <article
                key={category.id}
                className={`bg-void p-6 transition-colors hover:bg-surface md:p-8 ${category.span}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rule-accent" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-primary">
                  {translation.title}
                </h3>

                <p className="mt-2 text-sm text-secondary">
                  {translation.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="badge">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
