"use client";

import { FiCode, FiLayers, FiPenTool, FiSmartphone } from "react-icons/fi";
import Header from "@/components/general/Header";
import ServiceCard from "./ServiceCard";

const services = [
  {
    name: "UI/UX Website",
    icon: FiPenTool,
    description: "Menyusun tampilan website yang jelas, rapi, dan mudah digunakan di berbagai ukuran layar.",
    accent: "from-rose-500/20 to-orange-500/20",
    iconAccent: "border-rose-400/30 bg-rose-950/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.25)]",
    number: "01",
  },
  {
    name: "Frontend Web",
    icon: FiSmartphone,
    description: "Membangun halaman web responsif menggunakan React, Next.js, dan Tailwind CSS.",
    accent: "from-cyan-500/20 to-blue-500/20",
    iconAccent: "border-cyan-400/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    number: "02",
  },
  {
    name: "Backend & Database",
    icon: FiLayers,
    description: "Menghubungkan aplikasi dengan API, Supabase, MySQL, dan pengelolaan data yang terstruktur.",
    accent: "from-emerald-500/20 to-teal-500/20",
    iconAccent: "border-emerald-400/30 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    number: "03",
  },
  {
    name: "Fullstack Project",
    icon: FiCode,
    description: "Mengerjakan website dan aplikasi dari antarmuka sampai fungsi server sesuai kebutuhan proyek.",
    accent: "from-indigo-500/20 to-purple-500/20",
    iconAccent: "border-indigo-400/30 bg-indigo-950/40 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]",
    number: "04",
  },
];

export default function ServiceSection() {
  return (
    <div className="py-2 sm:py-4">
      {/* Header */}
      <Header title="My Services" />
      <p className="mx-auto -mt-8 mb-10 max-w-xl text-center text-sm leading-relaxed text-slate-400 sm:text-base w-[90%]">
        Layanan yang saya tawarkan untuk membantu Anda mewujudkan kebutuhan digital.
      </p>
      <div className="service-grid mx-auto grid w-[90%] max-w-6xl grid-cols-1 gap-5 sm:w-[85%] md:grid-cols-2">
        {services.map((service, index) => (
          <div key={service.name} data-aos="fade-up" data-aos-delay={index * 100}>
            <ServiceCard
              name={service.name}
              icon={service.icon}
              description={service.description}
              accent={service.accent}
              iconAccent={service.iconAccent}
              number={service.number}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
