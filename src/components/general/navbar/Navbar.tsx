"use client";
import { LuDownload, LuMenu, LuX } from "react-icons/lu";
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

                {/* Button */}
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
                className="w-8 h-8 cursor-pointer text-white z-100 lg:hidden">
                    {navOpen ? <LuX size={30} /> : <LuMenu size={30} />}
                </button>
                <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
            </div>
        </nav>
    )
}