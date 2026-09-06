import Link from "next/link"
import { navLinks } from "./Navbar"
import LinkButton from"../LinkButton"
import { LuDownload } from "react-icons/lu"

interface MobileNavProps {
    navOpen:boolean
    setNavOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileNav({navOpen, setNavOpen}:MobileNavProps) {
    const showMobileNav = navOpen ? "translate-x-0" : "translate-x-[100%]"
    return (
        <>
        {/* InsetBavkground */}
        <div className={`fixed inset-0 transform right-0 z-50 bg-black opacity-30 w-full h-screen transition-all 
        duration-500 ${showMobileNav} lg:hidden`}>

        </div>
        {/* NavLinks */}
            <ul className={`fixed flex items-center justify-center text-white flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%]
            bg-slate-800 space-y-1 z-80 right-0 top-0 ${showMobileNav} lg:hidden`}>
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
                        href="/documents/cv.pdf"
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