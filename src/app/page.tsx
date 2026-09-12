import HeroSection from "@/components/home/hero/HeroSection";
import ServiceSection from "@/components/services/ServiceSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillSection from "@/components/skills/SkillSection";
import ContactSection from "@/components/contact/ContactSection";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import ScrollTopButton from "@/components/general/ScrollTopButton";
import AnimationLayout from "../../layouts/AnimationLayout";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Navbar />
      <AnimationLayout>
        <HeroSection />
        <ServiceSection />
        <ResumeSection />
        <ProjectSection />
        <SkillSection />
        <ContactSection />
        <Toaster />
      </AnimationLayout>
      <Footer />
      <ScrollTopButton />
    </>
  )
}