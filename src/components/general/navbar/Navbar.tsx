"use client";
import { LuDownload, LuMenu, LuMoon, LuSun, LuX } from "react-icons/lu";
import LinkButton from "../LinkButton";
import Logo from "./Logo";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

export const navLinks = [
    {url:"#home",label:"Home"},
    {url:"#services",label:"Services"},
    {url:"#resume",label:"Resume"},
    {url:"#projects",label:"Projects"},
    {url:"#skills",label:"Skills"},
    {url:"#contact",label:"Contact"},
]

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const [navBackground, setNavBackground] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

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
                                <Link className="text-gray-200 hover:text-cyan-500 font-medium transition-colors duration-300" href={link.url}>{link.label}</Link>
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
                            href="/documents/cv.pdf"
                            text="Download CV"
                            download
                            icon={LuDownload}
                            iconPosition="left"
                            rounded={false}
                        />
                    </div>
                    <button
                        onClick={() => setNavOpen(!navOpen)}
                        className="h-8 w-8 cursor-pointer text-white lg:hidden"
                    >
                        {navOpen ? <LuX size={30} /> : <LuMenu size={30} />}
                    </button>
                </div>
                <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
            </div>
        </nav>
    )
}