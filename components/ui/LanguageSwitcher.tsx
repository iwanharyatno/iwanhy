"use client";

import React from 'react';
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  
  const currentLocale = (params?.lng as string) || 'en';
  const targetLocale = currentLocale === 'en' ? 'id' : 'en';

  const segments = pathname.split('/');
  segments[1] = targetLocale; 
  const nextPathname = segments.join('/');

  const handleLanguageCookie = () => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <Link
      href={nextPathname}
      onClick={handleLanguageCookie}
      className="key-cap select-none font-mono font-medium h-9 px-3 gap-2 cursor-pointer transition-all active:scale-95 text-xs"
      title={currentLocale === 'en' ? 'Switch to Indonesian' : 'Ubah ke Bahasa Inggris'}
      aria-label="Toggle language"
    >
      <Languages className="w-3.5 h-3.5 text-accent-cyan" />
      <span className="tracking-wider uppercase text-[10px]">
        {currentLocale === 'en' ? 'EN' : 'ID'}
      </span>
    </Link>
  );
}