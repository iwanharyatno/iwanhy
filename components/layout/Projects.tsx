import { projectSource } from "@/lib/source";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function PortfolioProjects({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);

  const projects = projectSource
    .getPages(lng)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container-portfolio">
        <SectionHeader
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          description={dict.projects.description}
        />

        <div className="mt-10">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectRow
                key={project.url}
                project={project}
                index={index}
                openProject={dict.projects.openProject}
                repository={dict.projectPost.repository}
                liveDemo={dict.projectPost.liveDemo}
              />
            ))
          ) : (
            <EmptyState
              title={dict.projects.emptyTitle}
              description={dict.projects.emptyDescription}
              actionHref={`/${lng}/journal`}
              actionLabel={dict.projects.emptyAction}
            />
          )}
        </div>
      </div>
    </section>
  );
}
