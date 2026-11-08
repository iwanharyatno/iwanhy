import Link from "next/link";
import { blogPostSource } from "@/lib/source";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PostCard } from "@/components/ui/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function PortfolioNotes({ lng }: { lng: Locale }) {
  const dict = await getDictionary(lng);

  const recentPosts = blogPostSource
    .getPages(lng)
    .filter((page) => page.data.published !== false)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    const localeString = lng === "id" ? "id-ID" : "en-US";
    return new Date(dateString).toLocaleDateString(localeString, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="notes" className="py-16 md:py-24">
      <div className="container-portfolio">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={dict.journal.eyebrow}
            title={dict.journal.title}
            description={dict.journal.description}
          />
          {recentPosts.length > 0 ? (
            <Link href={`/${lng}/journal`} className="btn-ghost w-fit">
              {dict.journal.viewAll}
            </Link>
          ) : null}
        </div>

        {recentPosts.length > 0 ? (
          <div className="mt-10 space-y-6">
            <PostCard
              post={recentPosts[0]}
              formattedDate={formatDate(recentPosts[0].data.date)}
              readMore={dict.journal.readMore}
              featured
            />
            {recentPosts.length > 1 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {recentPosts.slice(1).map((post) => (
                  <PostCard
                    key={post.url}
                    post={post}
                    formattedDate={formatDate(post.data.date)}
                    readMore={dict.journal.readMore}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title={dict.journal.emptyTitle}
              description={dict.journal.emptyDescription}
              actionHref={`/${lng}/projects`}
              actionLabel={dict.journal.emptyAction}
            />
          </div>
        )}
      </div>
    </section>
  );
}
