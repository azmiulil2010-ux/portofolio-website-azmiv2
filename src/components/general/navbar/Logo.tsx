import Link from "next/link";
import { LuCodeXml } from 'react-icons/lu';

export default function Logo() {
    return (
        <Link href="/" className="brand-logo flex items-center space-x-2">
            <div className="brand-logo-mark w-10 h-10 bg-gray-200 rounded-full grid place-items-center">
                <LuCodeXml />
            </div>
            <p className="text-gray-200 font-bold md:text-2xl hidden sm:block">
                Portfolio Azmi
            </p>
        </Link>
    )
}