import ContactSection from "@/components/contact/ContactSection";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";

export default function Contact() {
  return (
    <main className="relative overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="Let's talk"
        title="Have an idea worth exploring?"
        description="Send a message, share a project, or simply say hello. Every interesting conversation starts somewhere."
      />
      <ContactSection />
    </main>
  );
}