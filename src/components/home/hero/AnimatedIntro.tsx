"use client";

export default function AnimatedIntro() {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="hero-intro min-h-20 px-0 py-5 text-center text-base font-medium leading-relaxed text-gray-400 sm:text-lg lg:text-left"
        >
            <p>Saya adalah Muhammad Ulil Azmi, siswa SMK Negeri 1 Pasuruan yang fokus mempelajari Rekayasa Perangkat Lunak (RPL)</p>
            <span className="hero-typewriter mt-2 block text-xl font-bold text-indigo-400 sm:text-2xl">
                Fullstack Developer &middot; Next.js &middot; UI/UX Designer
            </span>
        </div>
    )
}