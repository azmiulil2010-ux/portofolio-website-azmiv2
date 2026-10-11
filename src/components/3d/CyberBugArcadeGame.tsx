"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  Zap,
  CheckCircle2,
  Sparkles,
  Rocket,
  Shield,
  Play,
} from "lucide-react";
import { robotAudio } from "@/lib/robotSoundSynth";
import { ROBOT_SKINS, RobotSkinId } from "@/lib/robotSkins";
import { useLanguage } from "@/context/LanguageContext";

interface CyberBugArcadeGameProps {
  isOpen: boolean;
  onClose: () => void;
  activeSkin: RobotSkinId;
  onGameWin?: (score: number) => void;
}

// Tech Stacks directly from Azmi's portfolio & SMKN 1 Pasuruan
interface TechItemDef {
  name: string;
  short: string;
  category: "frontend" | "backend" | "tool";
  color: string;
  glowColor: string;
  points: number;
  projectBoost: number;
}

const AZMI_TECH_STACKS: TechItemDef[] = [
  { name: "Next.js 16", short: "N", category: "frontend", color: "#f8fafc", glowColor: "rgba(255,255,255,0.8)", points: 150, projectBoost: 22 },
  { name: "React 19", short: "⚛", category: "frontend", color: "#00d8ff", glowColor: "rgba(0,216,255,0.8)", points: 130, projectBoost: 18 },
  { name: "TypeScript", short: "TS", category: "frontend", color: "#3178c6", glowColor: "rgba(49,120,198,0.8)", points: 120, projectBoost: 16 },
  { name: "Tailwind", short: "TW", category: "frontend", color: "#38bdf8", glowColor: "rgba(56,189,248,0.8)", points: 100, projectBoost: 14 },
  { name: "Supabase", short: "⚡", category: "backend", color: "#3ecf8e", glowColor: "rgba(62,207,142,0.8)", points: 140, projectBoost: 20 },
  { name: "Python", short: "Py", category: "backend", color: "#ffd43b", glowColor: "rgba(255,212,59,0.8)", points: 110, projectBoost: 15 },
  { name: "Figma UI", short: "Fg", category: "tool", color: "#a259ff", glowColor: "rgba(162,89,255,0.8)", points: 100, projectBoost: 14 },
  { name: "XAMPP", short: "DB", category: "backend", color: "#fb923c", glowColor: "rgba(251,146,60,0.8)", points: 90, projectBoost: 12 },
];

const AZMI_PROJECTS = [
  { id: 1, title: "Portofolio 3D Robot Next.js", school: "SMKN 1 Pasuruan", icon: "🤖", targetBoost: 100 },
  { id: 2, title: "Fullstack Supabase & Next.js App", school: "SMKN 1 Pasuruan", icon: "🌐", targetBoost: 100 },
  { id: 3, title: "Modern UI/UX Responsive Website", school: "SMKN 1 Pasuruan", icon: "🎨", targetBoost: 100 },
  { id: 4, title: "Production Cloud Database System", school: "SMKN 1 Pasuruan", icon: "⚡", targetBoost: 100 },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
  scale: number;
}

interface GameEntity {
  id: number;
  kind: "tech" | "bug";
  subType: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  short: string;
  color: string;
  glowColor: string;
  points: number;
  projectBoost: number;
  hp: number;
  maxHp: number;
  rotation: number;
  vRot: number;
  pulsePhase: number;
}

