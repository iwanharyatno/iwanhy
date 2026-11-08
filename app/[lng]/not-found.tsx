"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams<{ lng?: string }>();
  const lng = params?.lng ?? "en";
  const isId = lng === "id";

  return (
    <div className="container-portfolio flex-1 pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {isId ? "Galat 404" : "Error 404"}
      </p>
      <h1 className="mt-4 text-3xl font-bold text-primary md:text-4xl">
        {isId ? "Halaman tidak ditemukan" : "Page not found"}
      </h1>
      <p className="mt-3 max-w-xl text-secondary">
        {isId
          ? "Alamat yang Anda buka tidak ada atau sudah dipindahkan."
          : "The address you opened does not exist or has moved."}
      </p>
      <Link href={`/${lng}`} className="btn-ghost mt-8">
        {isId ? "Kembali ke beranda" : "Back to home"}
      </Link>
    </div>
  );
}
