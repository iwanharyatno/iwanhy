import type { Metadata } from "next";
import PortfolioHero from "@/components/layout/PortfolioHero";
import PortfolioSkills from "@/components/layout/PortfolioSkills";
import PortfolioExperience from "@/components/layout/PortfolioExperience";
import PortfolioProjects from "@/components/layout/Projects";
import PortfolioNotes from "@/components/layout/Notes";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/lib/get-dictionary";

interface Props {
  params: Promise<{ lng: Locale }>;
}

// Generate localized homepage SEO parameters at compile time
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lng } = await params;
  const dict = await getDictionary(lng);

  return {
    title: dict.homePage.metaTitle,
    description: dict.homePage.metaDescription,
    alternates: {
      canonical: `/${lng}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { lng } = await params;

  return (
    <>
      <PortfolioHero lng={lng} />
      <PortfolioSkills lng={lng} />
      <PortfolioExperience lng={lng} />
      <PortfolioProjects lng={lng} />
      <PortfolioNotes lng={lng} />
    </>
  );
}