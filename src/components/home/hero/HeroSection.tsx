import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { LuArrowDown, LuArrowRight } from "react-icons/lu";
import HeroPhoto from "./HeroPhoto";

const socialLinks = [
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/qzmiuu/" },
  { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/@azmii.hh" },
  { name: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/channel/UConwuD3udrqXVXSU_BiB8Jg" },
];

export default function HeroSection() {
  return (
    <section className="hero-section relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:min-h-screen lg:px-12 lg:py-20">
      <div className="hero-pattern absolute inset-0 z-0" />
      <div className="hero-layout relative z-10 mx-auto grid w-full max-w-350 items-center gap-10 lg:grid-cols-[minmax(220px,0.85fr)_minmax(280px,1.3fr)_minmax(220px,0.75fr)] lg:gap-8">
        <div className="order-2 text-center lg:order-1 lg:text-left" data-aos="fade-up">
          <p className="hero-reference-label mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Web Developer <span aria-hidden="true">•</span> Open to Work</p>
          <h1 className="hero-title flex max-w-md flex-col text-6xl font-black uppercase leading-[0.82] tracking-normal sm:text-7xl lg:text-7xl xl:text-8xl">
            <span>Ulil</span>
            <span>Azmi</span>
          </h1>
          <p className="hero-intro mt-6 max-w-sm text-sm leading-relaxed sm:text-base">
            Saya Muhammad Ulil Azmi, siswa Rekayasa Perangkat Lunak di SMKN 1 Pasuruan yang berfokus membangun website modern, rapi, cepat, dan responsif.
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
          <HeroPhoto />
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
