import Link from "next/link"
import { navLinks } from "./Navbar"
import LinkButton from"../LinkButton"
import { LuDownload, LuX } from "react-icons/lu"

interface MobileNavProps {
    navOpen:boolean
    setNavOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNav({navOpen, setNavOpen}:MobileNavProps) {
    const panelTransform = navOpen ? "translate-x-0" : "translate-x-full"
    const backdropVisibility = navOpen
        ? "pointer-events-auto opacity-30"
        : "pointer-events-none opacity-0"
    return (
        <>
            <div
                onClick={() => setNavOpen(false)}
                className={`fixed inset-0 right-0 z-55 h-screen w-full bg-black transition-opacity duration-300 ease-in-out ${backdropVisibility} lg:hidden`}
            />
            <ul className={`fixed right-0 top-0 z-60 flex h-full w-[80%] transform flex-col items-center justify-center space-y-1 bg-slate-800 text-white transition-transform duration-300 ease-in-out sm:w-[60%] ${panelTransform} lg:hidden`}>
                <button
                    type="button"
                    onClick={() => setNavOpen(false)}
                    aria-label="Tutup menu navigasi"
                    className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-slate-700 hover:text-cyan-300"
                >
                    <LuX size={28} aria-hidden="true" />
                </button>
                {navLinks.map((link) => {
                    return (
                        <li key={link.url}>
                            <Link
                            onClick={() => setNavOpen(false)}
                                href={link.url}
                                className="flex w-full items-center justify-center rounded-lg border-b border-slate-700/30 px-6 py-4 text-center text-xl font-medium text-white transition-all duration-300 hover:bg-slate-700/50 hover:text-cyan-300"
                            >
                                {link.label}
                            </Link>
                        </li>
                    )
                })}
                <div className="my-4">
                    <LinkButton
                        href="/cv.png"
                        text="Download CV"
                        download
                        icon={LuDownload}
                        iconPosition="left"
                        rounded={false}
                        />
                    </div>
                
            </ul>
        </>
    )
}