import HeroSection from "@/components/home/hero/HeroSection";
import ServiceSection from "@/components/services/ServiceSection";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillSection from "@/components/skills/SkillSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ContactSection from "@/components/contact/ContactSection";
import SpaceDecorations from "@/components/general/SpaceDecorations";

export default async function Home() {
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
          <ProjectSection showAllLink />
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