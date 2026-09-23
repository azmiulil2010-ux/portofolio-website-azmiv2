"use client";
import Particles from "./Particels";
import { useRef } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { LuArrowDown, LuArrowRight } from "react-icons/lu";

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
    <section className="hero-section relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:min-h-screen lg:px-12 lg:py-20">
      <div className="hero-pattern absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-[minmax(220px,0.85fr)_minmax(280px,1.2fr)_minmax(220px,0.75fr)] lg:gap-8">
        <div className="order-2 text-center lg:order-1 lg:text-left" data-aos="fade-up">
          <p className="hero-reference-label mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em]">Web Developer · Open to Work</p>
          <h1 className="hero-title max-w-md text-5xl font-black uppercase leading-[0.88] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl">
            Ulil Azmi
          </h1>
          <p className="hero-intro mt-6 max-w-sm text-sm leading-relaxed sm:text-base">
            Saya Muhammad Ulil Azmi seorang siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan yang membangun website modern, rapi, cepat, dan responsive.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#projects" className="hero-primary-action inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold">
              Lihat Project <LuArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#contact" className="hero-secondary-action inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold">
              Hubungi Saya <LuArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2" data-aos="fade-up" data-aos-delay="150">
          <div
            ref={photoRef}
            onPointerMove={handlePhotoPointerMove}
            onPointerLeave={resetPhotoTilt}
            className="hero-photo-float relative aspect-square w-[min(78vw,27rem)]"
          >
            <div className="hero-photo-circle absolute inset-[4%] rounded-full" />
            <div className="hero-photo-halo absolute inset-0 rounded-full border" />
            <img src="/profil.png" alt="Foto Azmi" width={420} height={420} className="hero-photo-image absolute inset-[7%] h-[86%] w-[86%] rounded-full object-cover object-[center_25%]" />
            <div className="hero-photo-tag absolute bottom-[10%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Web Developer</div>
          </div>
        </div>

        <div className="order-3 text-center lg:text-left" data-aos="fade-up" data-aos-delay="300">
          <p className="hero-open-label text-sm font-bold italic uppercase tracking-[0.2em]">Open to Work</p>
          <p className="hero-year mt-1 text-6xl font-black leading-none sm:text-7xl">2026</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em]">Fullstack Developer</p>
          <div className="hero-detail-list mt-8 space-y-4 text-sm">
            <p><strong>Focus</strong><span>Web &amp; UI/UX</span></p>
            <p><strong>Based in</strong><span>Pasuruan, Indonesia</span></p>
            <p><strong>School</strong><span>SMKN 1 Pasuruan</span></p>
          </div>
          <div className="mt-8 flex justify-center gap-3 lg:justify-start">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={`Open ${name}`} title={name} className="hero-social-link grid h-10 w-10 place-items-center rounded-full border transition-all hover:-translate-y-1">
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
