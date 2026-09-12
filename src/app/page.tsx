import HeroSection from "@/components/home/hero/HeroSection";
import ServiceSection from "@/components/services/ServiceSection";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillSection from "@/components/skills/SkillSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectSearch from "@/components/projects/ProjectSearch";
import ContactSection from "@/components/contact/ContactSection";
import SpaceDecorations from "@/components/general/SpaceDecorations";

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() ?? "";

  return (
    <main className="relative overflow-hidden">
      <section id="home" className="relative isolate overflow-hidden scroll-mt-20">
        <SpaceDecorations />
        <div className="relative z-10">
          <HeroSection />
        </div>
      </section>
      <section id="about" className="relative isolate overflow-hidden scroll-mt-20 py-6 md:py-8">
        <SpaceDecorations />
        <div className="relative z-10">
          <ServiceSection />
          <ResumeSection />
        </div>
      </section>
      <section id="skills" className="relative isolate overflow-hidden scroll-mt-20 py-6 md:py-8">
        <SpaceDecorations />
        <div className="relative z-10">
          <SkillSection />
        </div>
      </section>
      <section id="projects" className="relative isolate overflow-hidden scroll-mt-20 py-6 md:py-8">
        <SpaceDecorations />
        <div className="relative z-10">
          <ProjectSearch searchTerm={searchTerm} basePath="/" />
          <ProjectSection searchTerm={searchTerm} />
        </div>
      </section>
      <section id="contact" className="relative isolate overflow-hidden scroll-mt-20 py-6 md:py-8">
        <SpaceDecorations />
        <div className="relative z-10">
          <ContactSection />
        </div>
      </section>
    </main>
  )
}