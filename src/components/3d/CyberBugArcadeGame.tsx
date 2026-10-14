"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap,
  Sparkles,
  Rocket,
  Shield,
  Play,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  Star,
  Award,
  AlertTriangle,
  Compass,
} from "lucide-react";
import { robotAudio } from "@/lib/robotSoundSynth";
import { ROBOT_SKINS, RobotSkinId } from "@/lib/robotSkins";
import { useLanguage } from "@/context/LanguageContext";

export interface CyberBugArcadeGameProps {
  isOpen: boolean;
  onClose: () => void;
  activeSkin: RobotSkinId;
  onGameWin?: (score: number) => void;
}

// 10 Sektor Level dengan eskalasi rintangan yang padat dan menantang
export interface SectorLevelConfig {
  level: number;
  name: string;
  subtitle: string;
  targetDistance: number;
  speedBase: number;
  spawnInterval: number; // Interval kemunculan batu (sangat cepat & rapat)
  asteroidVariety: ("normal" | "fast" | "fire" | "ice" | "titan" | "debris")[];
  hazardDensity: number; // Jumlah asteroid maksimum di layar
  pointMultiplier: number;
  bgTint: string;
  nebulaPrimary: string;
  nebulaSecondary: string;
  description: string;
}

export const SECTOR_LEVELS: SectorLevelConfig[] = [
  {
    level: 1,
    name: "Orbit Atmosfer",
    subtitle: "Sabuk Pemula • SMKN 1 Pasuruan",
    targetDistance: 500,
    speedBase: 145,
    spawnInterval: 0.32,
    asteroidVariety: ["normal", "debris"],
    hazardDensity: 14,
    pointMultiplier: 1.0,
    bgTint: "rgba(56, 189, 248, 0.08)",
    nebulaPrimary: "rgba(14, 165, 233, 0.14)",
    nebulaSecondary: "rgba(99, 102, 241, 0.12)",
    description: "Jelajahi orbit terluar dengan rentetan serpihan batuan kosmik.",
  },
  {
    level: 2,
    name: "Sabuk Bulan",
    subtitle: "Medan Gravitasi Ringan",
    targetDistance: 650,
    speedBase: 175,
    spawnInterval: 0.28,
    asteroidVariety: ["normal", "fast", "debris"],
    hazardDensity: 18,
    pointMultiplier: 1.2,
    bgTint: "rgba(148, 163, 184, 0.09)",
    nebulaPrimary: "rgba(100, 116, 139, 0.15)",
    nebulaSecondary: "rgba(56, 189, 248, 0.13)",
    description: "Batu-batu asteroid berputar meluncur dalam formasi lebih padat.",
  },
  {
    level: 3,
    name: "Medan Pasir Mars",
    subtitle: "Badai Debu Kosmik Merah",
    targetDistance: 800,
    speedBase: 200,
    spawnInterval: 0.25,
    asteroidVariety: ["normal", "fast", "titan", "debris"],
    hazardDensity: 22,
    pointMultiplier: 1.4,
    bgTint: "rgba(239, 68, 68, 0.1)",
    nebulaPrimary: "rgba(239, 68, 68, 0.16)",
    nebulaSecondary: "rgba(249, 115, 22, 0.14)",
    description: "Muncul Titan Asteroid raksasa di sela-sela rentetan meteorit cepat.",
  },
  {
    level: 4,
    name: "Badai Cincin Es",
    subtitle: "Hujan Komet Sub-Zero",
    targetDistance: 950,
    speedBase: 230,
    spawnInterval: 0.22,
    asteroidVariety: ["normal", "ice", "titan", "debris"],
    hazardDensity: 26,
    pointMultiplier: 1.7,
    bgTint: "rgba(6, 182, 212, 0.12)",
    nebulaPrimary: "rgba(6, 182, 212, 0.18)",
    nebulaSecondary: "rgba(14, 165, 233, 0.15)",
    description: "Komet es diagonal tajam melintasi sabuk asteroid yang rapat.",
  },
  {
    level: 5,
    name: "Sabuk Api Surya",
    subtitle: "Radiasi Korona Membara",
    targetDistance: 1150,
    speedBase: 260,
    spawnInterval: 0.2,
    asteroidVariety: ["normal", "fire", "fast", "debris"],
    hazardDensity: 30,
    pointMultiplier: 2.0,
    bgTint: "rgba(249, 115, 22, 0.13)",
    nebulaPrimary: "rgba(249, 115, 22, 0.2)",
    nebulaSecondary: "rgba(239, 68, 68, 0.17)",
    description: "Meteorit berapi cepat dengan ekor plasma panas mematikan.",
  },
  {
    level: 6,
    name: "Vorteks Jupiter",
    subtitle: "Gravitasi Raksasa Ekstrem",
    targetDistance: 1350,
    speedBase: 290,
    spawnInterval: 0.18,
    asteroidVariety: ["normal", "fire", "ice", "titan", "debris"],
    hazardDensity: 35,
    pointMultiplier: 2.3,
    bgTint: "rgba(234, 179, 8, 0.12)",
    nebulaPrimary: "rgba(234, 179, 8, 0.18)",
    nebulaSecondary: "rgba(217, 119, 6, 0.16)",
    description: "Gelombang asteroid beruntun berkelompok menuntut refleks tinggi.",
  },
  {
    level: 7,
    name: "Cincin Saturnus",
    subtitle: "Hancuran Batuan Padat",
    targetDistance: 1550,
    speedBase: 320,
    spawnInterval: 0.16,
    asteroidVariety: ["normal", "fast", "titan", "ice", "debris"],
    hazardDensity: 40,
    pointMultiplier: 2.6,
    bgTint: "rgba(168, 85, 247, 0.12)",
    nebulaPrimary: "rgba(168, 85, 247, 0.2)",
    nebulaSecondary: "rgba(192, 38, 211, 0.17)",
    description: "Kepadatan batuan luar biasa tinggi dengan celah lorong sempit.",
  },
  {
    level: 8,
    name: "Nebula Void Gelap",
    subtitle: "Anomali Gravitasi Liar",
    targetDistance: 1750,
    speedBase: 350,
    spawnInterval: 0.15,
    asteroidVariety: ["normal", "fast", "fire", "ice", "titan", "debris"],
    hazardDensity: 46,
    pointMultiplier: 3.0,
    bgTint: "rgba(99, 102, 241, 0.14)",
    nebulaPrimary: "rgba(99, 102, 241, 0.22)",
    nebulaSecondary: "rgba(79, 70, 229, 0.18)",
    description: "Pergerakan asteroid zigzag tak terduga dan komet beruntun.",
  },
  {
    level: 9,
    name: "Sektor Pulsar Ion",
    subtitle: "Hujan Meteorit Berkelanjutan",
    targetDistance: 2000,
    speedBase: 385,
    spawnInterval: 0.13,
    asteroidVariety: ["normal", "fast", "fire", "ice", "titan", "debris"],
    hazardDensity: 52,
    pointMultiplier: 3.5,
    bgTint: "rgba(236, 72, 153, 0.14)",
    nebulaPrimary: "rgba(236, 72, 153, 0.22)",
    nebulaSecondary: "rgba(244, 63, 94, 0.19)",
    description: "Rentetan meteor api berkecepatan tinggi tanpa henti!",
  },
  {
    level: 10,
    name: "Odyssey Kosmik Finale",
    subtitle: "Tantangan Terhebat • SMKN 1 Pasuruan",
    targetDistance: 2300,
    speedBase: 420,
    spawnInterval: 0.11,
    asteroidVariety: ["normal", "fast", "fire", "ice", "titan", "debris"],
    hazardDensity: 60,
    pointMultiplier: 4.0,
    bgTint: "rgba(255, 98, 0, 0.16)",
    nebulaPrimary: "rgba(255, 98, 0, 0.25)",
    nebulaSecondary: "rgba(234, 88, 12, 0.2)",
    description: "Tingkat tersulit! Medan asteroid super padat, buktikan kehebatan pilotmu!",
  },
];

