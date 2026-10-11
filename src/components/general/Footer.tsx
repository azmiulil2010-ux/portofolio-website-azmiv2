"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope } from "react-icons/fa";
import { LuArrowUpRight, LuHeart, LuCode } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const footerSocials = [
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/qzmiuu/", hoverColor: "hover:text-pink-500 hover:border-pink-500/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]" },
  { name: "TikTok", icon: FaTiktok, url: "https://www.tiktok.com/@azmii.hh", hoverColor: "hover:text-orange-500 hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]" },
  { name: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/channel/UConwuD3udrqXVXSU_BiB8Jg", hoverColor: "hover:text-red-500 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" },
  { name: "Email", icon: FaEnvelope, url: "mailto:azmiulil2010@gmail.com", hoverColor: "hover:text-amber-500 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("navHome"), url: "/#home" },
    { label: t("navAbout"), url: "/#about" },
    { label: t("navServices"), url: "/#services" },
    { label: t("navSkills"), url: "/#skills" },
    { label: t("navProjects"), url: "/#projects" },
    { label: t("navContact"), url: "/#contact" },
  ];

  return (
    <footer className="site-footer relative overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800/60 dark:bg-slate-950/90 transition-colors duration-300">
      {/* Subtle top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto w-[90%] max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-3 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/20">
                <LuCode size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-950 dark:text-white transition-colors duration-300">
                Azmi<span className="text-orange-500">.</span>Dev
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">
              {t("footerBrandDesc")}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {footerSocials.map(({ name, icon: Icon, url, hoverColor }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className={`grid h-9 w-9 place-items-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 transition-all duration-300 hover:-translate-y-0.5 ${hoverColor}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              {t("footerQuickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, url }) => (
                <li key={url}>
                  <Link
                    href={url}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-400 transition-colors duration-200 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-700 transition-colors group-hover:bg-orange-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA Column */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              {t("footerGetInTouch")}
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">
              {t("footerCtaDesc")}
            </p>
            <a
              href="mailto:azmiulil2010@gmail.com"
              className="group inline-flex items-center gap-2 rounded-lg border border-orange-400/40 bg-orange-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-md"
            >
              <FaEnvelope size={13} />
              <span>azmiulil2010@gmail.com</span>
              <LuArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Tech Stack mini badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Next.js", "React", "TypeScript", "Tailwind"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/50 dark:text-slate-400 px-2 py-0.5 text-[0.6rem] font-semibold transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800/60 py-6 sm:flex-row transition-colors duration-300">
          <p className="footer-copy flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-500">
            &copy; {year} {t("footerCopyText")}
          </p>
          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-600">
            {t("designedDevelopedBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}