import ServiceSection from "@/components/services/ServiceSection";
import ResumeSection from "@/components/resume/ResumeSection";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";

export default function About() {
  return (
    <main className="relative overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="About Azmi"
        title="Building with curiosity, clarity, and a little creativity."
        description="A closer look at the person, interests, and practical skills behind the projects in this portfolio."
      />
      <ServiceSection />
      <ResumeSection />
    </main>
  );
}