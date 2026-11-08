"use client";

import { useParams } from "next/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lng?: string }>();
  const isId = params?.lng === "id";

  return (
    <div className="container-portfolio flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {isId ? "Galat 500" : "Error 500"}
      </p>
      <h1 className="mt-4 text-3xl font-bold text-primary md:text-4xl">
        {isId ? "Halaman gagal dimuat" : "The page failed to load"}
      </h1>
      <p className="mt-3 max-w-xl text-secondary">
        {isId
          ? "Terjadi kesalahan saat merender halaman ini. Coba muat ulang."
          : "Something went wrong while rendering this page. Try again."}
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        {isId ? "Muat ulang" : "Try again"}
      </button>
    </div>
  );
}
