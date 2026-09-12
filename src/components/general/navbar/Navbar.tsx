"use client";
import { LuDownload, LuMenu, LuMoon, LuSun } from "react-icons/lu";
import LinkButton from "../LinkButton";
import Logo from "./Logo";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navLinks } from "./navLinks";

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const [navBackground, setNavBackground] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const darkMode = savedTheme ? savedTheme === "dark" : prefersDark;

        setIsDarkMode(darkMode);
        document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDarkMode;
        setIsDarkMode(nextTheme);
        document.documentElement.dataset.theme = nextTheme ? "dark" : "light";
        window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    };

    useEffect(() => {
        const navHandler = () => {
            if(window.scrollY >= 90) setNavBackground(true);
            if(window.scrollY < 90) setNavBackground(false);
        }

        window.addEventListener("scroll", navHandler);

        return () => {
        window.removeEventListener("scroll", navHandler);
        }
    },[])
    return (
        <nav className={`h-18 fixed z-50 w-full transition-all duration-300 ${
        navBackground ? "bg-slate-900 shadow-md" : ""}`}>
            <div className="flex items-center h-full justify-between w-[90%] mx-auto">
                {/* LOGO */}
                <Logo />

                {/* nav-links */}
                <ul className="hidden lg:flex space-x-10">
                    {navLinks.map((link) => {
                        return (
                            <li key={link.url}>
                                <Link
                                    className={`font-medium transition-colors duration-300 hover:text-cyan-500 ${pathname === link.url ? "text-cyan-400" : "text-gray-200"}`}
                                    href={link.url}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDarkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
                        title={isDarkMode ? "Mode terang" : "Mode gelap"}
                        className="grid h-9 w-9 place-items-center rounded-full text-gray-200 transition-colors hover:bg-white/10 hover:text-cyan-400"
                    >
                        {isDarkMode ? <LuSun size={19} /> : <LuMoon size={19} />}
                    </button>
                    <div className="hidden lg:block">
                        <LinkButton
                            href="/cv.png"
                            text="Download CV"
                            download
                            icon={LuDownload}
                            iconPosition="left"
                            rounded={false}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setNavOpen(!navOpen)}
                        aria-label="Buka menu navigasi"
                        className="h-8 w-8 cursor-pointer text-white lg:hidden"
                    >
                        <LuMenu size={30} />
                    </button>
                </div>
                <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
            </div>
        </nav>
    )
}