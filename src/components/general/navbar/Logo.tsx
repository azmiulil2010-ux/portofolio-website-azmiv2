"use client";

import Link from "next/link";
import { LuCodeXml } from "react-icons/lu";

export default function Logo() {
  return (
    <Link
      href="/#home"
      className="brand-logo group flex items-center space-x-2.5 transition-transform duration-300 hover:scale-105"
      aria-label="Azmi.dev - Kembali ke Beranda"
    >
      <div className="brand-logo-mark relative grid h-10 w-10 place-items-center rounded-xl border border-orange-500/50 bg-orange-50 text-orange-600 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:scale-105 group-hover:shadow-md dark:border-orange-500/40 dark:bg-slate-900/90 dark:text-orange-400 dark:shadow-[0_0_15px_rgba(255,98,0,0.3)]">
        <LuCodeXml size={20} className="transition-transform duration-300 group-hover:rotate-12" />
      </div>
      <div className="flex flex-col">
        <span className="brand-logo-text font-black tracking-wide text-slate-950 dark:text-white md:text-xl transition-colors duration-300">
          Azmi<span className="text-orange-500">.</span>dev
        </span>
        <span className="brand-logo-sub text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 -mt-1 hidden sm:block transition-colors duration-300">
          Portfolio
        </span>
      </div>
    </Link>
  );
}