"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Sparkles,
  ChevronDown,
  X,
  Volume2,
  VolumeX,
  Compass,
  ArrowUp,
  MessageSquare,
} from "lucide-react";
import { robotAudio } from "@/lib/robotSoundSynth";
import { ROBOT_SKINS, RobotSkinId } from "@/lib/robotSkins";
import { useLanguage } from "@/context/LanguageContext";

export default function RobotCompanionDrone() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentSpeech, setCurrentSpeech] = useState<string>("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [skinId, setSkinId] = useState<RobotSkinId>("orange");
  const [isInteracting, setIsInteracting] = useState(false);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getSectionComment = useCallback(
    (section: string) => {
      switch (section) {
        case "about":
          return t("droneAbout");
        case "services":
          return t("droneServices");
        case "skills":
          return t("droneSkills");
        case "projects":
          return t("droneProjects");
        case "contact":
          return t("droneContact");
        case "home":
        default:
          return t("robotGreeting");
      }
    },
    [t]
  );

  useEffect(() => {
    setCurrentSpeech(getSectionComment(activeSection));
  }, [language, activeSection, getSectionComment]);

  // Sync mute state on mount
  useEffect(() => {
    setIsMuted(robotAudio.isMuted());
    const handleStorage = () => {
      const savedSkin = (localStorage.getItem("robot_active_skin") as RobotSkinId) || "orange";
      if (ROBOT_SKINS[savedSkin]) setSkinId(savedSkin);
    };
    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const show = scrollY > 380;
      setIsVisible(show);

      const sections = ["contact", "projects", "skills", "services", "about", "home"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
              setCurrentSpeech(getSectionComment(sectionId));
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, getSectionComment]);

  const handleDroneClick = useCallback(() => {
    robotAudio.playRobotBeep(840, 0.1);
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 600);

    setCurrentSpeech(getSectionComment(activeSection));

    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
  }, [activeSection, getSectionComment]);

  const handleToggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = robotAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleNavigate = (targetId: string) => {
    robotAudio.playRobotBeep(640, 0.08);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeSkin = ROBOT_SKINS[skinId] || ROBOT_SKINS.orange;

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Asisten Robot Portofolio"
      className="robot-companion-drone-root fixed bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end select-none pointer-events-none"
    >
      {/* 1. SPEECH BUBBLE */}
      {!isMinimized && currentSpeech && (
        <div className="speech-container pointer-events-auto mb-2 max-w-[270px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative rounded-2xl border border-orange-500/40 bg-slate-950/90 dark:bg-slate-950/95 p-3 text-xs text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* Header row */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-orange-500/20">
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-orange-400">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeSkin.dotColor }}
                />
                Azmi Companion • {activeSection.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleToggleSound}
                  type="button"
                  className="rounded p-1 text-slate-400 hover:text-orange-400 transition-colors"
                  title={isMuted ? "Aktifkan Suara Robot" : "Matikan Suara Robot"}
                  aria-label={isMuted ? "Aktifkan Suara Robot" : "Matikan Suara Robot"}
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  type="button"
                  className="rounded p-1 text-slate-400 hover:text-orange-400 transition-colors"
                  title="Sembunyikan pesan"
                  aria-label="Sembunyikan pesan"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Speech message */}
            <p className="text-[11.5px] leading-relaxed text-slate-200">{currentSpeech}</p>

            {/* Quick action buttons inside speech */}
            <div className="mt-2.5 flex flex-wrap gap-1 pt-1 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleNavigate("projects")}
                className="rounded-full bg-slate-900 border border-orange-500/30 px-2 py-0.5 text-[10px] font-medium text-orange-300 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              >
                🚀 {t("navProjects")}
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("skills")}
                className="rounded-full bg-slate-900 border border-orange-500/30 px-2 py-0.5 text-[10px] font-medium text-orange-300 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              >
                ⚡ {t("navSkills")}
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("contact")}
                className="rounded-full bg-slate-900 border border-orange-500/30 px-2 py-0.5 text-[10px] font-medium text-orange-300 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              >
                📬 {t("navContact")}
              </button>
            </div>

            {/* Little speech tail pointing towards drone */}
            <div className="absolute -bottom-2 right-6 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-slate-950/90" />
          </div>
        </div>
      )}

      {/* 2. FLOATING DRONE AVATAR */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Toggle Speech if minimized */}
        {isMinimized && (
          <button
            type="button"
            onClick={() => {
              setIsMinimized(false);
              handleDroneClick();
            }}
            className="flex items-center gap-1 rounded-full border border-orange-500/40 bg-slate-950/90 px-2.5 py-1 text-[11px] font-bold text-orange-400 shadow-lg backdrop-blur-md hover:bg-slate-900 transition-all cursor-pointer animate-in fade-in"
          >
            <MessageSquare size={12} />
            <span>Chat</span>
          </button>
        )}

        {/* Drone Body Button */}
        <button
          type="button"
          onClick={handleDroneClick}
          aria-label="Interaksi dengan Robot Companion"
          title="Klik untuk berinteraksi dengan Azmi-Bot!"
          className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-slate-950/95 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isInteracting ? "scale-110 -translate-y-1 rotate-3" : "hover:scale-105 hover:-translate-y-0.5"
          }`}
          style={{
            borderColor: `${activeSkin.dotColor}88`,
            boxShadow: `0 0 25px ${activeSkin.dotColor}40`,
          }}
        >
          {/* Animated Ambient Pulsing Radar Ring */}
          <span
            className="absolute -inset-1 rounded-2xl opacity-40 animate-ping pointer-events-none"
            style={{ borderColor: activeSkin.dotColor, borderWidth: 1 }}
          />

          {/* SVG Robot Drone Illustration */}
          <svg
            viewBox="0 0 64 64"
            className="h-10 w-10 transition-transform duration-300 group-hover:rotate-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hover Wings / Jet Rotors */}
            <ellipse cx="12" cy="20" rx="9" ry="3" fill="#334155" opacity="0.8" />
            <ellipse cx="52" cy="20" rx="9" ry="3" fill="#334155" opacity="0.8" />
            <circle cx="12" cy="20" r="2.5" fill={activeSkin.dotColor} />
            <circle cx="52" cy="20" r="2.5" fill={activeSkin.dotColor} />

            {/* Upper Antenna */}
            <path d="M32 16V8" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="7" r="3" fill={activeSkin.dotColor} className="animate-pulse" />

            {/* Main Robot Helmet / Dome */}
            <rect x="16" y="16" width="32" height="28" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

            {/* Cyber Visor Screen */}
            <rect x="20" y="22" width="24" height="15" rx="6" fill="#090d16" />

            {/* Glowing Digital Eyes */}
            <ellipse cx="27" cy="29" rx="3" ry="4" fill="#00f0ff" className="animate-pulse" />
            <ellipse cx="37" cy="29" rx="3" ry="4" fill="#00f0ff" className="animate-pulse" />

            {/* Cyber Smile / Status Notch */}
            <path d="M29 34Q32 36 35 34" stroke={activeSkin.dotColor} strokeWidth="1.5" strokeLinecap="round" />

            {/* Chest Arc Reactor */}
            <circle cx="32" cy="46" r="3" fill={activeSkin.dotColor} />

            {/* Bottom Antigravity Thruster Glow */}
            <path
              d="M26 48L32 58L38 48Z"
              fill={activeSkin.dotColor}
              opacity="0.85"
              className="animate-pulse"
            />
          </svg>

          {/* Micro Notification Dot */}
          <span
            className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-md"
            style={{ backgroundColor: activeSkin.dotColor }}
          >
            !
          </span>
        </button>
      </div>
    </aside>
  );
}