interface StarParticle {
  x: number;
  y: number;
  speed: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number;
}

interface NebulaHub {
  xRatio: number;
  yRatio: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

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
}

interface AsteroidEntity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hitRadius: number; // Fair hitbox (slightly smaller than visual radius)
  rotation: number;
  vRot: number;
  type: "normal" | "fast" | "fire" | "ice" | "titan" | "debris";
  vertices: { dist: number; angle: number }[];
  craters: { ox: number; oy: number; r: number }[];
  hasPassedPlayer: boolean;
}

interface CollectibleItem {
  id: number;
  x: number;
  y: number;
  vy: number;
  radius: number;
  kind: "crystal" | "shield" | "booster";
  rotation: number;
}

export default function CyberBugArcadeGame({
  isOpen,
  onClose,
  activeSkin,
  onGameWin,
}: CyberBugArcadeGameProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [gameState, setGameState] = useState<"menu" | "playing" | "levelSelect" | "win" | "gameover">("menu");

  // Level & Progression State
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);

  // HUD UI State (Throttled sync from game loop to guarantee 60-120 FPS decoupled performance)
  const [hudScore, setHudScore] = useState(0);
  const [hudHull, setHudHull] = useState(100);
  const [hudDistance, setHudDistance] = useState(0);
  const [hudDodged, setHudDodged] = useState(0);
  const [hudCrystals, setHudCrystals] = useState(0);
  const [hudBoostCooldown, setHudBoostCooldown] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Final Results
  const [finalSuccessRate, setFinalSuccessRate] = useState(0);
  const [finalGrade, setFinalGrade] = useState<{ rank: string; title: string; color: string }>({
    rank: "A",
    title: "Pilot Tangguh",
    color: "#38bdf8",
  });
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const entityIdCounter = useRef(1);

  // Decoupled Game Engine State in Ref (ensures 120 FPS zero-jitter animation loop)
  const liveRef = useRef({
    gameState: "menu" as "menu" | "playing" | "levelSelect" | "win" | "gameover",
    selectedLevel: 1,
    score: 0,
    hullIntegrity: 100,
    distanceTraveled: 0,
    dodgedCount: 0,
    crystalsCount: 0,
    boostCooldown: 0,
    isBoostActive: false,
    boostTimer: 0,
    invulnerableTimer: 0,
    screenShake: 0,
    spawnTimer: 0,
    waveTimer: 0,
    itemSpawnTimer: 0,
    lastHudSyncTime: 0,
  });

  // Player Rocket state in canvas
  const playerRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    tilt: 0,
    width: 32,
    height: 50,
  });

  // Space World Entities
  const starsRef = useRef<StarParticle[]>([]);
  const nebulasRef = useRef<NebulaHub[]>([]);
  const asteroidsRef = useRef<AsteroidEntity[]>([]);
  const itemsRef = useRef<CollectibleItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);

  // Input listeners
  const keysDownRef = useRef<{ [key: string]: boolean }>({});
  const isPointerInteractingRef = useRef(false);

  const activeSkinConfig = ROBOT_SKINS[activeSkin] || ROBOT_SKINS.orange;

  const currentConfig = useMemo(() => {
    return SECTOR_LEVELS.find((lvl) => lvl.level === selectedLevel) || SECTOR_LEVELS[0];
  }, [selectedLevel]);

  // Keep liveRef updated with active level
  useEffect(() => {
    liveRef.current.selectedLevel = selectedLevel;
  }, [selectedLevel]);

  // Mount & LocalStorage load
  useEffect(() => {
    setMounted(true);
    setIsMuted(robotAudio.isMuted());
    if (typeof window !== "undefined") {
      const savedUnlocked = localStorage.getItem("cosmic_rocket_unlocked_level");
      if (savedUnlocked) {
        setUnlockedLevel(Math.min(10, Math.max(1, parseInt(savedUnlocked, 10))));
      }
      const savedScore = localStorage.getItem("cosmic_rocket_high_score");
      if (savedScore) {
        setHighScore(parseInt(savedScore, 10) || 0);
      }
    }
  }, []);

  // Initialize Smooth Parallax Stars & Nebula Clouds
  const initStarsAndNebulas = useCallback((width: number, height: number) => {
    // 1. Nebula clouds
    nebulasRef.current = [
      { xRatio: 0.25, yRatio: 0.3, radius: Math.max(width, height) * 0.42, color: "rgba(14, 165, 233, 0.12)", vx: 8, vy: 18 },
      { xRatio: 0.75, yRatio: 0.65, radius: Math.max(width, height) * 0.48, color: "rgba(168, 85, 247, 0.11)", vx: -6, vy: 14 },
      { xRatio: 0.45, yRatio: 0.85, radius: Math.max(width, height) * 0.38, color: "rgba(249, 115, 22, 0.1)", vx: 5, vy: 22 },
    ];

    // 2. Multi-layer Stars (Layer 1: Far 180 stars, Layer 2: Mid 90 stars, Layer 3: Near 35 fast motes)
    const starList: StarParticle[] = [];
    const totalStars = 280;

    for (let i = 0; i < totalStars; i++) {
      const layer = i < 160 ? 1 : i < 240 ? 2 : 3;
      const baseAlpha = layer === 1 ? 0.28 + Math.random() * 0.25 : layer === 2 ? 0.6 + Math.random() * 0.3 : 0.85 + Math.random() * 0.15;
      const speed = layer === 1 ? 32 + Math.random() * 20 : layer === 2 ? 75 + Math.random() * 35 : 150 + Math.random() * 65;
      const size = layer === 1 ? 0.8 + Math.random() * 0.6 : layer === 2 ? 1.5 + Math.random() * 0.8 : 2.4 + Math.random() * 1.2;

      starList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed,
        size,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: 1.5 + Math.random() * 3.5,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }
    starsRef.current = starList;
  }, []);

  // Add Particle Burst
  const addParticles = useCallback((x: number, y: number, color: string, count = 18, maxSpeed = 180) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * maxSpeed;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.2 + Math.random() * 3.2,
        color,
        alpha: 1,
        decay: 1.6 + Math.random() * 1.8,
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
      vy: -52,
    });
  }, []);

  // Audio Toggle
  const handleToggleSound = useCallback(() => {
    const muted = robotAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  // Spawn Asteroid Entity (Single or Cluster)
  const spawnAsteroid = useCallback(
    (canvasWidth: number, config: SectorLevelConfig, forcedType?: "normal" | "fast" | "fire" | "ice" | "titan" | "debris") => {
      const varietyList = config.asteroidVariety;
      const type = forcedType || varietyList[Math.floor(Math.random() * varietyList.length)];

      let baseRadius = 22 + Math.random() * 16;
      let speedMult = 1.0;

      if (type === "debris") {
        baseRadius = 10 + Math.random() * 10;
        speedMult = 1.2;
      } else if (type === "fast") {
        baseRadius = 15 + Math.random() * 11;
        speedMult = 1.45;
      } else if (type === "titan") {
        baseRadius = 50 + Math.random() * 22;
        speedMult = 0.7;
      } else if (type === "fire") {
        baseRadius = 24 + Math.random() * 14;
        speedMult = 1.25;
      } else if (type === "ice") {
        baseRadius = 20 + Math.random() * 12;
        speedMult = 1.15;
      }

      // Procedural rock vertices with noise
      const numVertices = type === "debris" ? 7 : 11 + Math.floor(Math.random() * 4);
      const vertices = [];
      for (let i = 0; i < numVertices; i++) {
        const angle = (i / numVertices) * Math.PI * 2;
        const dist = baseRadius * (0.8 + Math.random() * 0.4);
        vertices.push({ dist, angle });
      }

      // Procedural craters
      const craters = [];
      const craterCount = type === "titan" ? 4 : type === "normal" ? 2 : 1;
      for (let c = 0; c < craterCount; c++) {
        const offsetDist = Math.random() * (baseRadius * 0.45);
        const offsetAngle = Math.random() * Math.PI * 2;
        craters.push({
          ox: Math.cos(offsetAngle) * offsetDist,
          oy: Math.sin(offsetAngle) * offsetDist,
          r: baseRadius * (0.16 + Math.random() * 0.14),
        });
      }

      const padding = baseRadius + 12;
      const x = padding + Math.random() * (canvasWidth - padding * 2);
      const y = -baseRadius - 20;

      const vy = config.speedBase * speedMult;
      let vx = (Math.random() - 0.5) * 45;
      if (type === "ice") {
        vx = (Math.random() < 0.5 ? -1 : 1) * (55 + Math.random() * 65);
      }

      const entity: AsteroidEntity = {
        id: entityIdCounter.current++,
        x,
        y,
        vx,
        vy,
        radius: baseRadius,
        hitRadius: baseRadius * 0.82, // Fair hitbox for tight asteroid fields
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 1.6,
        type,
        vertices,
        craters,
        hasPassedPlayer: false,
      };

      asteroidsRef.current.push(entity);
    },
    []
  );

  // Spawn Asteroid Formation Wave (2-4 asteroids forming a row with dodge corridor)
  const spawnAsteroidWave = useCallback(
    (canvasWidth: number, config: SectorLevelConfig) => {
      const waveSize = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < waveSize; i++) {
        spawnAsteroid(canvasWidth, config);
      }
    },
    [spawnAsteroid]
  );

  // Spawn Collectible Item (Crystal / Shield / Booster)
  const spawnCollectible = useCallback((canvasWidth: number) => {
    const rand = Math.random();
    const kind: "crystal" | "shield" | "booster" = rand < 0.65 ? "crystal" : rand < 0.85 ? "shield" : "booster";
    const padding = 40;
    const x = padding + Math.random() * (canvasWidth - padding * 2);

    itemsRef.current.push({
      id: entityIdCounter.current++,
      x,
      y: -30,
      vy: 115 + Math.random() * 35,
      radius: kind === "crystal" ? 17 : 20,
      kind,
      rotation: 0,
    });
  }, []);

  // Compute Grade & Success Rate helper
  const calculateResultGrade = useCallback(
    (isWin: boolean, currentDist: number, targetDist: number, remainingHull: number, dodged: number) => {
      let rate = 0;
      if (isWin) {
        const hullBonus = (remainingHull / 100) * 20;
        const dodgeBonus = Math.min(10, dodged * 0.15);
        rate = Math.round(70 + hullBonus + dodgeBonus);
        if (remainingHull >= 100) {
          rate = 100;
        }
      } else {
        rate = Math.min(88, Math.round((currentDist / targetDist) * 85));
      }
      rate = Math.max(10, Math.min(100, rate));

      let gradeInfo = { rank: "C", title: "Kadet Luar Angkasa", color: "#fbbf24" };
      if (rate >= 100) {
        gradeInfo = { rank: "SSS", title: "👑 Legenda Kosmik Sempurna", color: "#f59e0b" };
      } else if (rate >= 90) {
        gradeInfo = { rank: "S", title: "⭐ Master Astronaut Handal", color: "#10b981" };
      } else if (rate >= 80) {
        gradeInfo = { rank: "A", title: "🚀 Pilot Antariksa Tangguh", color: "#06b6d4" };
      } else if (rate >= 65) {
        gradeInfo = { rank: "B", title: "🛡️ Penjelajah Berbakat", color: "#818cf8" };
      } else if (rate >= 50) {
        gradeInfo = { rank: "C", title: "⚡ Kadet Penyintas", color: "#fbbf24" };
      } else {
        gradeInfo = { rank: "D", title: "💥 Perlu Latihan Lebih Lanjut", color: "#ef4444" };
      }

      return { rate, gradeInfo };
    },
    []
  );

  // Trigger Shield Boost (Spacebar or Button)
  const triggerBoost = useCallback(() => {
    const live = liveRef.current;
    if (live.gameState !== "playing" || live.boostCooldown > 0) return;

    robotAudio.playRocketBoost();
    robotAudio.playShieldAbsorb();

    live.boostCooldown = 5.2;
    live.isBoostActive = true;
    live.boostTimer = 2.5;

    const p = playerRef.current;
    const shockRadius = 240;
    const cfg = SECTOR_LEVELS.find((l) => l.level === live.selectedLevel) || SECTOR_LEVELS[0];

    let clearedPoints = 0;
    let destroyedCount = 0;

    asteroidsRef.current = asteroidsRef.current.filter((ast) => {
      const dist = Math.hypot(p.x - ast.x, p.y - ast.y);
      if (dist <= shockRadius + ast.radius) {
        addParticles(ast.x, ast.y, "#f59e0b", 22, 220);
        clearedPoints += Math.round(150 * cfg.pointMultiplier);
        destroyedCount++;
        return false;
      }
      return true;
    });

    if (destroyedCount > 0) {
      live.score += clearedPoints;
      live.dodgedCount += destroyedCount;
      addFloatingText(p.x, p.y - 40, `⚡ SHOCKWAVE DESTROYED ${destroyedCount}X! +${clearedPoints}`, "#38bdf8");
    } else {
      addFloatingText(p.x, p.y - 40, "🛡️ SHIELD BARRIER ACTIVATED!", "#38bdf8");
    }

    live.screenShake = 9;
    setHudBoostCooldown(5.2);
  }, [addParticles, addFloatingText]);

  // Start / Restart specific Level
  const handleStartGame = useCallback(
    (levelNum?: number) => {
      const targetLvl = levelNum !== undefined ? levelNum : selectedLevel;
      setSelectedLevel(targetLvl);
      setGameState("playing");

      const live = liveRef.current;
      live.gameState = "playing";
      live.selectedLevel = targetLvl;
      live.score = 0;
      live.hullIntegrity = 100;
      live.distanceTraveled = 0;
      live.dodgedCount = 0;
      live.crystalsCount = 0;
      live.boostCooldown = 0;
      live.isBoostActive = false;
      live.boostTimer = 0;
      live.invulnerableTimer = 0.5;
      live.screenShake = 0;
      live.spawnTimer = 0;
      live.waveTimer = 0;
      live.itemSpawnTimer = 0;

      setHudScore(0);
      setHudHull(100);
      setHudDistance(0);
      setHudDodged(0);
      setHudCrystals(0);
      setHudBoostCooldown(0);
      setIsNewRecord(false);

      asteroidsRef.current = [];
      itemsRef.current = [];
      particlesRef.current = [];
      floatingTextsRef.current = [];

      const canvas = canvasRef.current;
      if (canvas) {
        playerRef.current.x = canvas.width / 2;
        playerRef.current.y = canvas.height - 110;
        playerRef.current.targetX = canvas.width / 2;
        playerRef.current.targetY = canvas.height - 110;
        playerRef.current.vx = 0;
        playerRef.current.vy = 0;
        playerRef.current.tilt = 0;
      }

      robotAudio.playRocketBoost();
    },
    [selectedLevel]
  );

  // Level Win handler
  const handleLevelWin = useCallback(
    (finalScoreTotal: number, finalHull: number, dodged: number) => {
      setGameState("win");
      liveRef.current.gameState = "win";
      robotAudio.playFinishWarp();
      robotAudio.playVictoryChime();

      const cfg = SECTOR_LEVELS.find((l) => l.level === liveRef.current.selectedLevel) || SECTOR_LEVELS[0];
      const { rate, gradeInfo } = calculateResultGrade(
        true,
        cfg.targetDistance,
        cfg.targetDistance,
        finalHull,
        dodged
      );
      setFinalSuccessRate(rate);
      setFinalGrade(gradeInfo);
      setHudScore(finalScoreTotal);

      if (liveRef.current.selectedLevel < 10) {
        const nextLvl = Math.max(unlockedLevel, liveRef.current.selectedLevel + 1);
        setUnlockedLevel(nextLvl);
        if (typeof window !== "undefined") {
          localStorage.setItem("cosmic_rocket_unlocked_level", String(nextLvl));
        }
      }

      if (finalScoreTotal > highScore) {
        setHighScore(finalScoreTotal);
        setIsNewRecord(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("cosmic_rocket_high_score", String(finalScoreTotal));
        }
      }

      if (onGameWin) {
        onGameWin(finalScoreTotal);
      }
    },
    [unlockedLevel, highScore, calculateResultGrade, onGameWin]
  );

  // Game Over (Crash) handler
  const handleGameOver = useCallback(
    (dist: number, dodged: number, currentScore: number) => {
      setGameState("gameover");
      liveRef.current.gameState = "gameover";
      robotAudio.playAsteroidCrash();

      const cfg = SECTOR_LEVELS.find((l) => l.level === liveRef.current.selectedLevel) || SECTOR_LEVELS[0];
      const { rate, gradeInfo } = calculateResultGrade(
        false,
        dist,
        cfg.targetDistance,
        0,
        dodged
      );
      setFinalSuccessRate(rate);
      setFinalGrade(gradeInfo);
      setHudScore(currentScore);

      if (currentScore > highScore) {
        setHighScore(currentScore);
        setIsNewRecord(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("cosmic_rocket_high_score", String(currentScore));
        }
      }
    },
    [highScore, calculateResultGrade]
  );

  // Keyboard Event Handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysDownRef.current[e.code] = true;
      if (e.code === "Space") {
        e.preventDefault();
        triggerBoost();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDownRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, triggerBoost]);

  // Pointer / Touch Handlers for Rocket Guidance
  const updatePointerPosition = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    // Give 45px finger offset on mobile touch so finger doesn't obscure rocket
    const y = (clientY - rect.top) * (canvas.height / rect.height) - 25;

    const p = playerRef.current;
    p.targetX = Math.max(p.width / 2 + 10, Math.min(canvas.width - p.width / 2 - 10, x));
    p.targetY = Math.max(canvas.height * 0.3, Math.min(canvas.height - 40, y));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (liveRef.current.gameState !== "playing") return;
    isPointerInteractingRef.current = true;
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (liveRef.current.gameState !== "playing") return;
    if (isPointerInteractingRef.current || e.buttons > 0) {
      updatePointerPosition(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    isPointerInteractingRef.current = false;
  };

  // Cooldown Ticker for HUD
  useEffect(() => {
    const timer = setInterval(() => {
      const live = liveRef.current;
      if (live.boostCooldown > 0) {
        live.boostCooldown = Math.max(0, live.boostCooldown - 0.1);
        setHudBoostCooldown(parseFloat(live.boostCooldown.toFixed(1)));
        if (live.boostCooldown <= 0) {
          live.isBoostActive = false;
        }
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // =========================================================================
  // MAIN GAME LOOP (100% DECOUPLED FROM REACT STATE FOR ULTRA-SMOOTH 60-120 FPS)
  // =========================================================================
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    initStarsAndNebulas(width, height);

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth || 700;
      const newH = canvas.parentElement.clientHeight || 650;
      if (newW !== width || newH !== height) {
        width = canvas.width = newW;
        height = canvas.height = newH;
        initStarsAndNebulas(width, height);
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    lastTimeRef.current = performance.now();

    const loop = (currentTime: number) => {
      // High-precision delta time clamped to prevent spiral of death
      const rawDt = (currentTime - lastTimeRef.current) / 1000;
      const dt = Math.min(Math.max(rawDt, 0.001), 0.05);
      lastTimeRef.current = currentTime;

      const live = liveRef.current;
      const p = playerRef.current;
      const cfg = SECTOR_LEVELS.find((l) => l.level === live.selectedLevel) || SECTOR_LEVELS[0];

      // Screen shake decay
      if (live.screenShake > 0) {
        live.screenShake = Math.max(0, live.screenShake - dt * 28);
      }

      ctx.save();

      // Screen shake translation
      if (live.screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * live.screenShake * 1.6;
        const shakeY = (Math.random() - 0.5) * live.screenShake * 1.6;
        ctx.translate(shakeX, shakeY);
      }

      // 1. Deep Space Void Background
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // 2. Smooth Drifting Cosmic Nebula Clouds (Multi-layer soft lighting)
      nebulasRef.current.forEach((nebula, idx) => {
        const nebX = (width * nebula.xRatio + Math.sin(currentTime * 0.0004 + idx) * 45);
        const nebY = (height * nebula.yRatio + Math.cos(currentTime * 0.0003 + idx) * 35);

        const nebGrad = ctx.createRadialGradient(nebX, nebY, 10, nebX, nebY, nebula.radius);
        nebGrad.addColorStop(0, idx === 0 ? cfg.nebulaPrimary : cfg.nebulaSecondary);
        nebGrad.addColorStop(0.55, cfg.bgTint);
        nebGrad.addColorStop(1, "rgba(2, 6, 23, 0)");

        ctx.fillStyle = nebGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // Warp speed stretch factor
      const isHyperSpeed = live.boostTimer > 0;
      const starSpeedMult = isHyperSpeed ? 3.4 : 1.0;

      // 3. Butter-Smooth Parallax Stars
      starsRef.current.forEach((star) => {
        star.y += star.speed * starSpeedMult * dt;
        if (star.y > height + 10) {
          star.y = -10;
          star.x = Math.random() * width;
        }

        // Smooth subtle twinkling
        const twinkle = Math.sin(currentTime * 0.002 * star.twinkleSpeed + star.twinklePhase) * 0.15;
        const currentAlpha = Math.max(0.15, Math.min(1.0, star.baseAlpha + twinkle));

        if (isHyperSpeed && star.layer > 1) {
          // Hyperspace speed line stretch
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y + star.size * 9);
          ctx.strokeStyle = `rgba(186, 230, 253, ${currentAlpha * 0.85})`;
          ctx.lineWidth = star.size * 0.8;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Gameplay Simulation (when live.gameState === "playing")
      if (live.gameState === "playing") {
        // Distance traveled progression
        const flightSpeedMps = (58 + cfg.level * 4) * (isHyperSpeed ? 1.5 : 1.0);
        const distDelta = flightSpeedMps * dt;
        live.distanceTraveled += distDelta;

        // Points increment from distance
        live.score += Math.round(distDelta * 10 * cfg.pointMultiplier);

        // Check FINISH LINE Reached!
        if (live.distanceTraveled >= cfg.targetDistance) {
          const finalBonus = Math.round(cfg.targetDistance * 5 * cfg.pointMultiplier);
          const hullBonus = Math.round(live.hullIntegrity * 25);
          live.score += finalBonus + hullBonus;
          handleLevelWin(live.score, live.hullIntegrity, live.dodgedCount);
        }

        // Keyboard Movement Controls
        const keys = keysDownRef.current;
        const keyMoveSpeed = 380 * dt;
        let kx = 0;
        let ky = 0;

        if (keys["ArrowLeft"] || keys["KeyA"]) kx -= 1;
        if (keys["ArrowRight"] || keys["KeyD"]) kx += 1;
        if (keys["ArrowUp"] || keys["KeyW"]) ky -= 1;
        if (keys["ArrowDown"] || keys["KeyS"]) ky += 1;

        if (kx !== 0 || ky !== 0) {
          p.targetX = Math.max(p.width / 2 + 10, Math.min(width - p.width / 2 - 10, p.targetX + kx * keyMoveSpeed));
          p.targetY = Math.max(height * 0.3, Math.min(height - 40, p.targetY + ky * keyMoveSpeed));
        }

        // Framerate-independent Exponential Damping for Butter-Smooth Rocket Glide
        const smoothDampFactor = 1 - Math.exp(-22 * dt);
        const prevPx = p.x;
        p.x += (p.targetX - p.x) * smoothDampFactor;
        p.y += (p.targetY - p.y) * smoothDampFactor;

        p.vx = (p.x - prevPx) / dt;
        const targetTilt = Math.max(-0.45, Math.min(0.45, (p.vx / 340) * 0.4));
        p.tilt += (targetTilt - p.tilt) * Math.min(1, dt * 14);

        // Timers decrement
        if (live.invulnerableTimer > 0) {
          live.invulnerableTimer = Math.max(0, live.invulnerableTimer - dt);
        }
        if (live.boostTimer > 0) {
          live.boostTimer = Math.max(0, live.boostTimer - dt);
          if (live.boostTimer <= 0) {
            live.isBoostActive = false;
          }
        }

        // ===================================================================
        // HIGH DENSITY OBSTACLE SPAWNER (Banyak Batu & Gelombang Rintangan)
        // ===================================================================
        live.spawnTimer += dt;
        live.waveTimer += dt;

        // Regular continuous high-rate spawn
        if (live.spawnTimer >= cfg.spawnInterval && asteroidsRef.current.length < cfg.hazardDensity) {
          live.spawnTimer = 0;
          spawnAsteroid(width, cfg);
        }

        // Periodic Formation Wave Spawner (every 2.2 seconds, spawns an extra wave of 2-3 rocks)
        if (live.waveTimer >= 2.2 && asteroidsRef.current.length < cfg.hazardDensity - 2) {
          live.waveTimer = 0;
          spawnAsteroidWave(width, cfg);
        }

        // Item Spawner
        live.itemSpawnTimer += dt;
        if (live.itemSpawnTimer >= 3.2 && itemsRef.current.length < 3) {
          live.itemSpawnTimer = 0;
          spawnCollectible(width);
        }

        // Throttle sync to React HUD state (~12 times per second)
        if (currentTime - live.lastHudSyncTime >= 85) {
          live.lastHudSyncTime = currentTime;
          setHudScore(live.score);
          setHudHull(live.hullIntegrity);
          setHudDistance(live.distanceTraveled);
          setHudDodged(live.dodgedCount);
          setHudCrystals(live.crystalsCount);
        }

        // 5. Update & Render Items
        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
          const item = itemsRef.current[i];
          item.y += item.vy * dt;
          item.rotation += dt * 2.8;

          const distToPlayer = Math.hypot(p.x - item.x, p.y - item.y);
          if (distToPlayer <= item.radius + 24) {
            itemsRef.current.splice(i, 1);
            if (item.kind === "crystal") {
              robotAudio.playCollectSound(1.2);
              const pts = Math.round(250 * cfg.pointMultiplier);
              live.score += pts;
              live.crystalsCount += 1;
              addParticles(item.x, item.y, "#38bdf8", 16);
              addFloatingText(item.x, item.y, `+${pts} STARLIGHT!`, "#38bdf8");
            } else if (item.kind === "shield") {
              robotAudio.playShieldAbsorb();
              live.hullIntegrity = Math.min(100, live.hullIntegrity + 25);
              live.score += 300;
              addParticles(item.x, item.y, "#10b981", 18);
              addFloatingText(item.x, item.y, "+25% REPAIR SHIELD!", "#10b981");
            } else if (item.kind === "booster") {
              robotAudio.playRocketBoost();
              live.boostCooldown = 0;
              setHudBoostCooldown(0);
              live.score += 400;
              addParticles(item.x, item.y, "#fbbf24", 20);
              addFloatingText(item.x, item.y, "⚡ BOOST READY!", "#fbbf24");
            }
            continue;
          }

          if (item.y > height + 40) {
            itemsRef.current.splice(i, 1);
            continue;
          }

          // Draw item
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.rotation);

          if (item.kind === "crystal") {
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 14;
            ctx.fillStyle = "#38bdf8";
            ctx.beginPath();
            ctx.moveTo(0, -item.radius);
            ctx.lineTo(item.radius * 0.7, 0);
            ctx.lineTo(0, item.radius);
            ctx.lineTo(-item.radius * 0.7, 0);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, item.radius * 0.35, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.kind === "shield") {
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = 16;
            ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
            ctx.strokeStyle = "#10b981";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#34d399";
            ctx.beginPath();
            ctx.moveTo(0, -item.radius * 0.55);
            ctx.lineTo(item.radius * 0.5, -item.radius * 0.2);
            ctx.lineTo(item.radius * 0.35, item.radius * 0.45);
            ctx.lineTo(0, item.radius * 0.65);
            ctx.lineTo(-item.radius * 0.35, item.radius * 0.45);
            ctx.lineTo(-item.radius * 0.5, -item.radius * 0.2);
            ctx.closePath();
            ctx.fill();
          } else if (item.kind === "booster") {
            ctx.shadowColor = "#f59e0b";
            ctx.shadowBlur = 18;
            ctx.fillStyle = "rgba(245, 158, 11, 0.28)";
            ctx.strokeStyle = "#f59e0b";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.moveTo(2, -item.radius * 0.6);
            ctx.lineTo(-item.radius * 0.45, 0);
            ctx.lineTo(0, 0);
            ctx.lineTo(-2, item.radius * 0.6);
            ctx.lineTo(item.radius * 0.45, 0);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // 6. Update & Render Dense Asteroids Field
        for (let i = asteroidsRef.current.length - 1; i >= 0; i--) {
          const ast = asteroidsRef.current[i];
          ast.x += ast.vx * dt;
          ast.y += ast.vy * dt;
          ast.rotation += ast.vRot * dt;

          // Soft edge bounce
          if (ast.x < ast.radius) {
            ast.x = ast.radius;
            ast.vx = Math.abs(ast.vx);
          } else if (ast.x > width - ast.radius) {
            ast.x = width - ast.radius;
            ast.vx = -Math.abs(ast.vx);
          }

          // Near Miss Dodge Detection
          if (!ast.hasPassedPlayer && ast.y > p.y + 10) {
            ast.hasPassedPlayer = true;
            const dist = Math.hypot(p.x - ast.x, p.y - ast.y);
            if (dist <= ast.radius + 48) {
              robotAudio.playNearMiss();
              const dodgePts = Math.round(75 * cfg.pointMultiplier);
              live.score += dodgePts;
              live.dodgedCount += 1;
              addFloatingText(p.x, p.y - 25, `+${dodgePts} NEAR MISS!`, "#38bdf8");
            } else {
              live.dodgedCount += 1;
            }
          }

          // Collision Detection with Player
          const distToPlayer = Math.hypot(p.x - ast.x, p.y - ast.y);
          const collisionDist = 14 + ast.hitRadius;

          if (distToPlayer <= collisionDist) {
            if (live.boostTimer > 0) {
              // Shield ramming obliteration!
              asteroidsRef.current.splice(i, 1);
              robotAudio.playShieldAbsorb();
              addParticles(ast.x, ast.y, "#f59e0b", 22);
              const clearPts = Math.round(200 * cfg.pointMultiplier);
              live.score += clearPts;
              addFloatingText(ast.x, ast.y, `SHIELD RAM! +${clearPts}`, "#fbbf24");
              live.screenShake = 6;
              continue;
            } else if (live.invulnerableTimer <= 0) {
              // Damage hit!
              robotAudio.playAsteroidCrash();
              addParticles(p.x, p.y, "#ef4444", 26, 200);
              live.screenShake = 14;
              live.invulnerableTimer = 1.35;
              p.targetY = Math.min(height - 40, p.y + 24);

              const damage = ast.type === "titan" ? 45 : ast.type === "fire" ? 35 : ast.type === "debris" ? 18 : 28;
              live.hullIntegrity = Math.max(0, live.hullIntegrity - damage);

              addFloatingText(p.x, p.y - 45, `💥 HULL HIT -${damage}%!`, "#ef4444");

              if (live.hullIntegrity <= 0) {
                handleGameOver(live.distanceTraveled, live.dodgedCount, live.score);
              }

              if (ast.type !== "titan") {
                asteroidsRef.current.splice(i, 1);
                continue;
              }
            }
          }

          if (ast.y > height + ast.radius + 30) {
            asteroidsRef.current.splice(i, 1);
            continue;
          }

          // DRAW ASTEROID WITH 3D SHADING
          ctx.save();
          ctx.translate(ast.x, ast.y);

          if (ast.type === "fire") {
            ctx.shadowColor = "#ef4444";
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.moveTo(-ast.radius * 0.7, -ast.radius * 0.2);
            ctx.quadraticCurveTo(0, -ast.radius * 2.2, ast.radius * 0.7, -ast.radius * 0.2);
            ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-ast.radius * 0.4, -ast.radius * 0.2);
            ctx.quadraticCurveTo(0, -ast.radius * 1.5, ast.radius * 0.4, -ast.radius * 0.2);
            ctx.fillStyle = "rgba(245, 158, 11, 0.7)";
            ctx.fill();
          } else if (ast.type === "ice") {
            ctx.shadowColor = "#06b6d4";
            ctx.shadowBlur = 14;
          }

          ctx.rotate(ast.rotation);

          // Jagged Rock Polygon
          ctx.beginPath();
          ast.vertices.forEach((v, idx) => {
            const vx = Math.cos(v.angle) * v.dist;
            const vy = Math.sin(v.angle) * v.dist;
            if (idx === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          });
          ctx.closePath();

          if (ast.type === "fire") {
            const astGrad = ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 4, 0, 0, ast.radius);
            astGrad.addColorStop(0, "#fb923c");
            astGrad.addColorStop(0.7, "#dc2626");
            astGrad.addColorStop(1, "#7f1d1d");
            ctx.fillStyle = astGrad;
          } else if (ast.type === "ice") {
            const astGrad = ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 4, 0, 0, ast.radius);
            astGrad.addColorStop(0, "#cffafe");
            astGrad.addColorStop(0.6, "#06b6d4");
            astGrad.addColorStop(1, "#0f766e");
            ctx.fillStyle = astGrad;
          } else if (ast.type === "titan") {
            const astGrad = ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 8, 0, 0, ast.radius);
            astGrad.addColorStop(0, "#94a3b8");
            astGrad.addColorStop(0.7, "#475569");
            astGrad.addColorStop(1, "#1e293b");
            ctx.fillStyle = astGrad;
          } else if (ast.type === "debris") {
            const astGrad = ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 2, 0, 0, ast.radius);
            astGrad.addColorStop(0, "#cbd5e1");
            astGrad.addColorStop(0.7, "#64748b");
            astGrad.addColorStop(1, "#1e293b");
            ctx.fillStyle = astGrad;
          } else {
            const astGrad = ctx.createRadialGradient(-ast.radius * 0.3, -ast.radius * 0.3, 4, 0, 0, ast.radius);
            astGrad.addColorStop(0, "#e2e8f0");
            astGrad.addColorStop(0.65, "#64748b");
            astGrad.addColorStop(1, "#1e293b");
            ctx.fillStyle = astGrad;
          }

          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Craters
          ast.craters.forEach((crater) => {
            ctx.fillStyle = "rgba(15, 23, 42, 0.45)";
            ctx.beginPath();
            ctx.arc(crater.ox, crater.oy, crater.r, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(crater.ox - 1, crater.oy - 1, crater.r, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
          });

          ctx.restore();
        }

        // 7. Render Finish Gate when approaching >= 88%
        const finishProgress = live.distanceTraveled / cfg.targetDistance;
        if (finishProgress >= 0.88) {
          const gateY = Math.min(130, -80 + (finishProgress - 0.88) * 1600);
          const gateCenterX = width / 2;

          ctx.save();
          ctx.translate(gateCenterX, gateY);

          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 24;
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 110, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, 85, 0, Math.PI * 2);
          ctx.stroke();

          const vortexGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 85);
          vortexGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          vortexGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.5)");
          vortexGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
          ctx.fillStyle = vortexGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 85, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 13px monospace";
          ctx.textAlign = "center";
          ctx.fillText("🏁 FINISH SECTOR GATE", 0, -125);

          ctx.restore();
        }

        // 8. Render Butter-Smooth Rocket
        const isBlinking = live.invulnerableTimer > 0 && Math.floor(currentTime / 70) % 2 === 0;

        if (!isBlinking) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.tilt);

          const skinColor = activeSkinConfig.dotColor;

          // Rocket Plasma Thruster Flame with smooth sine pulsating length
          const flameLength = (live.boostTimer > 0 ? 38 : 22) + Math.sin(currentTime * 0.04) * 6;
          const flameWidth = live.boostTimer > 0 ? 15 : 9;

          ctx.shadowColor = live.boostTimer > 0 ? "#38bdf8" : skinColor;
          ctx.shadowBlur = live.boostTimer > 0 ? 25 : 18;
          ctx.fillStyle = live.boostTimer > 0 ? "rgba(56, 189, 248, 0.9)" : "rgba(249, 115, 22, 0.9)";
          ctx.beginPath();
          ctx.moveTo(-flameWidth, p.height * 0.44);
          ctx.lineTo(0, p.height * 0.44 + flameLength);
          ctx.lineTo(flameWidth, p.height * 0.44);
          ctx.closePath();
          ctx.fill();

          // Inner Core Flame
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(-flameWidth * 0.4, p.height * 0.44);
          ctx.lineTo(0, p.height * 0.44 + flameLength * 0.62);
          ctx.lineTo(flameWidth * 0.4, p.height * 0.44);
          ctx.closePath();
          ctx.fill();

          // Main Chassis
          ctx.shadowColor = skinColor;
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(0, -p.height * 0.54);
          ctx.lineTo(p.width * 0.35, -p.height * 0.1);
          ctx.lineTo(p.width * 0.38, p.height * 0.44);
          ctx.lineTo(-p.width * 0.38, p.height * 0.44);
          ctx.lineTo(-p.width * 0.35, -p.height * 0.1);
          ctx.closePath();
          ctx.fill();

          // Side Swept Wings
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.moveTo(-p.width * 0.35, p.height * 0.05);
          ctx.lineTo(-p.width * 0.68, p.height * 0.46);
          ctx.lineTo(-p.width * 0.38, p.height * 0.44);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(p.width * 0.35, p.height * 0.05);
          ctx.lineTo(p.width * 0.68, p.height * 0.46);
          ctx.lineTo(p.width * 0.38, p.height * 0.44);
          ctx.closePath();
          ctx.fill();

          // Neon Accent Trim Lines
          ctx.strokeStyle = skinColor;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-p.width * 0.22, p.height * 0.44);
          ctx.lineTo(0, -p.height * 0.44);
          ctx.lineTo(p.width * 0.22, p.height * 0.44);
          ctx.stroke();

          // Cockpit Visor Canopy
          ctx.fillStyle = "#38bdf8";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.ellipse(0, -p.height * 0.15, p.width * 0.18, p.height * 0.22, 0, 0, Math.PI * 2);
          ctx.fill();

          // Wingtip Navigation Beacon Lights
          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(p.width * 0.65, p.height * 0.45, 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(-p.width * 0.65, p.height * 0.45, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Active Energy Shield Dome
          if (live.boostTimer > 0 || live.hullIntegrity > 0) {
            const shieldColor = live.boostTimer > 0 ? "#38bdf8" : skinColor;

            ctx.shadowColor = shieldColor;
            ctx.shadowBlur = live.boostTimer > 0 ? 25 : 12;
            ctx.strokeStyle = shieldColor;
            ctx.lineWidth = live.boostTimer > 0 ? 3 : 1.5;

            ctx.beginPath();
            ctx.arc(0, 0, p.height * 0.62, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = live.boostTimer > 0 ? "rgba(56, 189, 248, 0.18)" : "rgba(255, 255, 255, 0.04)";
            ctx.fill();
          }

          ctx.restore();
        }

        // Particle Exhaust Sparks
        if (Math.random() < 0.65) {
          particlesRef.current.push({
            x: p.x + (Math.random() - 0.5) * 8,
            y: p.y + p.height * 0.44,
            vx: (Math.random() - 0.5) * 30,
            vy: 90 + Math.random() * 130,
            radius: 1.4 + Math.random() * 2,
            color: live.boostTimer > 0 ? "#38bdf8" : activeSkinConfig.dotColor,
            alpha: 1,
            decay: 2.6,
          });
        }
      }

      // 9. Particles Updates
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.alpha -= pt.decay * dt;

        if (pt.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 10. Floating Score Texts
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y += ft.vy * dt;
        ft.alpha -= 1.35 * dt;

        if (ft.alpha <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 8;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      ctx.restore();

      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      resizeObserver.disconnect();
    };
  }, [
    isOpen,
    activeSkinConfig.dotColor,
    handleLevelWin,
    handleGameOver,
    initStarsAndNebulas,
    spawnAsteroid,
    spawnAsteroidWave,
    spawnCollectible,
  ]);

  if (!isOpen || !mounted) return null;

  const distancePercent = Math.min(
    100,
    Math.round((hudDistance / currentConfig.targetDistance) * 100)
  );

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cosmic Rocket Arcade Game"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="relative w-full max-w-4xl h-[94vh] max-h-[820px] rounded-3xl border border-orange-500/40 bg-slate-950 flex flex-col overflow-hidden shadow-2xl shadow-orange-500/20 text-white select-none">
        {/* 1. TOP FUTURISTIC HUD HEADER */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5 z-20">
          {/* Level Info & Sektor Badge */}
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl font-black text-sm shadow-md"
              style={{
                backgroundColor: activeSkinConfig.dotColor,
                boxShadow: `0 0 12px ${activeSkinConfig.dotColor}66`,
              }}
            >
              <Rocket size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-orange-400 border border-orange-500/30">
                  SEKTOR {currentConfig.level} / 10
                </span>
                <span className="font-black text-xs sm:text-sm tracking-tight text-white hidden sm:inline">
                  {currentConfig.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                {currentConfig.subtitle}
              </span>
            </div>
          </div>

          {/* Central Progress Bar */}
          <div className="flex-1 max-w-[280px] sm:max-w-[340px] flex flex-col gap-1 mx-auto">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">
                🚀 {Math.round(hudDistance)}m / {currentConfig.targetDistance}m
              </span>
              <span className="text-amber-400 font-bold">{distancePercent}%</span>
              <span className="text-emerald-400 font-bold">🏁 FINISH</span>
            </div>
            <div className="relative w-full h-2.5 sm:h-3 rounded-full bg-slate-950 border border-slate-700 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400"
                style={{ width: `${distancePercent}%` }}
              />
            </div>
          </div>

          {/* Score & Hull Health Bar */}
          <div className="flex items-center gap-3">
            {/* Hull Integrity */}
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-1 text-[10px] font-mono">
                <Shield
                  size={12}
                  className={
                    hudHull > 50
                      ? "text-emerald-400"
                      : hudHull > 25
                      ? "text-amber-400"
                      : "text-red-400"
                  }
                />
                <span className="text-slate-400">HULL:</span>
                <span
                  className={`font-bold ${
                    hudHull > 50
                      ? "text-emerald-400"
                      : hudHull > 25
                      ? "text-amber-400"
                      : "text-red-400 animate-pulse"
                  }`}
                >
                  {hudHull}%
                </span>
              </div>
              <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden mt-0.5">
                <div
                  className={`h-full transition-all duration-300 ${
                    hudHull > 50
                      ? "bg-emerald-500"
                      : hudHull > 25
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${hudHull}%` }}
                />
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-slate-400">SCORE</span>
              <span className="text-sm sm:text-base font-black font-mono text-amber-300 tracking-tight">
                {hudScore.toLocaleString()}
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className="p-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-orange-500 transition-colors cursor-pointer"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white hover:bg-red-500/30 hover:border-red-500 transition-colors cursor-pointer"
              title="Keluar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 2. MAIN INTERACTIVE SPACE CANVAS AREA */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden cursor-crosshair">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="absolute inset-0 w-full h-full touch-none"
            style={{ touchAction: "none" }}
          />

          {/* In-Game Floating HUD Overlays (when playing) */}
          {gameState === "playing" && (
            <>
              {/* Bottom Left: Live Stats */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:flex flex-col gap-1.5 bg-slate-900/85 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 text-[10.5px] font-mono shadow-lg">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Star size={13} className="text-amber-400" />
                  <span>Starlight: {hudCrystals}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Shield size={13} className="text-cyan-400" />
                  <span>Dodge Streak: {hudDodged}</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <Flame size={13} />
                  <span>Bonus Poin: {currentConfig.pointMultiplier}x</span>
                </div>
              </div>

              {/* Bottom Right: Boost / Shield Button */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1.5">
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    triggerBoost();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerBoost();
                  }}
                  disabled={hudBoostCooldown > 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-xl cursor-pointer ${
                    hudBoostCooldown > 0
                      ? "bg-slate-800/80 border border-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 text-white border border-amber-300 hover:scale-105 active:scale-95 shadow-orange-500/40"
                  }`}
                  style={{
                    boxShadow:
                      hudBoostCooldown === 0
                        ? `0 0 20px ${activeSkinConfig.dotColor}88`
                        : "none",
                  }}
                >
                  <Zap size={16} className={hudBoostCooldown === 0 ? "animate-bounce" : ""} />
                  <span>
                    {hudBoostCooldown > 0 ? `COOLDOWN ${hudBoostCooldown}s` : "SHIELD BOOST [SPACE]"}
                  </span>
                </button>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:inline">
                  Hancurkan asteroid & perisai kilat
                </span>
              </div>
            </>
          )}

          {/* OVERLAY 1: START MENU */}
          {gameState === "menu" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
            >
              <div className="w-full max-w-lg rounded-3xl border border-orange-500/40 bg-slate-900/95 p-6 sm:p-8 text-center shadow-2xl">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl"
                  style={{
                    backgroundColor: activeSkinConfig.dotColor,
                    boxShadow: `0 0 25px ${activeSkinConfig.dotColor}66`,
                  }}
                >
                  <Rocket size={34} className="animate-pulse" />
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

                {/* Level Sector Quick Summary */}
                <div className="my-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Sektor Terpilih:</span>
                    <span className="font-bold text-orange-400">
                      Level {currentConfig.level}: {currentConfig.name}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Target Finish: {currentConfig.targetDistance}m</span>
                    <span>Point Multiplier: {currentConfig.pointMultiplier}x</span>
                  </div>
                </div>

                {/* Level Selector Button */}
                <div className="mb-5 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGameState("levelSelect")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    <Compass size={14} />
                    <span>{t("arcadeSelectLevel")} (1 - 10)</span>
                  </button>
                  {highScore > 0 && (
                    <span className="text-xs font-mono text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl bg-amber-500/10">
                      🏆 Rekor: {highScore.toLocaleString()} pts
                    </span>
                  )}
                </div>

                {/* Launch Button */}
                <button
                  type="button"
                  onClick={() => handleStartGame()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeSkinConfig.dotColor,
                    boxShadow: `0 0 25px ${activeSkinConfig.dotColor}88`,
                  }}
                >
                  <Play size={18} />
                  <span>{t("arcadeStartBtn")}</span>
                </button>
              </div>
            </div>
          )}

          {/* OVERLAY 2: LEVEL SELECT MODAL */}
          {gameState === "levelSelect" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
            >
              <div className="w-full max-w-2xl max-h-[90%] overflow-y-auto rounded-3xl border border-orange-500/40 bg-slate-900/95 p-5 sm:p-7 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Compass size={20} className="text-orange-400" />
                    <h3 className="text-lg font-black text-white">
                      PILIH SEKTOR LEVEL (1 - 10)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGameState("menu")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto pr-1">
                  {SECTOR_LEVELS.map((lvl) => {
                    const isUnlocked = lvl.level <= unlockedLevel;
                    const isSelected = lvl.level === selectedLevel;

                    return (
                      <button
                        key={lvl.level}
                        type="button"
                        disabled={!isUnlocked}
                        onClick={() => {
                          setSelectedLevel(lvl.level);
                          setGameState("menu");
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          !isUnlocked
                            ? "bg-slate-950/60 border-slate-800/80 opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "bg-orange-500/20 border-orange-500 text-white shadow-[0_0_15px_rgba(255,98,0,0.3)] ring-1 ring-orange-500"
                            : "bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-200 hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm ${
                              !isUnlocked
                                ? "bg-slate-800 text-slate-500"
                                : isSelected
                                ? "bg-orange-500 text-white"
                                : "bg-slate-800 text-orange-400"
                            }`}
                          >
                            {isUnlocked ? lvl.level : <Lock size={15} />}
                          </div>
                          <div>
                            <span className="font-bold text-xs block text-white">
                              {lvl.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Finish: {lvl.targetDistance}m • {lvl.pointMultiplier}x Pts
                            </span>
                          </div>
                        </div>
                        {isUnlocked && (
                          <ChevronRight
                            size={16}
                            className={isSelected ? "text-orange-400" : "text-slate-500"}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setGameState("menu")}
                    className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                  >
                    Kembali ke Menu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OVERLAY 3: LEVEL WIN / FINISH REACHED! */}
          {gameState === "win" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="w-full max-w-md rounded-3xl border border-emerald-500/50 bg-slate-900/95 p-6 sm:p-8 text-center shadow-2xl shadow-emerald-500/20">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 animate-bounce">
                  <Trophy size={34} />
                </div>

                <span className="font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  {t("arcadeCompleted")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  SEKTOR {selectedLevel} CLEARED!
                </h3>

                {/* Tingkat Keberhasilan (Success Rate) */}
                <div className="my-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {t("arcadeSuccessRateLabel")}
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span
                      className="text-3xl sm:text-4xl font-black font-mono"
                      style={{ color: finalGrade.color }}
                    >
                      {finalSuccessRate}%
                    </span>
                    <div
                      className="px-2.5 py-1 rounded-xl text-xs font-black"
                      style={{
                        backgroundColor: `${finalGrade.color}25`,
                        color: finalGrade.color,
                        border: `1px solid ${finalGrade.color}55`,
                      }}
                    >
                      {finalGrade.rank} RANK
                    </div>
                  </div>
                  <span className="text-xs text-slate-300 font-bold mt-1 block">
                    {finalGrade.title}
                  </span>
                </div>

                {/* Score & Record Display */}
                <div className="font-mono mb-4">
                  <span className="text-[10px] text-slate-400 uppercase block">
                    {t("arcadePointsLabel")}
                  </span>
                  <span className="text-3xl font-black text-amber-300">
                    {hudScore.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-slate-400">PTS</span>
                  </span>
                  {isNewRecord && (
                    <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300 animate-pulse">
                      <Sparkles size={11} />
                      <span>NEW HIGH SCORE RECORD!</span>
                    </div>
                  )}
                </div>

                {/* Flight Stats Breakdown */}
                <div className="grid grid-cols-3 gap-2 border-y border-slate-800 py-3 font-mono text-xs text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Jarak</span>
                    <span className="text-emerald-400 font-bold">
                      {currentConfig.targetDistance}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Dodge</span>
                    <span className="text-cyan-400 font-bold">{hudDodged}x</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sisa Hull</span>
                    <span className="text-amber-400 font-bold">{hudHull}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-col gap-2">
                  {selectedLevel < 10 ? (
                    <button
                      type="button"
                      onClick={() => handleStartGame(selectedLevel + 1)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>{t("arcadeNextLevelBtn")} (Level {selectedLevel + 1})</span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs">
                      👑 SELAMAT! Anda telah menaklukkan seluruh 10 Sektor Kosmik!
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartGame(selectedLevel)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-800 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>{t("arcadePlayAgain")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGameState("levelSelect")}
                      className="flex-1 rounded-full bg-slate-800 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      {t("arcadeSelectLevel")}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-red-500/30 transition-colors"
                    >
                      {t("arcadeClose")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OVERLAY 4: GAME OVER / CRASH */}
          {gameState === "gameover" && (
            <div
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-slate-900/95 p-6 sm:p-8 text-center shadow-2xl shadow-red-500/20">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-xl shadow-red-500/30 animate-pulse">
                  <AlertTriangle size={34} />
                </div>

                <span className="font-mono text-xs font-bold tracking-widest text-red-400 uppercase">
                  {t("arcadeCrashed")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  ROKET MENGALAMI KERUSAKAN
                </h3>

                {/* Tingkat Keberhasilan (Success Rate) */}
                <div className="my-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    {t("arcadeSuccessRateLabel")}
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span
                      className="text-3xl sm:text-4xl font-black font-mono"
                      style={{ color: finalGrade.color }}
                    >
                      {finalSuccessRate}%
                    </span>
                    <div
                      className="px-2.5 py-1 rounded-xl text-xs font-black"
                      style={{
                        backgroundColor: `${finalGrade.color}25`,
                        color: finalGrade.color,
                        border: `1px solid ${finalGrade.color}55`,
                      }}
                    >
                      {finalGrade.rank} RANK
                    </div>
                  </div>
                  <span className="text-xs text-slate-300 font-bold mt-1 block">
                    {finalGrade.title}
                  </span>
                </div>

                {/* Score Breakdown */}
                <div className="font-mono mb-4">
                  <span className="text-[10px] text-slate-400 uppercase block">
                    {t("arcadePointsLabel")}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">
                    {hudScore.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-slate-400">PTS</span>
                  </span>
                </div>

                {/* Distance Reached */}
                <div className="grid grid-cols-2 gap-2 border-y border-slate-800 py-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Jarak Berhasil</span>
                    <span className="text-orange-400 font-bold">
                      {Math.round(hudDistance)}m / {currentConfig.targetDistance}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Asteroid Dihindari</span>
                    <span className="text-cyan-400 font-bold">{hudDodged}x</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartGame(selectedLevel)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-all cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>{t("arcadePlayAgain")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameState("levelSelect")}
                    className="rounded-full bg-slate-800 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    {t("arcadeSelectLevel")}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-slate-800 px-4 py-3 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    {t("arcadeClose")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. BOTTOM TIP DOCK */}
        <div className="px-4 sm:px-6 py-2 border-t border-slate-800/80 bg-slate-950 text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
          <span className="line-clamp-1">{t("arcadeTip")}</span>
          <span className="hidden sm:inline text-orange-400/80">
            SMKN 1 PASURUAN • REKAYASA PERANGKAT LUNAK
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
