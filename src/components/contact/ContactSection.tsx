"use client";

import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkedAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { LuSend, LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  {
    name: "Instagram",
    icon: <FaInstagram />,
    value: "qzmiuu",
    link: "https://www.instagram.com/qzmiuu/",
    color: "group-hover:text-pink-400 group-hover:border-pink-400/40",
    glow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]",
  },
  {
    name: "TikTok",
    icon: <FaTiktok />,
    value: "44zmii",
    link: "https://www.tiktok.com/@azmii.hh",
    color: "group-hover:text-cyan-400 group-hover:border-cyan-400/40",
    glow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    value: "Azmi Tech",
    link: "https://www.youtube.com/channel/UConwuD3udrqXVXSU_BiB8Jg",
    color: "group-hover:text-red-400 group-hover:border-red-400/40",
    glow: "group-hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
  },
];

export default function ContactSection() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "azmiulil2010@gmail.com",
      link: "mailto:azmiulil2010@gmail.com",
    },
    {
      icon: <FaMapMarkedAlt className="w-5 h-5" />,
      title: t("locationChip"),
      value: t("contactLocationFull"),
      link: "https://maps.google.com/?q=Pasuruan,+Jawa+Timur",
    },
  ];

  return (
    <section className="relative py-14 sm:py-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="mx-auto w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left Column */}
        <div data-aos="fade-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
            <LuSend size={12} />
            <span>{t("contactGetInTouch")}</span>
          </div>

          <h2 className="py-4 text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-cyan-100 dark:to-indigo-300">
            {t("contactCritiqueTitle")}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
            {t("contactCritiqueDesc")}
          </p>

          {/* Contact Methods */}
          <div className="space-y-4 mb-8">
            {contactInfo.map((items, index) => (
              <Link
                href={items.link}
                key={index}
                className="group flex items-center gap-4 p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] grid place-items-center shrink-0">
                  {items.icon}
                </div>
                <div className="overflow-hidden flex-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {items.title}
                  </h3>
                  <p className="text-sm font-semibold text-white truncate">
                    {items.value}
                  </p>
                </div>
                <LuArrowUpRight size={16} className="text-slate-600 transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </Link>
            ))}
          </div>

          {/* Social Channels */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t("socialChannels")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  href={social.link}
                  key={social.name}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className={`group flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 ${social.color} ${social.glow}`}
                >
                  <span className="text-lg transition-transform group-hover:scale-110">
                    {social.icon}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white leading-none">
                      {social.name}
                    </span>
                    <span className="text-[0.65rem] text-slate-400 leading-tight">
                      @{social.value}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div data-aos="fade-left">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
