import HeroSection from "@/components/home/hero/HeroSection";
import ResumeSection from "@/components/resume/ResumeSection";
import ServiceSection from "@/components/services/ServiceSection";
import SkillSection from "@/components/skills/SkillSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ContactSection from "@/components/contact/ContactSection";
import FuturisticBackground from "@/components/general/FuturisticBackground";
import SectionDivider from "@/components/general/SectionDivider";

export default async function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100 transition-colors duration-500">
      {/* Global Futuristic Ambient Background Layer (disable secondary 3D to prioritize hero 3D robot) */}
      <FuturisticBackground show3D={false} />

      {/* 1. HERO SECTION (#home) */}
      <section id="home" className="relative isolate overflow-hidden scroll-mt-20">
        <div className="relative z-10">
          <HeroSection />
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* 2. ABOUT SECTION (#about) */}
      <section id="about" className="relative isolate overflow-hidden scroll-mt-24 py-6 md:py-8">
        <div className="relative z-10">
          <ResumeSection />
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* 3. SERVICES SECTION (#services) */}
      <section id="services" className="relative isolate overflow-hidden scroll-mt-24 py-6 md:py-8">
        <div className="relative z-10">
          <ServiceSection />
        </div>
      </section>

      <SectionDivider variant="glow" />

      {/* 4. SKILLS SECTION (#skills) */}
      <section id="skills" className="relative isolate overflow-hidden scroll-mt-24 py-6 md:py-8">
        <div className="relative z-10">
          <SkillSection />
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* 5. PROJECTS SECTION (#projects) */}
      <section id="projects" className="relative isolate overflow-hidden scroll-mt-24 py-6 md:py-8">
        <div className="relative z-10">
          <ProjectSection showAllLink />
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* 6. CONTACT SECTION (#contact) */}
      <section id="contact" className="relative isolate overflow-hidden scroll-mt-24 py-6 md:py-8">
        <div className="relative z-10">
          <ContactSection />
        </div>
      </section>
    </main>
  );
}