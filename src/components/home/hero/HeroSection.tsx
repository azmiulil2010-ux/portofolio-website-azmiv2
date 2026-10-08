"use client";

import { FaGithub, FaTiktok, FaInstagram } from "react-icons/fa";
import { LuArrowUpRight, LuArrowDown } from "react-icons/lu";
import HeroPhoto from "./HeroPhoto";

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/azmiulil2010-ux",
    label: "Kunjungi GitHub",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@azmii.hh",
    label: "Ikuti di TikTok",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/qzmiuu/",
    label: "Ikuti di Instagram",
  },
];

export default function HeroSection() {
  return (
    <section className="hero-editorial-section relative w-full min-h-[100svh] overflow-hidden select-none bg-slate-950 transition-colors duration-500 flex flex-col justify-between">
      {/* 1. SPLIT BACKGROUND CANVAS */}
      <div className="hero-split-canvas hero-anim-canvas absolute inset-0 z-0 flex" aria-hidden="true">
        {/* Left Half: Vibrant Warm Orange */}
        <div className="hero-left-half relative w-1/2 h-full bg-[#FF6200] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Right Half: Pure Crisp White (in Light theme) / Deep Dark Slate (in Dark theme) */}
        <div className="hero-right-half relative w-1/2 h-full bg-white transition-colors duration-500 overflow-hidden">
          <div className="hero-right-gradient absolute inset-0 bg-gradient-to-bl from-slate-100/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 2. TOP SPACER (General Navbar sits at fixed top-0) */}
      <div className="relative z-10 w-full h-20 sm:h-24 pointer-events-none" aria-hidden="true" />

      {/* 3. GIANT BACKGROUND EDITORIAL TYPOGRAPHY ("AZMI DEV") */}
      <div
        className="hero-anim-title absolute inset-x-0 top-[22%] sm:top-[20%] md:top-[16%] lg:top-[14%] z-10 flex pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Left Side (Orange): "AZMI" */}
        <div className="w-1/2 flex justify-end pr-2 sm:pr-4 md:pr-8 lg:pr-12">
          <span
            className="hero-font-display text-[17vw] sm:text-[15vw] md:text-[14vw] lg:text-[13vw] font-black uppercase tracking-tight leading-none text-[#FFE5D4] drop-shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
            style={{
              WebkitTextStroke: "2px #FFFFFF",
              fontFamily: "'Impact', 'Anton', 'Bebas Neue', 'Arial Black', sans-serif",
            }}
          >
            AZMI
          </span>
        </div>

        {/* Right Side (White/Dark): "DEV" */}
        <div className="w-1/2 flex justify-start pl-2 sm:pl-4 md:pl-8 lg:pl-12">
          <span
            className="hero-dev-text hero-font-display text-[17vw] sm:text-[15vw] md:text-[14vw] lg:text-[13vw] font-black uppercase tracking-tight leading-none text-[#1e293b] transition-colors duration-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            style={{
              WebkitTextStroke: "1.5px #0f172a",
              fontFamily: "'Impact', 'Anton', 'Bebas Neue', 'Arial Black', sans-serif",
            }}
          >
            DEV
          </span>
        </div>
      </div>

      {/* 4. AUTONOMOUS 3D ROBOT ROAMING & INTERACTION LAYER ACROSS HOME SECTION */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <HeroPhoto />
      </div>

      {/* 5. BOTTOM OVERLAY CONTENT ROW (LEFT & RIGHT ELEMENTS) */}
      <div className="relative z-30 w-full pb-6 sm:pb-10 md:pb-14 px-4 sm:px-8 md:px-12 lg:px-16 flex items-end justify-between pointer-events-none">
        {/* 5A. BOTTOM LEFT (ON ORANGE SIDE) */}
        <div className="hero-anim-left hero-left-content pointer-events-auto max-w-[48%] sm:max-w-xs md:max-w-sm space-y-2.5 sm:space-y-4">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="hero-tagline-text text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-black drop-shadow-sm">
              Code that works
            </p>
            <p className="hero-tagline-text text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-black drop-shadow-sm">
              Design that sells
            </p>
          </div>

          <a
            href="/#projects"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-3.5 sm:px-6 py-2 sm:py-3 text-[11px] sm:text-sm font-black text-black shadow-xl shadow-black/15 transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-2xl"
          >
            <span className="text-black font-black">View Work</span>
            <LuArrowUpRight
              size={14}
              className="text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* 5B. BOTTOM RIGHT (ON WHITE/DARK SIDE) */}
        <div className="hero-anim-right hero-right-content pointer-events-auto max-w-[48%] sm:max-w-xs md:max-w-sm text-left lg:text-right flex flex-col items-start lg:items-end space-y-1.5 sm:space-y-3">
          {/* Eyebrow Label */}
          <span className="hero-right-eyebrow text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] text-orange-600 transition-colors duration-300">
            AVAILABLE FOR FREELANCE
          </span>

          {/* Big Role Heading */}
          <h1 className="hero-right-title text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 transition-colors duration-500 leading-[0.95]">
            Fullstack
            <br />
            Developer
          </h1>

          {/* Circular Social Outline Buttons + Scroll Down */}
          <div className="pt-1 sm:pt-3 flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            {socialLinks.map(({ name, icon: Icon, url, label }, index) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={name}
                style={{ animationDelay: `${320 + index * 60}ms` }}
                className="hero-anim-social hero-right-social group grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-xs transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:scale-110 hover:shadow-md"
              >
                <Icon
                  size={14}
                  className="transition-transform duration-300 group-hover:scale-115"
                />
              </a>
            ))}

            {/* Sleek Scroll Button on Right */}
            <a
              href="/#about"
              aria-label="Scroll ke konten"
              style={{ animationDelay: "520ms" }}
              className="hero-anim-social hero-right-social group grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border border-orange-400/60 bg-orange-500/10 text-orange-600 shadow-xs transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-110 hover:shadow-md"
              title="Scroll ke Tentang Saya"
            >
              <LuArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
