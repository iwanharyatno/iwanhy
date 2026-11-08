"use client";

import { useParams } from "next/navigation";

export default function Loading() {
  const params = useParams<{ lng?: string }>();
  const isId = params?.lng === "id";

  return (
    <div className="container-portfolio flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {isId ? "Memuat data halaman" : "Loading page data"}
      </p>
      <div className="mt-6 h-10 w-2/3 border border-border bg-surface md:h-14" />
      <div className="mt-4 h-4 w-full max-w-xl border border-border bg-surface" />
      <div className="mt-2 h-4 w-4/5 max-w-lg border border-border bg-surface" />
      <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-12">
        <div className="h-48 bg-void md:col-span-7" />
        <div className="h-48 bg-void md:col-span-5" />
        <div className="h-48 bg-void md:col-span-5" />
        <div className="h-48 bg-void md:col-span-7" />
      </div>
    </div>
  );
}
