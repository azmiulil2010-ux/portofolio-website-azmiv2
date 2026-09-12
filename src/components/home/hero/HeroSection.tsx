"use client";
import Particles from "./Particels";
import Image from "next/image";
import AnimatedIntro from "./AnimatedIntro";
import LinkButton from "@/components/general/LinkButton";
import { useRef } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { LuArrowRight, LuCode, LuMapPin, LuSparkles } from "react-icons/lu";

const socialLinks = [
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/qzmiuu/" },
  { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/@azmii.hh" },
  { name: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/channel/UConwuD3udrqXVXSU_BiB8Jg" },
];

export default function HeroSection() {
  const photoRef = useRef<HTMLDivElement>(null);

  const handlePhotoPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const photo = photoRef.current;
    if (!photo || event.pointerType !== "mouse") return;

    const bounds = photo.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
    photo.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    photo.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetPhotoTilt = () => {
    photoRef.current?.style.setProperty("--tilt-x", "0deg");
    photoRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section
      className="hero-section relative flex min-h-screen items-center overflow-hidden px-5 py-28 sm:px-8 lg:h-screen lg:px-12 lg:py-20"
    >
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
      <div className="relative z-10 mx-auto grid w-full max-w-6xl translate-y-5 items-center gap-12 lg:translate-y-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="text-center lg:text-left">
          <p
            data-aos="fade-up"
            className="hero-eyebrow mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400"
          >
            Web Developer
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="hero-title text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m Azmi.
          </h1>
          <div className="mx-auto max-w-xl lg:mx-0">
            <AnimatedIntro />
          </div>
               <div className="mt-4 flex justify-center lg:justify-start">
            <LinkButton
              href="/projects"
              text="See my work"
              icon={LuArrowRight}
              iconPosition={"right"}
              rounded
              aosType="fade-up"
              aosDelay={700}
              animate
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="hero-stats mx-auto mt-4 grid w-full max-w-xl grid-cols-3 divide-x divide-transparent rounded-2xl border border-transparent bg-slate-900/45 px-2 py-3 backdrop-blur-sm lg:mx-0"
          >
            <div className="px-2 text-center sm:px-4">
              <p className="text-xl font-bold text-cyan-300">2+</p>
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">Completed Projects</p>
            </div>
            <div className="px-2 text-center sm:px-4">
              <p className="text-xl font-bold text-indigo-300">10+</p>
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">Commits</p>
            </div>
            <div className="px-2 text-center sm:px-4">
              <p className="text-xl font-bold text-purple-300">RPL</p>
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">SMKN 1 Pasuruan</p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="hero-status-panel mx-auto mt-4 grid w-full max-w-2xl grid-cols-1 divide-y divide-transparent rounded-2xl border border-transparent bg-slate-900/45 px-5 py-1 text-left backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mx-0"
          >
            <div className="hero-status-item flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuSparkles className="shrink-0 text-cyan-400" size={18} aria-hidden="true" />
              <div>
                <p className="hero-status-label text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Status</p>
                <p className="hero-status-value text-sm font-medium text-gray-200">Open to collaborate</p>
              </div>
            </div>
            <div className="hero-status-item flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuCode className="shrink-0 text-indigo-400" size={18} aria-hidden="true" />
              <div>
                <p className="hero-status-label text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Focus</p>
                <p className="hero-status-value text-sm font-medium text-gray-200">Web &amp; UI/UX</p>
              </div>
            </div>
            <div className="hero-status-item flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4">
              <LuMapPin className="shrink-0 text-purple-400" size={18} aria-hidden="true" />
              <div>
                <p className="hero-status-label text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500">Based in</p>
                <p className="hero-status-value text-sm font-medium text-gray-200">Pasuruan, Indonesia</p>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="mt-4 flex justify-center gap-3 lg:justify-start"
          >
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${name}`}
                title={name}
                className="hero-social-link grid h-10 w-10 place-items-center rounded-full border border-transparent bg-slate-900/55 text-gray-300 transition-all hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-delay="300">
          <div
            ref={photoRef}
            onPointerMove={handlePhotoPointerMove}
            onPointerLeave={resetPhotoTilt}
            className="hero-photo-float relative h-72 w-56 sm:h-80 sm:w-64 md:h-88 md:w-72"
          >
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
            <div className="hero-photo-caption absolute inset-x-0 bottom-0 z-10 rounded-b-[1.75rem] bg-linear-to-t from-slate-950 via-slate-950/85 to-transparent px-5 pb-5 pt-20 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">AZMI</p>
              <p className="hero-photo-role mt-1 text-sm font-medium text-gray-200">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
