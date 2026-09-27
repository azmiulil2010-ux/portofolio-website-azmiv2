"use client";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const greetings = [
    'Selamat datang',
    'Welcome',
    'Sugeng Rawuh',
    'Bienvenue',
    'Willkommen',
    'Konnichiwa',
    'Ni Hao',
    'Yokoso',
    'Eoseo oseyo',
    'Karibu',
];

type SplashPhase = 'loading' | 'greeting';

export default function AnimationLayout({
    children,
    skipIntro = false,
}: {
    children: React.ReactNode;
    skipIntro?: boolean;
}) {
    const [isIntroVisible, setIsIntroVisible] = useState(!skipIntro);
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    const [splashPhase, setSplashPhase] = useState<SplashPhase>('loading');
    const [greetingIndex, setGreetingIndex] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const initAOS = async () => {
            await import("aos");
            AOS.init({
                duration: 900,
                easing: "ease-out-cubic",
                offset: 80,
                once: true,
                anchorPlacement: "top-center",
            });
        };

        initAOS();

        // Splash boleh dilewati, tetapi AOS tetap harus aktif agar konten tidak tersembunyi.
        if (skipIntro) return;

        const greetingTimer = window.setInterval(() => {
            setGreetingIndex((currentIndex) => (currentIndex + 1) % greetings.length);
        }, 300);
        const greetingPhaseTimer = window.setTimeout(() => {
            setSplashPhase('greeting');
        }, 1500);
        const introTimer = window.setTimeout(() => {
            setIsIntroLeaving(true);
        }, 4700);
        const removeIntroTimer = window.setTimeout(() => {
            setIsIntroVisible(false);
            // Setelah intro selesai, tandai agar tidak muncul lagi selama sesi ini
            // Cookie sesi (tanpa Max-Age) — akan otomatis terhapus saat browser ditutup
            document.cookie = 'portfolioIntroSeen=1; path=/; SameSite=Lax';
        }, 5200);

        return () => {
            window.clearInterval(greetingTimer);
            window.clearTimeout(greetingPhaseTimer);
            window.clearTimeout(introTimer);
            window.clearTimeout(removeIntroTimer);
        };
    }, [skipIntro]);

    useEffect(() => {
        AOS.refreshHard();
    }, [pathname]);

    return (
        <>
            {isIntroVisible && (
                <div
                    aria-label={splashPhase === 'loading' ? 'Loading portfolio' : 'Welcome'}
                    className={`intro-screen intro-screen--${splashPhase}${isIntroLeaving ? " intro-screen--leaving" : ""}`}
                    role="status"
                >
                    {splashPhase === 'loading' ? (
                        <div className="intro-loading-content">
                            <div className="intro-mark" aria-hidden="true">
                                A
                            </div>
                            <div className="intro-loader" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div>
                            <p className="intro-label">Loading portfolio</p>
                        </div>
                    ) : (
                        <div className="intro-greeting-content">
                            <p className="intro-kicker">Welcome to my portfolio</p>
                            <p className="intro-greeting" aria-live="polite" key={greetings[greetingIndex]}>
                                {greetings[greetingIndex]}
                            </p>
                            <span className="intro-greeting-line" aria-hidden="true" />
                        </div>
                    )}
                </div>
            )}
            {children}
        </>
    );
}
