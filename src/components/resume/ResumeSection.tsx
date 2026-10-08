"use client";

import Image from "next/image";
import { LuAward, LuBookOpen, LuGraduationCap, LuLayers3, LuMail, LuMapPin } from "react-icons/lu";
import Header from "../general/Header";
import ResumeCard from "./ResumeCard";

export default function ResumeSection() {
  return (
    <div className="about-section my-6 sm:my-10">
      <div className="mx-auto w-[90%] max-w-7xl">
        <Header title="About Me" as="h2" />
        <div className="about-layout grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* Portrait with Holographic Glow */}
          <div className="about-portrait-wrap mx-auto w-full max-w-md" data-aos="fade-right">
            <div className="about-portrait relative mx-auto aspect-square w-[min(100%,28rem)]">
              {/* Outer cyber ring */}
              <div className="about-portrait-circle absolute -inset-4 rounded-full border border-cyan-400/25 shadow-[0_0_50px_rgba(6,182,212,0.25)] animate-pulse" />
              <div className="about-portrait-circle absolute -inset-1 rounded-full border border-indigo-400/25" />

              <div className="about-portrait-image-frame absolute inset-[5%] overflow-hidden rounded-full border-4 border-cyan-400/40 bg-slate-900 shadow-2xl">
                <Image
                  src="/profil2.png"
                  alt="Foto Muhammad Ulil Azmi"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="about-portrait-image h-full w-full object-cover object-[58%_27%] transition-transform duration-700 hover:scale-108"
                />
              </div>

              {/* Status pill badge */}
              <span className="about-portrait-status absolute bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-400/40 bg-slate-950/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] backdrop-blur-md">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2 align-middle" />
                Open to work &amp; freelance
              </span>
            </div>
          </div>

          {/* Cards & Info Column */}
          <div className="space-y-5" data-aos="fade-left">
            <ResumeCard
              icon={LuGraduationCap}
              role="Student SMKN 1 Pasuruan"
              description="Saya Muhammad Ulil Azmi merupakan siswa SMK Negeri 1 Pasuruan dari jurusan Rekayasa Perangkat Lunak (RPL). Saya memiliki ketertarikan dan fokus pada bidang teknologi, khususnya pengembangan website dan aplikasi. Saya terus mengembangkan kemampuan dalam pemrograman, desain antarmuka, serta pembuatan aplikasi menggunakan teknologi modern seperti React, Next.js, dan database."
              date="July 2025 - April 2028"
            />
            <ResumeCard
              icon={LuBookOpen}
              role="Lesson Learned"
              description="Saya mempelajari berbagai bidang dalam pengembangan perangkat lunak, mulai dari pembuatan dan pengelolaan database menggunakan XAMPP dan Supabase, hingga pengembangan website menggunakan JavaScript, TypeScript, React, Next.js, dan Tailwind CSS. Selain itu, saya juga mempelajari desain antarmuka menggunakan Figma serta dasar-dasar pemrograman menggunakan Python. Fokus saya adalah mengembangkan kemampuan dalam membuat website dan aplikasi yang modern, responsif, dan mudah digunakan."
            />
            <ResumeCard
              icon={LuAward}
              role="Future Goals"
              description="Future goals saya adalah terus mengembangkan kemampuan di bidang teknologi dan pemrograman, terutama dalam pengembangan website dan aplikasi. Saya ingin memperdalam skill seperti React, Next.js, JavaScript, Python, database, dan UI/UX. Ke depannya, saya berharap dapat menjadi seorang developer yang profesional, mampu membuat karya yang bermanfaat, serta terus belajar mengikuti perkembangan teknologi."
            />

            {/* Quick Fact Chips */}
            <div className="about-facts grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
              <a
                href="https://maps.google.com/?q=Pasuruan,+Jawa+Timur"
                target="_blank"
                rel="noreferrer"
                className="about-fact group flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-400/20 bg-cyan-950/40 text-cyan-300 transition-transform group-hover:scale-110">
                  <LuMapPin size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <small className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Lokasi</small>
                  <span className="text-xs font-semibold text-slate-200">Pasuruan, Jawa Timur</span>
                </div>
              </a>

              <div className="about-fact group flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-indigo-400/40 hover:bg-slate-900/90 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-indigo-400/20 bg-indigo-950/40 text-indigo-300 transition-transform group-hover:scale-110">
                  <LuLayers3 size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <small className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Fokus</small>
                  <span className="text-xs font-semibold text-slate-200">Web &amp; UI/UX</span>
                </div>
              </div>

              <a
                href="mailto:azmiulil2010@gmail.com"
                className="about-fact group flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-400/20 bg-cyan-950/40 text-cyan-300 transition-transform group-hover:scale-110">
                  <LuMail size={18} aria-hidden="true" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <small className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Email</small>
                  <span className="truncate text-xs font-semibold text-slate-200">azmiulil2010@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
