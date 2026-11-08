import Link from "next/link";

interface PostData {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
}

interface PostLike {
  url: string;
  data: PostData;
}

interface PostCardProps {
  post: PostLike;
  formattedDate: string;
  readMore: string;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}

export function PostCard({
  post,
  formattedDate,
  readMore,
  featured = false,
  headingLevel = "h3",
}: PostCardProps) {
  const Heading = headingLevel;

  return (
    <article className={`panel p-6 ${featured ? "md:p-8" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted">
        <time dateTime={post.data.date}>{formattedDate}</time>
        {post.data.tags && post.data.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.data.tags.slice(0, 3).map((tag) => (
              <li key={tag} className="badge">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <Heading className={`mt-4 font-bold text-primary ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
        <Link href={post.url} className="hover:text-accent">
          {post.data.title}
        </Link>
      </Heading>

      <p className="mt-3 text-secondary">{post.data.summary}</p>

      <Link
        href={post.url}
        className="mt-5 inline-flex text-sm font-medium text-accent hover:text-primary"
      >
        {readMore}
      </Link>
    </article>
  );
}
