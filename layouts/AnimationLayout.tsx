"use client";
import AOS from 'aos';
import 'aos/dist/aos.css';
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
}: {
    children: React.ReactNode;
}) {
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    const [splashPhase, setSplashPhase] = useState<SplashPhase>('loading');
    const [greetingIndex, setGreetingIndex] = useState(0);

    useEffect(() => {
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
        }, 5200);

        const initAOS = async () => {
            await import("aos");
            AOS.init({
                duration: 1000,
                easing: "ease",
                once: true,
                anchorPlacement: "top-center",
            });
        };

        initAOS();

        return () => {
            window.clearInterval(greetingTimer);
            window.clearTimeout(greetingPhaseTimer);
            window.clearTimeout(introTimer);
            window.clearTimeout(removeIntroTimer);
        };
    }, []);

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
