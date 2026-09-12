"use client";
import Particles from "./Particels";
import Image from "next/image";
import AnimatedIntro from "./AnimatedIntro";
import LinkButton from "@/components/general/LinkButton";
import SpaceDecorations from "@/components/general/SpaceDecorations";
import { LuArrowRight, LuCode, LuMapPin, LuSparkles } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-28 sm:px-8 lg:h-screen lg:px-12 lg:py-20"
    >
      <SpaceDecorations />
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="text-center lg:text-left">
          <p
            data-aos="fade-up"
            className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400"
          >
            Web Developer
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m Azmi.
          </h1>
          <div className="mx-auto max-w-xl lg:mx-0">
            <AnimatedIntro />
          </div>
          <div className="flex justify-center lg:justify-start">
            <LinkButton
              href="/projects"
              text="See my work"
              icon={LuArrowRight}
              iconPosition={"right"}
              rounded
              aosType="fade-up"
              aosDelay={600}
              animate
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-1 divide-y divide-slate-700/70 rounded-2xl border border-slate-700/70 bg-slate-900/45 px-5 py-1 text-left backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mx-0"
          >
            <div className="flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuSparkles className="shrink-0 text-cyan-400" size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-200">Open to collaborate</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuCode className="shrink-0 text-indigo-400" size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Focus</p>
                <p className="text-sm font-medium text-gray-200">Web &amp; UI/UX</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuMapPin className="shrink-0 text-purple-400" size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Based in</p>
                <p className="text-sm font-medium text-gray-200">Pasuruan, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-delay="300">
          <div className="hero-photo-float relative h-72 w-56 sm:h-80 sm:w-64 md:h-88 md:w-72">
            <div className="absolute -top-10 left-1/2 h-10 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-300/70 to-indigo-400" />
            <div className="absolute top-2 left-1/2 z-20 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-slate-950 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
            <div className="hero-photo-halo absolute -inset-5 rounded-4xl border border-cyan-300/20" />
            <div className="absolute inset-0 rounded-[1.75rem] bg-linear-to-r from-blue-500 to-purple-600 blur-xl animate-pulse opacity-50"></div>
            <Image
              src="/profil.png"
              alt="Foto Azmi"
              className="rounded-[1.75rem] border-4 border-slate-950/80 object-cover object-[center_65%] shadow-[0_20px_55px_rgba(79,70,229,0.35)]"
              fill
              sizes="(min-width: 768px) 288px, (min-width: 640px) 256px, 224px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-[1.75rem] bg-linear-to-t from-slate-950 via-slate-950/85 to-transparent px-5 pb-5 pt-20 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">AZMI</p>
              <p className="mt-1 text-sm font-medium text-gray-200">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
