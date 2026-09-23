import { FiCode, FiLayers, FiPenTool, FiSmartphone } from "react-icons/fi";
import Header from "@/components/general/Header";
import ServiceCard from "./ServiceCard";

export default function ServiceSection() {
  return (
    <section>
      {/* Header */}
      <Header title="My Services" />
      <div className="service-grid mx-auto grid w-[90%] max-w-6xl grid-cols-1 gap-5 sm:w-[85%] md:grid-cols-2"
      >
        <div data-aos="fade-up" data-aos-delay="0">
        <ServiceCard
          name="UI/UX Website"
          icon={FiPenTool}
          description="Menyusun tampilan website yang jelas, rapi, dan mudah digunakan di berbagai ukuran layar."
        />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
        <ServiceCard
          name="Frontend Web"
          icon={FiSmartphone}
          description="Membangun halaman web responsif menggunakan React, Next.js, dan Tailwind CSS."
        />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
        <ServiceCard
          name="Backend & Database"
          icon={FiLayers}
          description="Menghubungkan aplikasi dengan API, Supabase, MySQL, dan pengelolaan data yang terstruktur."
        />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
        <ServiceCard
          name="Fullstack Project"
          icon={FiCode}
          description="Mengerjakan website dan aplikasi dari antarmuka sampai fungsi server sesuai kebutuhan proyek."
        />
        </div>
      </div>
    </section>
  );
}
