"use client";
import 'aos/dist/aos.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AnimationLayout({
    children,
    skipIntro = false,
}: {
    children: React.ReactNode;
    skipIntro?: boolean;
}) {
    const [isIntroVisible, setIsIntroVisible] = useState(!skipIntro);
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;
        void import("aos").then(({ default: AOS }) => {
            if (cancelled) return;
            AOS.init({
                duration: 900,
                easing: "ease-out-cubic",
                offset: 80,
                once: true,
                anchorPlacement: "top-center",
            });
        });

        // Splash boleh dilewati, tetapi AOS tetap harus aktif agar konten tidak tersembunyi.
        if (skipIntro) return () => { cancelled = true; };

        const introTimer = window.setTimeout(() => {
            setIsIntroLeaving(true);
        }, 500);
        const removeIntroTimer = window.setTimeout(() => {
            setIsIntroVisible(false);
            // Setelah intro selesai, tandai agar tidak muncul lagi selama sesi ini
            // Cookie sesi (tanpa Max-Age) — akan otomatis terhapus saat browser ditutup
            document.cookie = 'portfolioIntroSeen=1; path=/; SameSite=Lax';
        }, 750);

        return () => {
            cancelled = true;
            window.clearTimeout(introTimer);
            window.clearTimeout(removeIntroTimer);
        };
    }, [skipIntro]);

    useEffect(() => {
        void import("aos").then(({ default: AOS }) => AOS.refreshHard());
    }, [pathname]);

    return (
        <>
            {isIntroVisible && (
                <div
                    aria-label="Memuat portofolio"
                    className={`intro-screen${isIntroLeaving ? " intro-screen--leaving" : ""}`}
                    role="status"
                >
                    <div className="intro-loading-content">
                        <span className="intro-loader" aria-hidden="true" />
                        <p className="intro-label">Memuat portofolio</p>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}