export default function CyberBugArcadeGame({
  isOpen,
  onClose,
  activeSkin,
  onGameWin,
}: CyberBugArcadeGameProps) {
  const { language } = useLanguage();
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);
  const [projectsDeployed, setProjectsDeployed] = useState(0);
  const [empCooldown, setEmpCooldown] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const entitiesRef = useRef<GameEntity[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const animIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const entityIdCounter = useRef(1);

  // Crosshair laser visuals
  const laserRaysRef = useRef<{ x1: number; y1: number; x2: number; y2: number; alpha: number; color: string }[]>([]);

  // Sound & skin
  const activeSkinConfig = ROBOT_SKINS[activeSkin] || ROBOT_SKINS.orange;
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMuted(robotAudio.isMuted());
  }, []);

  // Spawn Entity Logic
  const spawnEntity = useCallback((canvasWidth: number, canvasHeight: number) => {
    // 70% chance tech stack, 30% chance bug
    const isTech = Math.random() < 0.72;
    const padding = 50;
    const x = padding + Math.random() * (canvasWidth - padding * 2);
    const y = -40; // Spawns from top and floats down with gentle swing

    const speed = 75 + Math.random() * 85;
    const vy = speed;
    const vx = (Math.random() - 0.5) * 45;

    if (isTech) {
      const tech = AZMI_TECH_STACKS[Math.floor(Math.random() * AZMI_TECH_STACKS.length)];
      const entity: GameEntity = {
        id: entityIdCounter.current++,
        kind: "tech",
        subType: tech.name,
        x,
        y,
        vx,
        vy,
        radius: 30,
        label: tech.name,
        short: tech.short,
        color: tech.color,
        glowColor: tech.glowColor,
        points: tech.points,
        projectBoost: tech.projectBoost,
        hp: 1,
        maxHp: 1,
        rotation: 0,
        vRot: (Math.random() - 0.5) * 1.5,
        pulsePhase: Math.random() * Math.PI,
      };
      entitiesRef.current.push(entity);
    } else {
      const bugTypes = [
        { label: "SyntaxError", color: "#ef4444", hp: 1, points: 100, speedMult: 1.1 },
        { label: "MemoryLeak", color: "#f59e0b", hp: 1, points: 160, speedMult: 1.4 },
        { label: "MergeConflict", color: "#ec4899", hp: 2, points: 240, speedMult: 0.9 },
      ];
      const bug = bugTypes[Math.floor(Math.random() * bugTypes.length)];
      const entity: GameEntity = {
        id: entityIdCounter.current++,
        kind: "bug",
        subType: bug.label,
        x,
        y,
        vx: vx * bug.speedMult,
        vy: vy * bug.speedMult,
        radius: 32,
        label: bug.label,
        short: "🐞",
        color: bug.color,
        glowColor: bug.color,
        points: bug.points,
        projectBoost: 10,
        hp: bug.hp,
        maxHp: bug.hp,
        rotation: 0,
        vRot: (Math.random() - 0.5) * 2.2,
        pulsePhase: Math.random() * Math.PI,
      };
      entitiesRef.current.push(entity);
    }
  }, []);

  // Add Particle Burst
  const addParticles = useCallback((x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 180;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 3.5,
        color,
        alpha: 1,
        decay: 1.8 + Math.random() * 1.5,
      });
    }
  }, []);

  // Add Floating Text
  const addFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
    floatingTextsRef.current.push({
      x,
      y,
      text,
      color,
      alpha: 1,
      vy: -55,
      scale: 1.2,
    });
  }, []);

  // Clean Code EMP Blast (Cooldown 6s or Spacebar)
  const triggerEmpBlast = useCallback(() => {
    if (gameState !== "playing" || empCooldown > 0) return;
    robotAudio.playTurboWhoosh();
    setEmpCooldown(6);

    const canvas = canvasRef.current;
    if (!canvas) return;

    let clearedPoints = 0;
    entitiesRef.current.forEach((entity) => {
      addParticles(entity.x, entity.y, entity.color, 20);
      clearedPoints += entity.points;
    });

    entitiesRef.current = [];
    setScore((s) => s + clearedPoints + 300);
    setCombo((c) => c + 3);
    addFloatingText(canvas.width / 2, canvas.height / 2, "⚡ EMP OVERCLOCK CLEARED! +300 PTS", "#38bdf8");
  }, [gameState, empCooldown, addParticles, addFloatingText]);

  // Main Hit / Click Handler
  const handleCanvasInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (gameState !== "playing") return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = (clientX - rect.left) * (canvas.width / rect.width);
      const clickY = (clientY - rect.top) * (canvas.height / rect.height);

      // Add a cyber laser beam from bottom center to click target
      laserRaysRef.current.push({
        x1: canvas.width / 2,
        y1: canvas.height,
        x2: clickX,
        y2: clickY,
        alpha: 0.9,
        color: activeSkinConfig.dotColor,
      });

      // Hit test entities (checking top-most first)
      let hitIdx = -1;
      for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
        const ent = entitiesRef.current[i];
        const dist = Math.hypot(clickX - ent.x, clickY - ent.y);
        if (dist <= ent.radius + 14) {
          hitIdx = i;
          break;
        }
      }

      if (hitIdx >= 0) {
        const hitEntity = entitiesRef.current[hitIdx];
        const newHp = hitEntity.hp - 1;

        if (newHp <= 0) {
          // Entity destroyed / collected!
          entitiesRef.current.splice(hitIdx, 1);
          addParticles(hitEntity.x, hitEntity.y, hitEntity.color, 24);

          // Update combo streak
          setCombo((prevCombo) => {
            const nextCombo = prevCombo + 1;
            setMaxCombo((m) => Math.max(m, nextCombo));
            const multiplier = Math.min(Math.floor(nextCombo / 3) + 1, 5);
            const totalEarned = hitEntity.points * multiplier;

            setScore((s) => s + totalEarned);

            if (hitEntity.kind === "tech") {
              robotAudio.playCollectSound(1 + Math.min(nextCombo * 0.05, 0.5));
              addFloatingText(
                hitEntity.x,
                hitEntity.y,
                `+${totalEarned} [${hitEntity.label}]`,
                multiplier > 1 ? "#fbbf24" : hitEntity.color
              );

              // Boost Project Progress
              setProjectProgress((prevProg) => {
                const nextProg = prevProg + hitEntity.projectBoost;
                if (nextProg >= 100) {
                  // Project completed & deployed!
                  robotAudio.playDeployProjectSound();
                  setProjectsDeployed((d) => d + 1);
                  setScore((s) => s + 500);
                  addFloatingText(
                    canvas.width / 2,
                    canvas.height * 0.35,
                    `🚀 PROYEK SELESAI DEPLOYED! +500 PTS`,
                    "#10b981"
                  );
                  setCurrentProjectIdx((idx) => (idx + 1) % AZMI_PROJECTS.length);
                  return 0;
                }
                return nextProg;
              });
            } else {
              // Bug squashed
              robotAudio.playBugSquash();
              addFloatingText(
                hitEntity.x,
                hitEntity.y,
                `+${totalEarned} FIXED!`,
                "#ef4444"
              );
            }

            return nextCombo;
          });
        } else {
          // Armored bug hit (1 HP remaining)
          hitEntity.hp = newHp;
          robotAudio.playCyberLaser();
          addParticles(hitEntity.x, hitEntity.y, "#38bdf8", 8);
          addFloatingText(hitEntity.x, hitEntity.y, "SHIELD HIT! 1 LEFT", "#38bdf8");
        }
      } else {
        // Missed shot: laser audio & combo reset
        robotAudio.playCyberLaser();
        setCombo(0);
        addFloatingText(clickX, clickY, "MISSED", "rgba(148,163,184,0.6)");
      }
    },
    [gameState, activeSkinConfig.dotColor, addParticles, addFloatingText]
  );

  // Start / Restart game
  const handleStartGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(25);
    setCombo(0);
    setMaxCombo(0);
    setCurrentProjectIdx(0);
    setProjectProgress(0);
    setProjectsDeployed(0);
    setEmpCooldown(0);
    entitiesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    laserRaysRef.current = [];
    robotAudio.playDeployProjectSound();
  }, []);

  // Keyboard shortcut listener (Spacebar for EMP)
  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        triggerEmpBlast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gameState, triggerEmpBlast]);

  // EMP timer cooldown tick
  useEffect(() => {
    if (empCooldown <= 0) return;
    const interval = setInterval(() => {
      setEmpCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [empCooldown]);

  // Main 1-second countdown game clock
  useEffect(() => {
    if (gameState !== "playing") return;
    const clock = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(clock);
          setGameState("gameover");
          robotAudio.playVictoryChime();
          onGameWin?.(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(clock);
  }, [gameState, score, onGameWin]);

  // Main Canvas Render & Physics Loop (Runs at pure 60 FPS without React re-render lag)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let spawnTimer = 0;
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      animIdRef.current = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background cyber grid
      ctx.strokeStyle = "rgba(255, 98, 0, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (gameState === "playing") {
        // Spawn timer
        spawnTimer += dt;
        if (spawnTimer >= 0.75 && entitiesRef.current.length < 12) {
          spawnTimer = 0;
          spawnEntity(width, height);
        }

        // Draw and update laser rays
        for (let i = laserRaysRef.current.length - 1; i >= 0; i--) {
          const ray = laserRaysRef.current[i];
          ray.alpha -= dt * 4.5;
          if (ray.alpha <= 0) {
            laserRaysRef.current.splice(i, 1);
            continue;
          }
          ctx.strokeStyle = ray.color;
          ctx.lineWidth = 3 * ray.alpha;
          ctx.globalAlpha = ray.alpha;
          ctx.beginPath();
          ctx.moveTo(ray.x1, ray.y1);
          ctx.lineTo(ray.x2, ray.y2);
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // Update & Render Entities
        for (let i = entitiesRef.current.length - 1; i >= 0; i--) {
          const ent = entitiesRef.current[i];

          // Swaying physics motion
          ent.pulsePhase += dt * 3.5;
          ent.x += ent.vx * dt + Math.sin(ent.pulsePhase) * 0.8;
          ent.y += ent.vy * dt;
          ent.rotation += ent.vRot * dt;

          // Wall bounce
          if (ent.x <= ent.radius + 10) {
            ent.x = ent.radius + 10;
            ent.vx = Math.abs(ent.vx);
          } else if (ent.x >= width - ent.radius - 10) {
            ent.x = width - ent.radius - 10;
            ent.vx = -Math.abs(ent.vx);
          }

          // Off bottom screen
          if (ent.y >= height + ent.radius + 20) {
            entitiesRef.current.splice(i, 1);
            continue;
          }

          // Render Entity Card / Badge
          ctx.save();
          ctx.translate(ent.x, ent.y);
          ctx.rotate(ent.rotation);

          // Glow halo
          ctx.shadowColor = ent.glowColor;
          ctx.shadowBlur = 18;

          // Outer Badge
          ctx.fillStyle = "#090d16";
          ctx.strokeStyle = ent.color;
          ctx.lineWidth = ent.kind === "tech" ? 2.5 : 3.0;

          ctx.beginPath();
          if (ent.kind === "tech") {
            // Hexagon or smooth rounded pill for tech stacks
            ctx.roundRect(-ent.radius, -ent.radius, ent.radius * 2, ent.radius * 2, 14);
          } else {
            // Octagon / sharp shield for bugs
            ctx.roundRect(-ent.radius, -ent.radius, ent.radius * 2, ent.radius * 2, 8);
          }
          ctx.fill();
          ctx.stroke();

          // Inner Short Icon
          ctx.shadowBlur = 0;
          ctx.font = `bold ${ent.radius * 0.85}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = ent.color;
          ctx.fillText(ent.short, 0, -2);

          // Sub-label below badge
          ctx.font = "bold 9px sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(ent.label, 0, ent.radius + 12);

          // HP badge for armored bugs
          if (ent.maxHp > 1) {
            ctx.fillStyle = "#ec4899";
            ctx.beginPath();
            ctx.arc(ent.radius - 4, -ent.radius + 4, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 9px sans-serif";
            ctx.fillText(String(ent.hp), ent.radius - 4, -ent.radius + 4);
          }

          ctx.restore();
        }

        // Update & Render Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= p.decay * dt;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Update & Render Floating Text
        for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
          const ft = floatingTextsRef.current[i];
          ft.y += ft.vy * dt;
          ft.alpha -= dt * 1.4;

          if (ft.alpha <= 0) {
            floatingTextsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, ft.alpha);
          ctx.font = "bold 13px monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = ft.color;
          ctx.shadowColor = "#000000";
          ctx.shadowBlur = 8;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }
    };

    animIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isOpen, gameState, spawnEntity]);

  if (!isOpen || !mounted) return null;

  const currentProject = AZMI_PROJECTS[currentProjectIdx] || AZMI_PROJECTS[0];

  // Developer rank calculation based on performance
  let devRank = "Junior Software Trainee (RPL)";
  if (score >= 3200) {
    devRank = "🏆 10x Master Tech Lead SMKN 1 Pasuruan";
  } else if (score >= 2000) {
    devRank = "⚡ Senior Fullstack Developer SMKN 1 Pasuruan";
  } else if (score >= 1100) {
    devRank = "🚀 Mid-Level Software Engineer SMKN 1 Pasuruan";
  }

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Azmi Portfolio Dev Rush Arcade"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300 select-none pointer-events-auto"
      style={{ pointerEvents: "auto" }}
    >
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[90vh] max-h-[720px] rounded-3xl border bg-slate-950 overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
        style={{
          borderColor: `${activeSkinConfig.dotColor}88`,
          boxShadow: `0 0 60px ${activeSkinConfig.dotColor}35`,
          pointerEvents: "auto",
        }}
      >
        {/* 1. TOP HUD BAR */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md pointer-events-auto">
          {/* Brand & School */}
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-black text-xs shadow-md"
              style={{ backgroundColor: activeSkinConfig.dotColor }}
            >
              RPL
            </span>
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>{t("arcadeTitle")}</span>
                <span className="text-[9.5px] font-mono font-bold text-orange-400 bg-orange-500/20 px-1.5 py-0.2 rounded border border-orange-500/30 hidden xs:inline">
                  {t("arcadeSchoolTag")}
                </span>
              </h2>
            </div>
          </div>

          {/* Live In-Game Metrics */}
          {gameState === "playing" && (
            <div className="flex items-center gap-2.5 sm:gap-5 font-mono text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-1 text-amber-300">
                <span>⏱️</span>
                <span className="text-sm sm:text-base">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <span>🎯</span>
                <span className="text-sm sm:text-base">{score.toLocaleString()}</span>
                <span className="text-[9.5px] text-slate-400">PTS</span>
              </div>
              {combo > 1 && (
                <div className="flex items-center gap-1 text-orange-400 animate-bounce">
                  <Flame size={14} />
                  <span>{combo}x!</span>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {gameState === "playing" && (
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  triggerEmpBlast();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerEmpBlast();
                }}
                disabled={empCooldown > 0}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border transition-all cursor-pointer pointer-events-auto ${
                  empCooldown > 0
                    ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                }`}
                title="Tekan Spasi atau klik tombol ini untuk memicu EMP Overclock!"
              >
                <Zap size={12} />
                <span>EMP {empCooldown > 0 ? `(${empCooldown}s)` : t("arcadeEmpReady")}</span>
              </button>
            )}

            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                const muted = robotAudio.toggleMute();
                setIsMuted(muted);
              }}
              className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-red-500/20 transition-colors cursor-pointer pointer-events-auto"
              title="Keluar dari game"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. PROJECT MISSION STATUS STRIP */}
        {gameState === "playing" && (
          <div className="px-4 py-1.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-base">{currentProject.icon}</span>
              <span className="text-slate-300 font-bold truncate max-w-[200px] sm:max-w-none">
                {t("arcadeMission")} {currentProject.title}
              </span>
              <span className="text-[10px] text-orange-400 hidden md:inline">
                ({projectsDeployed} {t("arcadeCompleted")})
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-36 sm:w-56">
              <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-200"
                  style={{ width: `${Math.min(projectProgress, 100)}%` }}
                />
              </div>
              <span className="text-[10.5px] font-bold text-amber-300 w-8 text-right">
                {Math.round(projectProgress)}%
              </span>
            </div>
          </div>
        )}

        {/* 3. GAMEPLAY ARENA CANVAS */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 cursor-crosshair pointer-events-auto">
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              e.stopPropagation();
              handleCanvasInteraction(e.clientX, e.clientY);
            }}
            className="absolute inset-0 w-full h-full touch-none pointer-events-auto"
            style={{ touchAction: "none", pointerEvents: "auto" }}
          />

          {/* A. START MENU OVERLAY */}
          {gameState === "menu" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in pointer-events-auto"
              style={{ pointerEvents: "auto" }}
            >
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl border border-orange-500/40 bg-slate-900/95 p-6 sm:p-8 text-center shadow-2xl pointer-events-auto"
                style={{ pointerEvents: "auto" }}
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl"
                  style={{ backgroundColor: activeSkinConfig.dotColor }}
                >
                  <Rocket size={32} />
                </div>

                <span className="font-mono text-[11px] font-bold tracking-widest text-orange-400 uppercase">
                  {t("arcadeStartTitle")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {t("arcadeTitle")}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t("arcadeStartDesc")}
                </p>

                {/* Tech chips preview */}
                <div className="my-5 flex flex-wrap items-center justify-center gap-1.5">
                  {AZMI_TECH_STACKS.slice(0, 6).map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 rounded-full text-[10.5px] font-bold border border-slate-700 bg-slate-950"
                      style={{ color: tech.color }}
                    >
                      {tech.short} {tech.name}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handleStartGame();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartGame();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
                  style={{
                    backgroundColor: activeSkinConfig.dotColor,
                    boxShadow: `0 0 25px ${activeSkinConfig.dotColor}66`,
                    pointerEvents: "auto",
                  }}
                >
                  <Play size={16} />
                  <span>{t("arcadeStartBtn")}</span>
                </button>
              </div>
            </div>
          )}

          {/* B. GAME OVER / SCORECARD OVERLAY */}
          {gameState === "gameover" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
              style={{ pointerEvents: "auto" }}
            >
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl border border-orange-500/40 bg-slate-900/95 p-6 sm:p-8 text-center shadow-2xl pointer-events-auto"
                style={{ pointerEvents: "auto" }}
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30">
                  <Trophy size={32} />
                </div>

                <span className="font-mono text-xs font-bold tracking-widest text-orange-400 uppercase">
                  {t("arcadeResultTitle")}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {score.toLocaleString()} <span className="text-base font-normal text-slate-400">PTS</span>
                </h3>

                {/* Achieved Rank Badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 py-1.5 border border-orange-500/30 text-xs font-bold text-orange-300 shadow-inner">
                  <span>{devRank}</span>
                </div>

                {/* Statistics Row */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-800 py-3.5 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block">{t("arcadeDeployedProjectsLabel")}</span>
                    <span className="text-lg font-black text-emerald-400">
                      {projectsDeployed}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t("arcadeMaxComboLabel")}</span>
                    <span className="text-lg font-black text-amber-400">
                      {maxCombo}x Streak
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      handleStartGame();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartGame();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-all cursor-pointer pointer-events-auto"
                    style={{ pointerEvents: "auto" }}
                  >
                    <RotateCcw size={14} />
                    <span>{t("arcadePlayAgain")}</span>
                  </button>
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="rounded-full bg-slate-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-700 transition-all cursor-pointer pointer-events-auto"
                    style={{ pointerEvents: "auto" }}
                  >
                    {t("arcadeClose")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. BOTTOM HELPER DOCK */}
        <div className="px-4 sm:px-6 py-2 border-t border-slate-800/80 bg-slate-950 text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
          <span>{t("arcadeTip")}</span>
          <span className="hidden sm:inline">SMKN 1 PASURUAN • REKAYASA PERANGKAT LUNAK</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
