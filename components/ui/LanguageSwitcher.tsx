"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = (params?.lng as string) || "en";
  const targetLocale = currentLocale === "en" ? "id" : "en";

  const segments = pathname.split("/");
  segments[1] = targetLocale;
  const nextPathname = segments.join("/");

  const handleLanguageCookie = () => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <Link
      href={nextPathname}
      onClick={handleLanguageCookie}
      className="key-cap select-none"
      aria-label={
        currentLocale === "en"
          ? "Switch language to Indonesian"
          : "Ubah bahasa ke Inggris"
      }
    >
      <span className="tracking-wider uppercase text-[11px]">
        {currentLocale === "en" ? "EN" : "ID"}
      </span>
    </Link>
  );
}
