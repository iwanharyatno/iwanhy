import PortfolioHero from "@/components/layout/PortfolioHero";
import PortfolioSkills from "@/components/layout/PortfolioSkills";
import PortfolioExperience from "@/components/layout/PortfolioExperience";
import Image from "next/image";
import PortfolioProjects from "@/components/layout/Projects";
import PortfolioNotes from "@/components/layout/Notes";

export default function Home() {
  return (
    <>
      <PortfolioHero />
      <PortfolioSkills />
      <PortfolioExperience />
      <PortfolioProjects />
      <PortfolioNotes />
    </>
  )
}
