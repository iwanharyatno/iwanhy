import type { Metadata } from "next";
import { blogPostSource } from "@/lib/source";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PostCard } from "@/components/ui/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface Props {
  params: Promise<{ lng: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return {
    title: dict.journalPage.metaTitle,
    description: dict.journalPage.metaDescription,
  };
}

export default async function BlogPage({ params }: Props) {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  const posts = blogPostSource
    .getPages(lng)
    .filter((post) => post.data.published)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const formatDate = (dateString: string) => {
    const formatLocale = lng === "id" ? "id-ID" : "en-US";
    return new Date(dateString).toLocaleDateString(formatLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <main className="container-portfolio">
        <SectionHeader
          as="h1"
          eyebrow={dict.journalPage.eyebrow}
          title={dict.journalPage.title}
          description={dict.journalPage.description}
        />

        {posts.length > 0 ? (
          <div className="mt-10 space-y-6">
            <PostCard
              post={posts[0]}
              formattedDate={formatDate(posts[0].data.date)}
              readMore={dict.journalPage.readMore}
              headingLevel="h2"
              featured
            />
            {posts.length > 1 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {posts.slice(1).map((post) => (
                  <PostCard
                    key={post.url}
                    post={post}
                    formattedDate={formatDate(post.data.date)}
                    readMore={dict.journalPage.readMore}
                    headingLevel="h2"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title={dict.journalPage.emptyTitle}
              description={dict.journalPage.emptyDescription}
              actionHref={`/${lng}/projects`}
              actionLabel={dict.journalPage.emptyAction}
            />
          </div>
        )}
      </main>
    </div>
  );
}
