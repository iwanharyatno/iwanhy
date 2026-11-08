import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/get-dictionary";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iwanhy.my.id"),
  title: "Iwan Haryatno | Software Engineer",
  description:
    "Portfolio of Iwan Haryatno: server-rendered web apps, backend APIs, and local AI tools, documented in an MDX journal.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const resolvedParams = await params;
  const lng = resolvedParams.lng as Locale;
  const dict = await getDictionary(lng);

  return (
    <html
      data-scroll-behavior="auto"
      lang={lng}
      className={`${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-void text-secondary">
        <Navbar lng={lng} labels={dict.navbar} />
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
