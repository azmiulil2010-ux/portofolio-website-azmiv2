"use client";

import Typewriter from "typewriter-effect";

export default function AnimatedIntro() {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="min-h-20 px-0 py-5 text-center text-base font-medium leading-relaxed text-gray-400 sm:text-lg lg:text-left"
        >
            <p>Saya adalah Muhammad Ulil Azmi, siswa SMK Negeri 1 Pasuruan yang fokus mempelajari Rekayasa Perangkat Lunak (RPL)</p>
            <span className="mt-2 block text-xl font-bold text-indigo-400 sm:text-2xl">
                <Typewriter
                    options={{
                        strings: [
                            "Fullstack Developer",
                            "Next.js Developer",
                            "React Expert",
                            "UI/UX Designer",
                            "Tech Enthusiast",
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 50,
                        wrapperClassName: "inline-block",
                    }}
                />
            </span>
        </div>
    )
}