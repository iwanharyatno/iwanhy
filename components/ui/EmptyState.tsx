import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
}

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <div className="panel p-10 text-center md:p-16">
      <h2 className="text-xl font-bold text-primary md:text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-secondary">{description}</p>
      <Link href={actionHref} className="btn-ghost mt-6">
        {actionLabel}
      </Link>
    </div>
  );
}
