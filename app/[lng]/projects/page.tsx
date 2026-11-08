import type { Metadata } from "next";
import { projectSource } from "@/lib/source";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { EmptyState } from "@/components/ui/EmptyState";

interface Props {
  params: Promise<{ lng: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return {
    title: dict.projectsPage.metaTitle,
    description: dict.projectsPage.metaDescription,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  const projects = projectSource
    .getPages(lng)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  return (
    <div className="flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <main className="container-portfolio">
        <SectionHeader
          as="h1"
          eyebrow={dict.projectsPage.eyebrow}
          title={dict.projectsPage.title}
          description={dict.projectsPage.description}
        />

        <div className="mt-10">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectRow
                key={project.url}
                project={project}
                index={index}
                openProject={dict.projectsPage.openProject}
                repository={dict.projectPost.repository}
                liveDemo={dict.projectPost.liveDemo}
                headingLevel="h2"
              />
            ))
          ) : (
            <EmptyState
              title={dict.projectsPage.emptyTitle}
              description={dict.projectsPage.emptyDescription}
              actionHref={`/${lng}/journal`}
              actionLabel={dict.projectsPage.emptyAction}
            />
          )}
        </div>
      </main>
    </div>
  );
}
