"use client";

import { useEffect, useRef, useState, useCallback, ComponentType } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";
import {
  Code2,
  ShieldCheck,
  Zap,
  Rocket,
  ThumbsUp,
  Trophy,
  Hand,
  Volume2,
  VolumeX,
  Gamepad2,
  Sparkles,
  X,
} from "lucide-react";
import { robotAudio } from "@/lib/robotSoundSynth";
import {
  ROBOT_SKINS,
  ROBOT_SKIN_LIST,
  RobotSkinId,
  applyRobotSkinToMaterials,
} from "@/lib/robotSkins";
import CyberBugArcadeGame from "@/components/3d/CyberBugArcadeGame";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/i18n";

interface RobotCanvasProps {
  className?: string;
}

export type RobotActionType =
  | "code"
  | "debug"
  | "spin"
  | "deploy"
  | "thumbsUp"
  | "dance"
  | "wave";

interface ActionItem {
  id: RobotActionType;
  label: string;
  translationKey: keyof typeof TRANSLATIONS.id;
  icon: ComponentType<{ className?: string; size?: number }>;
}

const ACTION_LIST: ActionItem[] = [
  { id: "wave", label: "Salam RPL", translationKey: "actionWave", icon: Hand },
  { id: "code", label: "Holo Code", translationKey: "actionCode", icon: Code2 },
  { id: "debug", label: "Fix Bug", translationKey: "actionDebug", icon: ShieldCheck },
  { id: "spin", label: "Turbo Spin", translationKey: "actionSpin", icon: Zap },
  { id: "deploy", label: "Deploy App", translationKey: "actionDeploy", icon: Rocket },
  { id: "thumbsUp", label: "Clean Code", translationKey: "actionThumbsUp", icon: ThumbsUp },
  { id: "dance", label: "Victory", translationKey: "actionDance", icon: Trophy },
];

const RPL_SPEECHES: Record<RobotActionType, string[]> = {
  wave: [
    "Halo! Salam Rekayasa Perangkat Lunak dari SMKN 1 Pasuruan!",
    "Selamat datang di Azmi.Dev - Siswa RPL SMKN 1 Pasuruan!",
    "Siap bantu kembangkan proyek digital Anda dengan standar modern!",
  ],
  code: [
    "rpl-terminal: npm run dev --turbo",
    "Writing clean, modular TypeScript code • SMKN 1 Pasuruan!",
    "const dev = 'Azmi'; // Rekayasa Perangkat Lunak SMKN 1 Pasuruan",
    "Building fullstack web app with Next.js 16 & React 19!",
  ],
  debug: [
    "0 Errors, 0 Warnings! Bug Resolved!",
    "Running automated unit tests: 100% PASSED!",
    "Memory leak checked & clean architecture applied!",
    "Syntax verified: No runtime exceptions!",
  ],
  spin: [
    "Overclocked Compilation Mode Active!",
    "High Performance Hardware Accelerated!",
    "System Turbo 360° Multi-Threaded!",
  ],
  deploy: [
    "Deploying to Cloud Production!",
    "Vercel Edge Network: Status LIVE 200 OK!",
    "Docker Container Launched with Zero Downtime!",
  ],
  thumbsUp: [
    "Clean Code & Solid Architecture Approved!",
    "Code that works, Design that sells!",
    "TypeScript strict mode: Fully Verified by SMKN 1 Pasuruan!",
  ],
  dance: [
    "All Tests Passing on First Attempt!",
    "Feature Shipped on Schedule!",
    "Sprint Goal Achieved with 100% Velocity!",
  ],
};

// Procedural Digital LED Visor Face Painter
function drawRobotFace(
  ctx: CanvasRenderingContext2D,
  expression: string,
  eyeColorHex: string,
  blinkScale: number
) {
  ctx.clearRect(0, 0, 512, 256);

  const leftX = 175;
  const rightX = 337;
  const centerY = 128;

  // 1. If blinking, draw horizontal glowing laser slits
  if (blinkScale < 0.22) {
    ctx.fillStyle = eyeColorHex;
    ctx.beginPath();
    ctx.roundRect(leftX - 44, centerY - 4, 88, 8, 4);
    ctx.roundRect(rightX - 44, centerY - 4, 88, 8, 4);
    ctx.fill();
    return;
  }

  ctx.lineWidth = 14;
  ctx.strokeStyle = eyeColorHex;
  ctx.fillStyle = eyeColorHex;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (expression === "wave" || expression === "happy") {
    // (^ ‿ ^) Happy curved arch eyes with cute blushing LEDs
    ctx.beginPath();
    ctx.arc(leftX, centerY + 12, 42, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rightX, centerY + 12, 42, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    // Soft blush LED dots
    ctx.fillStyle = "rgba(255, 98, 0, 0.65)";
    ctx.beginPath();
    ctx.arc(leftX - 58, centerY + 24, 12, 0, Math.PI * 2);
    ctx.arc(rightX + 58, centerY + 24, 12, 0, Math.PI * 2);
    ctx.fill();

    // Digital smile notch
    ctx.strokeStyle = eyeColorHex;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(256, centerY + 36, 22, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
  } else if (expression === "thumbsUp" || expression === "dance") {
    // (★ ‿ ★) Star eyes with proud smile
    const drawStar = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const innerAngle = outerAngle + Math.PI / 5;
        const ox = cx + Math.cos(outerAngle) * r;
        const oy = cy + Math.sin(outerAngle) * r;
        const ix = cx + Math.cos(innerAngle) * (r * 0.45);
        const iy = cy + Math.sin(innerAngle) * (r * 0.45);
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill();
    };

    drawStar(leftX, centerY, 40);
    drawStar(rightX, centerY, 40);

    ctx.strokeStyle = eyeColorHex;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(256, centerY + 36, 26, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  } else if (expression === "code") {
    // ({ ⌂ }) Code brackets on eyes
    ctx.font = "bold 82px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("{", leftX, centerY);
    ctx.fillText("}", rightX, centerY);

    // Center prompt
    ctx.fillStyle = "#34d399";
    ctx.font = "bold 34px monospace";
    ctx.fillText(">_", 256, centerY + 34);
  } else if (expression === "debug") {
    // (ಠ ‿ ಠ) Focused analytical diagnostic squint with green reticle
    ctx.beginPath();
    ctx.roundRect(leftX - 44, centerY - 18, 88, 36, 12);
    ctx.roundRect(rightX - 44, centerY - 18, 88, 36, 12);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(leftX, centerY, 10, 0, Math.PI * 2);
    ctx.arc(rightX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();
  } else if (expression === "spin") {
    // (> ‿ <) Turbo speed squints
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(leftX - 32, centerY - 25);
    ctx.lineTo(leftX + 22, centerY);
    ctx.lineTo(leftX - 32, centerY + 25);

    ctx.moveTo(rightX + 32, centerY - 25);
    ctx.lineTo(rightX - 22, centerY);
    ctx.lineTo(rightX + 32, centerY + 25);
    ctx.stroke();
  } else if (expression === "deploy") {
    // (✦ ‿ ✦) Sparkle launch starbursts
    ctx.font = "bold 76px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦", leftX, centerY);
    ctx.fillText("✦", rightX, centerY);
  } else if (expression === "surprised") {
    // (⊙ ‿ ⊙) Surprised wide eyes when poked/clicked
    ctx.beginPath();
    ctx.arc(leftX, centerY, 44, 0, Math.PI * 2);
    ctx.arc(rightX, centerY, 44, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(leftX, centerY, 14, 0, Math.PI * 2);
    ctx.arc(rightX, centerY, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (expression === "arcade") {
    // (◉ ‿ ◉) Tactical battle targeting reticles for mini-game
    ctx.beginPath();
    ctx.arc(leftX, centerY, 42, 0, Math.PI * 2);
    ctx.arc(rightX, centerY, 42, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(leftX, centerY, 14, 0, Math.PI * 2);
    ctx.arc(rightX, centerY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Crosshair ticks
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(leftX - 52, centerY);
    ctx.lineTo(leftX + 52, centerY);
    ctx.moveTo(leftX, centerY - 52);
    ctx.lineTo(leftX, centerY + 52);
    ctx.moveTo(rightX - 52, centerY);
    ctx.lineTo(rightX + 52, centerY);
    ctx.moveTo(rightX, centerY - 52);
    ctx.lineTo(rightX, centerY + 52);
    ctx.stroke();
  } else {
    // Idle: High-tech glowing capsule eyes with specular glint
    ctx.beginPath();
    ctx.roundRect(leftX - 32, centerY - 38 * blinkScale, 64, 76 * blinkScale, 28);
    ctx.roundRect(rightX - 32, centerY - 38 * blinkScale, 64, 76 * blinkScale, 28);
    ctx.fill();

    // Specular inner reflection
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(leftX - 10, centerY - 14 * blinkScale, 7 * blinkScale, 0, Math.PI * 2);
    ctx.arc(rightX - 10, centerY - 14 * blinkScale, 7 * blinkScale, 0, Math.PI * 2);
    ctx.fill();

    // Subtle gentle smile notch
    ctx.strokeStyle = eyeColorHex;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(256, centerY + 38, 16, 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
  }
}

export default function InteractiveRobotCanvas({ className = "" }: RobotCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<RobotActionType>("wave");
  const [activeSkin, setActiveSkin] = useState<RobotSkinId>("orange");
  const [isMuted, setIsMuted] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSheetOpen]);

  // References to Three.js internal controls
  const triggerActionRef = useRef<((action: RobotActionType) => void) | null>(null);
  const triggerSkinRef = useRef<((skin: RobotSkinId) => void) | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMuted(robotAudio.isMuted());
    const savedSkin = (localStorage.getItem("robot_active_skin") as RobotSkinId) || "orange";
    if (ROBOT_SKINS[savedSkin]) {
      setActiveSkin(savedSkin);
    }
  }, []);

  useEffect(() => {
    setSpeechText(t("robotGreeting"));
  }, [language, t]);

  const showSpeech = useCallback((text: string, durationMs = 3800) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeechText(text);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechText(null);
    }, durationMs);
  }, []);

  const handleActionClick = useCallback(
    (action: RobotActionType) => {
      setActiveAction(action);

      if (action === "code") {
        robotAudio.playCyberLaser();
      } else if (action === "spin" || action === "deploy") {
        robotAudio.playTurboWhoosh();
      } else if (action === "dance" || action === "thumbsUp") {
        robotAudio.playVictoryChime();
      } else {
        robotAudio.playRobotBeep(820, 0.1);
      }

      const speechKeyMap: Record<RobotActionType, keyof typeof TRANSLATIONS.id> = {
        wave: "speechWave",
        code: "speechCode",
        debug: "speechDebug",
        spin: "speechSpin",
        deploy: "speechDeploy",
        thumbsUp: "speechThumbsUp",
        dance: "speechDance",
      };

      const key = speechKeyMap[action];
      const translatedList = t(key) as string[] | undefined;
      const msgs =
        Array.isArray(translatedList) && translatedList.length > 0
          ? translatedList
          : RPL_SPEECHES[action];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      showSpeech(randomMsg);

      if (triggerActionRef.current) {
        triggerActionRef.current(action);
      }
    },
    [showSpeech, t]
  );

  const handleSkinChange = useCallback((skinId: RobotSkinId) => {
    setActiveSkin(skinId);
    robotAudio.playSkinChange();
    if (typeof window !== "undefined") {
      localStorage.setItem("robot_active_skin", skinId);
      window.dispatchEvent(new Event("storage"));
    }
    if (triggerSkinRef.current) {
      triggerSkinRef.current(skinId);
    }
  }, []);

  const handleToggleSound = useCallback(() => {
    const muted = robotAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleOpenArcade = useCallback(() => {
    setIsArcadeOpen(true);
    robotAudio.playCyberLaser();
    if (triggerActionRef.current) {
      triggerActionRef.current("debug");
    }
  }, []);

  const handleCloseArcade = useCallback(() => {
    setIsArcadeOpen(false);
    if (triggerActionRef.current) {
      triggerActionRef.current("wave");
    }
  }, []);

  const handleGameWin = useCallback((score: number) => {
    showSpeech(
      `🏆 Misi Kosmik Berhasil! Skor: ${score.toLocaleString()} PTS! Anda pilot roket terbaik SMKN 1 Pasuruan!`,
      6000
    );
  }, [showSpeech]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 8.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "default",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 768 ? 1.0 : 1.25));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const orangeKeyLight = new THREE.DirectionalLight(0xff6600, 3.6);
    orangeKeyLight.position.set(-4.5, 3.5, 4.5);
    scene.add(orangeKeyLight);

    const whiteFillLight = new THREE.DirectionalLight(0xffffff, 3.2);
    whiteFillLight.position.set(4.5, 3.5, 4.5);
    scene.add(whiteFillLight);

    const rimLight = new THREE.DirectionalLight(0xffaa22, 3.0);
    rimLight.position.set(0, 4.5, -4.5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xff6200, 4.5, 5.0);
    coreLight.position.set(0, 0.45, 1.0);
    scene.add(coreLight);

    // 3. Materials
    const whiteArmorMat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfd,
      roughness: 0.16,
      metalness: 0.12,
    });

    const orangeArmorMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      roughness: 0.22,
      metalness: 0.28,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.35,
      metalness: 0.88,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.04,
      metalness: 0.96,
    });

    const orangeGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff5500,
      emissiveIntensity: 3.8,
      roughness: 0.15,
    });

    const eyeGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 5.0,
      roughness: 0.1,
    });

    const debugGreenMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 4.5,
      roughness: 0.1,
    });

    // 4. Robot Rig Hierarchy
    const robotRoot = new THREE.Group();
    robotRoot.scale.setScalar(width < 640 ? 0.6 : 0.72);
    robotRoot.position.set(0, -0.15, 0);
    scene.add(robotRoot);

    // --- TORSO GROUP ---
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    const chestGeo = new THREE.CylinderGeometry(0.7, 0.56, 1.05, 16);
    const chestMesh = new THREE.Mesh(chestGeo, whiteArmorMat);
    chestMesh.position.y = 0.45;
    torsoGroup.add(chestMesh);

    // Procedural Circuit Pattern on Chest Plating
    const circuitCanvas = document.createElement("canvas");
    circuitCanvas.width = 256;
    circuitCanvas.height = 256;
    const cCtx = circuitCanvas.getContext("2d");
    if (cCtx) {
      cCtx.fillStyle = "#ff5500";
      cCtx.fillRect(0, 0, 256, 256);
      cCtx.strokeStyle = "#ff9a55";
      cCtx.lineWidth = 4;
      cCtx.beginPath();
      cCtx.moveTo(20, 40);
      cCtx.lineTo(90, 40);
      cCtx.lineTo(128, 90);
      cCtx.lineTo(128, 180);
      cCtx.moveTo(236, 40);
      cCtx.lineTo(166, 40);
      cCtx.lineTo(128, 90);
      cCtx.moveTo(40, 220);
      cCtx.lineTo(90, 220);
      cCtx.lineTo(128, 180);
      cCtx.stroke();
      cCtx.fillStyle = "#ffffff";
      cCtx.beginPath();
      cCtx.arc(20, 40, 7, 0, Math.PI * 2);
      cCtx.arc(236, 40, 7, 0, Math.PI * 2);
      cCtx.arc(40, 220, 7, 0, Math.PI * 2);
      cCtx.fill();
    }
    const circuitTex = new THREE.CanvasTexture(circuitCanvas);
    const chestCircuitMat = new THREE.MeshStandardMaterial({
      map: circuitTex,
      roughness: 0.2,
      metalness: 0.3,
    });

    const chestPlateGeo = new THREE.BoxGeometry(0.76, 0.62, 0.45);
    const chestPlateMesh = new THREE.Mesh(chestPlateGeo, chestCircuitMat);
    chestPlateMesh.position.set(0, 0.54, 0.5);
    chestPlateMesh.scale.set(0.9, 0.9, 0.5);
    torsoGroup.add(chestPlateMesh);

    // Center Arc Reactor / Power Core
    const coreRingGeo = new THREE.TorusGeometry(0.2, 0.045, 16, 32);
    const coreRingMesh = new THREE.Mesh(coreRingGeo, darkMetalMat);
    coreRingMesh.position.set(0, 0.54, 0.7);
    torsoGroup.add(coreRingMesh);

    const coreInnerGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24);
    coreInnerGeo.rotateX(Math.PI / 2);
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, orangeGlowMat);
    coreInnerMesh.position.set(0, 0.54, 0.7);
    torsoGroup.add(coreInnerMesh);

    // Spine & Abdomen
    const abGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.45, 12);
    const abMesh = new THREE.Mesh(abGeo, darkMetalMat);
    abMesh.position.y = -0.22;
    torsoGroup.add(abMesh);

    for (let r = 0; r < 2; r++) {
      const ringGeo = new THREE.TorusGeometry(0.46, 0.035, 12, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, orangeArmorMat);
      ringMesh.position.y = -0.15 - r * 0.16;
      torsoGroup.add(ringMesh);
    }

    // Pelvis & Thruster Orb
    const pelvisGeo = new THREE.CylinderGeometry(0.46, 0.36, 0.35, 12);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, whiteArmorMat);
    pelvisMesh.position.y = -0.55;
    torsoGroup.add(pelvisMesh);

    const antiGravGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const antiGravMesh = new THREE.Mesh(antiGravGeo, orangeGlowMat);
    antiGravMesh.position.set(0, -0.75, 0);
    torsoGroup.add(antiGravMesh);

    // --- NECK & HEAD GROUP ---
    const neckGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.28, 12);
    const neckMesh = new THREE.Mesh(neckGeo, darkMetalMat);
    neckMesh.position.y = 1.05;
    torsoGroup.add(neckMesh);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.35, 0);
    torsoGroup.add(headGroup);

    // Head Helmet
    const headGeo = new THREE.SphereGeometry(0.62, 24, 24);
    headGeo.scale(1, 0.95, 1.05);
    const headMesh = new THREE.Mesh(headGeo, whiteArmorMat);
    headGroup.add(headMesh);

    // Orange Crest on Top
    const crestGeo = new THREE.BoxGeometry(0.14, 0.28, 0.85);
    const crestMesh = new THREE.Mesh(crestGeo, orangeArmorMat);
    crestMesh.position.set(0, 0.65, 0.05);
    headGroup.add(crestMesh);

    // Glossy Curved Visor Background
    const visorGeo = new THREE.SphereGeometry(0.58, 24, 24, 0, Math.PI, 0, Math.PI * 0.55);
    visorGeo.scale(0.96, 0.82, 1.08);
    visorGeo.rotateY(Math.PI / 2);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.08);
    headGroup.add(visorMesh);

    // --- EXPRESSIVE DIGITAL LED SCREEN VISOR DECAL ---
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 512;
    faceCanvas.height = 256;
    const faceCtx = faceCanvas.getContext("2d")!;
    const faceTex = new THREE.CanvasTexture(faceCanvas);
    faceTex.colorSpace = THREE.SRGBColorSpace;

    const faceMat = new THREE.MeshBasicMaterial({
      map: faceTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const faceGeo = new THREE.PlaneGeometry(0.72, 0.36);
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0.06, 0.65);
    headGroup.add(faceMesh);

    // Ear Antennas with Glowing Sensor Tips
    const earGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 16);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, orangeArmorMat);
    leftEar.position.set(-0.66, 0.05, 0);
    headGroup.add(leftEar);

    const antennaPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.42, 8);
    const leftAntennaPole = new THREE.Mesh(antennaPoleGeo, darkMetalMat);
    leftAntennaPole.position.set(-0.72, 0.26, 0);
    leftAntennaPole.rotation.z = -0.25;
    headGroup.add(leftAntennaPole);

    const antennaTipGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const leftAntennaTip = new THREE.Mesh(antennaTipGeo, orangeGlowMat);
    leftAntennaTip.position.set(-0.76, 0.48, 0);
    headGroup.add(leftAntennaTip);

    const rightEar = new THREE.Mesh(earGeo, orangeArmorMat);
    rightEar.position.set(0.66, 0.05, 0);
    headGroup.add(rightEar);

    const rightAntennaPole = new THREE.Mesh(antennaPoleGeo, darkMetalMat);
    rightAntennaPole.position.set(0.72, 0.26, 0);
    rightAntennaPole.rotation.z = 0.25;
    headGroup.add(rightAntennaPole);

    const rightAntennaTip = new THREE.Mesh(antennaTipGeo, orangeGlowMat);
    rightAntennaTip.position.set(0.76, 0.48, 0);
    headGroup.add(rightAntennaTip);

    // --- ARMS & SHOULDERS ---
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.92, 0.72, 0);
    torsoGroup.add(leftArmGroup);

    const pauldronGeo = new THREE.SphereGeometry(0.34, 16, 16);
    pauldronGeo.scale(1.1, 0.8, 1);
    const leftPauldron = new THREE.Mesh(pauldronGeo, orangeArmorMat);
    leftArmGroup.add(leftPauldron);

    // Left Shoulder: RPL Badge
    const rplCanvas = document.createElement("canvas");
    rplCanvas.width = 160;
    rplCanvas.height = 80;
    const rplCtx = rplCanvas.getContext("2d");
    if (rplCtx) {
      rplCtx.fillStyle = "#ff5500";
      rplCtx.fillRect(0, 0, 160, 80);
      rplCtx.strokeStyle = "#ffffff";
      rplCtx.lineWidth = 5;
      rplCtx.strokeRect(4, 4, 152, 72);
      rplCtx.fillStyle = "#ffffff";
      rplCtx.font = "bold 44px 'Courier New', monospace";
      rplCtx.textAlign = "center";
      rplCtx.textBaseline = "middle";
      rplCtx.fillText("RPL", 80, 40);
    }
    const rplTex = new THREE.CanvasTexture(rplCanvas);
    const rplBadgeMat = new THREE.MeshBasicMaterial({ map: rplTex });
    const rplBadgeGeo = new THREE.PlaneGeometry(0.32, 0.16);
    const rplBadge = new THREE.Mesh(rplBadgeGeo, rplBadgeMat);
    rplBadge.position.set(-0.25, 0.12, 0.24);
    rplBadge.rotation.y = -Math.PI / 4;
    leftArmGroup.add(rplBadge);

    const upperArmGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.6, 12);
    const leftUpperArm = new THREE.Mesh(upperArmGeo, whiteArmorMat);
    leftUpperArm.position.set(-0.06, -0.42, 0);
    leftArmGroup.add(leftUpperArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(-0.06, -0.72, 0);
    leftArmGroup.add(leftForearmGroup);

    const forearmGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.55, 12);
    const leftForearm = new THREE.Mesh(forearmGeo, darkMetalMat);
    leftForearm.position.set(0, -0.25, 0.1);
    leftForearm.rotation.x = 0.3;
    leftForearmGroup.add(leftForearm);

    const handGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, whiteArmorMat);
    leftHand.position.set(0, -0.6, 0.22);
    leftForearmGroup.add(leftHand);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.92, 0.72, 0);
    torsoGroup.add(rightArmGroup);

    const rightPauldron = new THREE.Mesh(pauldronGeo, orangeArmorMat);
    rightArmGroup.add(rightPauldron);

    // Right Shoulder: SMKN 1 Pasuruan Badge
    const smkCanvas = document.createElement("canvas");
    smkCanvas.width = 160;
    smkCanvas.height = 80;
    const smkCtx = smkCanvas.getContext("2d");
    if (smkCtx) {
      smkCtx.fillStyle = "#ff5500";
      smkCtx.fillRect(0, 0, 160, 80);
      smkCtx.strokeStyle = "#ffffff";
      smkCtx.lineWidth = 5;
      smkCtx.strokeRect(4, 4, 152, 72);
      smkCtx.fillStyle = "#ffffff";
      smkCtx.font = "bold 36px 'Courier New', monospace";
      smkCtx.textAlign = "center";
      smkCtx.textBaseline = "middle";
      smkCtx.fillText("SMKN 1", 80, 40);
    }
    const smkTex = new THREE.CanvasTexture(smkCanvas);
    const smkBadgeMat = new THREE.MeshBasicMaterial({ map: smkTex });
    const smkBadge = new THREE.Mesh(rplBadgeGeo, smkBadgeMat);
    smkBadge.position.set(0.25, 0.12, 0.24);
    smkBadge.rotation.y = Math.PI / 4;
    rightArmGroup.add(smkBadge);

    const rightUpperArm = new THREE.Mesh(upperArmGeo, whiteArmorMat);
    rightUpperArm.position.set(0.06, -0.42, 0);
    rightArmGroup.add(rightUpperArm);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0.06, -0.72, 0);
    rightArmGroup.add(rightForearmGroup);

    const rightForearm = new THREE.Mesh(forearmGeo, darkMetalMat);
    rightForearm.position.set(0, -0.25, 0.1);
    rightForearm.rotation.x = 0.3;
    rightForearmGroup.add(rightForearm);

    const rightHand = new THREE.Mesh(handGeo, whiteArmorMat);
    rightHand.position.set(0, -0.6, 0.22);
    rightForearmGroup.add(rightHand);

    // --- JETPACK ---
    const jetpackGroup = new THREE.Group();
    jetpackGroup.position.set(0, 0.45, -0.62);
    torsoGroup.add(jetpackGroup);

    const jetpackBodyGeo = new THREE.BoxGeometry(0.65, 0.72, 0.26);
    const jetpackBody = new THREE.Mesh(jetpackBodyGeo, darkMetalMat);
    jetpackGroup.add(jetpackBody);

    const thrusterGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.48, 12);
    const leftThruster = new THREE.Mesh(thrusterGeo, orangeArmorMat);
    leftThruster.position.set(-0.25, -0.36, 0);
    jetpackGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, orangeArmorMat);
    rightThruster.position.set(0.25, -0.36, 0);
    jetpackGroup.add(rightThruster);

    const exhaustGeo = new THREE.ConeGeometry(0.14, 0.55, 12);
    exhaustGeo.rotateX(Math.PI);
    const leftExhaust = new THREE.Mesh(exhaustGeo, orangeGlowMat);
    leftExhaust.position.set(-0.25, -0.68, 0);
    jetpackGroup.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeo, orangeGlowMat);
    rightExhaust.position.set(0.25, -0.68, 0);
    jetpackGroup.add(rightExhaust);

    // --- 5. HOLOGRAPHIC CODE TERMINAL ---
    const holoCanvas = document.createElement("canvas");
    holoCanvas.width = 512;
    holoCanvas.height = 256;
    const holoCtx = holoCanvas.getContext("2d");
    if (holoCtx) {
      holoCtx.fillStyle = "rgba(10, 16, 28, 0.94)";
      holoCtx.roundRect(0, 0, 512, 256, 18);
      holoCtx.fill();
      holoCtx.strokeStyle = "#ff6200";
      holoCtx.lineWidth = 4;
      holoCtx.roundRect(0, 0, 512, 256, 18);
      holoCtx.stroke();

      holoCtx.fillStyle = "#ff5500";
      holoCtx.beginPath();
      holoCtx.arc(32, 24, 7, 0, Math.PI * 2);
      holoCtx.fill();
      holoCtx.fillStyle = "#f59e0b";
      holoCtx.beginPath();
      holoCtx.arc(56, 24, 7, 0, Math.PI * 2);
      holoCtx.fill();
      holoCtx.fillStyle = "#10b981";
      holoCtx.beginPath();
      holoCtx.arc(80, 24, 7, 0, Math.PI * 2);
      holoCtx.fill();

      holoCtx.font = "bold 20px monospace";
      holoCtx.fillStyle = "#ff9955";
      holoCtx.fillText("azmi@smkn1-pasuruan:~/app$ npm run dev", 26, 68);
      holoCtx.fillStyle = "#00f0ff";
      holoCtx.fillText("✓ Ready in 118ms (Next.js 16 + Turbopack)", 26, 108);
      holoCtx.fillStyle = "#ffffff";
      holoCtx.fillText("const dev = new Dev('Muhammad Ulil Azmi');", 26, 148);
      holoCtx.fillStyle = "#fb923c";
      holoCtx.fillText("dev.school('SMKN 1 Pasuruan • Rekayasa Perangkat Lunak');", 26, 188);
      holoCtx.fillStyle = "#34d399";
      holoCtx.fillText("status: '0 ERRORS • READY TO COLLABORATE ⚡'", 26, 226);
    }
    const holoTex = new THREE.CanvasTexture(holoCanvas);
    const holoMat = new THREE.MeshBasicMaterial({
      map: holoTex,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const holoGeo = new THREE.PlaneGeometry(1.6, 0.8);
    const holoScreenMesh = new THREE.Mesh(holoGeo, holoMat);
    holoScreenMesh.position.set(0, 0.5, 1.15);
    torsoGroup.add(holoScreenMesh);

    // --- 5B. VIRTUAL KEYBOARD ---
    const kbCanvas = document.createElement("canvas");
    kbCanvas.width = 512;
    kbCanvas.height = 220;
    const kbCtx = kbCanvas.getContext("2d");
    if (kbCtx) {
      kbCtx.fillStyle = "rgba(10, 16, 28, 0.92)";
      kbCtx.roundRect(0, 0, 512, 220, 16);
      kbCtx.fill();
      kbCtx.strokeStyle = "#ff6200";
      kbCtx.lineWidth = 3.5;
      kbCtx.roundRect(0, 0, 512, 220, 16);
      kbCtx.stroke();

      const rows = 4;
      const cols = 12;
      const keyW = 32;
      const keyH = 26;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const kx = 22 + c * 38 + r * 7;
          const ky = 18 + r * 36;
          if (kx + keyW < 496) {
            const isAccentKey = (r === 1 && c === 3) || (r === 2 && c === 7) || (r === 0 && c === 11);
            kbCtx.fillStyle = isAccentKey ? "rgba(255, 98, 0, 0.65)" : "rgba(30, 41, 59, 0.7)";
            kbCtx.roundRect(kx, ky, keyW, keyH, 4);
            kbCtx.fill();
            kbCtx.strokeStyle = isAccentKey ? "#ff9a55" : "rgba(255, 140, 50, 0.4)";
            kbCtx.lineWidth = 1.2;
            kbCtx.roundRect(kx, ky, keyW, keyH, 4);
            kbCtx.stroke();
          }
        }
      }
      kbCtx.fillStyle = "rgba(255, 98, 0, 0.5)";
      kbCtx.roundRect(140, 165, 230, 24, 6);
      kbCtx.fill();
      kbCtx.strokeStyle = "#ff9a55";
      kbCtx.lineWidth = 2;
      kbCtx.strokeRect(140, 165, 230, 24);
    }
    const kbTex = new THREE.CanvasTexture(kbCanvas);
    const kbMat = new THREE.MeshBasicMaterial({
      map: kbTex,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const kbGeo = new THREE.PlaneGeometry(1.4, 0.6);
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, 0.05, 1.05);
    kbMesh.rotation.x = -Math.PI / 4.2;
    torsoGroup.add(kbMesh);

    // --- 6. FLOATING TECH NODES ---
    const orbitNodesGroup = new THREE.Group();
    robotRoot.add(orbitNodesGroup);

    const nodeSymbols = ["</>", "{ }", ">_", "git", "TS", "API"];
    const nodeMeshes: THREE.Group[] = [];

    nodeSymbols.forEach((sym, idx) => {
      const nodeG = new THREE.Group();
      const nodeCanvas = document.createElement("canvas");
      nodeCanvas.width = 128;
      nodeCanvas.height = 128;
      const nCtx = nodeCanvas.getContext("2d");
      if (nCtx) {
        nCtx.fillStyle = "rgba(15, 23, 42, 0.9)";
        nCtx.roundRect(0, 0, 128, 128, 20);
        nCtx.fill();
        nCtx.strokeStyle = "#ff6200";
        nCtx.lineWidth = 6;
        nCtx.roundRect(0, 0, 128, 128, 20);
        nCtx.stroke();
        nCtx.fillStyle = "#ffedd5";
        nCtx.font = "bold 42px monospace";
        nCtx.textAlign = "center";
        nCtx.textBaseline = "middle";
        nCtx.fillText(sym, 64, 64);
      }
      const nTex = new THREE.CanvasTexture(nodeCanvas);
      const nMat = new THREE.MeshBasicMaterial({ map: nTex, transparent: true, opacity: 0.95 });
      const nPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), nMat);
      nodeG.add(nPlane);

      const angle = (idx / nodeSymbols.length) * Math.PI * 2;
      const radius = 1.25;
      nodeG.position.set(Math.cos(angle) * radius, 0.35 + (idx % 2) * 0.22, Math.sin(angle) * radius);
      orbitNodesGroup.add(nodeG);
      nodeMeshes.push(nodeG);
    });

    // Orbit Ring
    const orbitRingGeo = new THREE.TorusGeometry(1.28, 0.012, 16, 64);
    orbitRingGeo.rotateX(Math.PI / 2.3);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.3,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.position.set(0, 0.4, 0);
    scene.add(orbitRing);

    // Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(1.6, 0.8);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.24,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.position.set(0, -1.05, 0);
    scene.add(groundShadow);

    // --- 6B. JETPACK ROCKET EXHAUST PARTICLES ---
    const pCount = 54;
    const pPositions = new Float32Array(pCount * 3);
    const pLifetimes = new Float32Array(pCount);
    const pVelocities: THREE.Vector3[] = [];

    for (let p = 0; p < pCount; p++) {
      pPositions[p * 3] = 0;
      pPositions[p * 3 + 1] = -100;
      pPositions[p * 3 + 2] = 0;
      pLifetimes[p] = Math.random();
      pVelocities.push(new THREE.Vector3());
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const g = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255, 240, 160, 1)");
      g.addColorStop(0.3, "rgba(255, 120, 0, 0.85)");
      g.addColorStop(0.65, "rgba(255, 60, 0, 0.4)");
      g.addColorStop(1, "rgba(255, 30, 0, 0)");
      pCtx.fillStyle = g;
      pCtx.beginPath();
      pCtx.arc(32, 32, 32, 0, Math.PI * 2);
      pCtx.fill();
    }
    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.28,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    scene.add(pPoints);

    // --- 7. FLIGHT DYNAMICS & EXPRESSION ENGINE ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let dragVelocity = 0;

    let currentAction: RobotActionType | null = "wave";
    let actionTime = 0;
    const actionDuration = 3.2;

    // Visor LED Expression state
    let activeExpression = "wave";
    let blinkTimer = 0;
    let nextBlinkTime = 3.2;
    let isBlinking = false;
    let currentBlinkScale = 1.0;
    let activeEyeColor = "#00f0ff";

    // Aerodynamic continuous glide parameters
    let flightPhase = 0;
    let roamBlend = 0.0;
    let targetRoamBlend = 0.0;
    let stationaryCooldown = 2.0;

    const robotWorldPos = new THREE.Vector3(0, -0.15, 0);
    const stationPos = new THREE.Vector3(0, -0.15, 0);

    let prevPosX = 0;
    let prevPosY = -0.15;
    let prevPosZ = 0;

    let smoothedVelX = 0;
    let smoothedVelY = 0;
    let smoothedVelZ = 0;

    let currentBankZ = 0;
    let currentPitchX = 0;
    let currentYawY = 0;

    const triggerAction = (action: RobotActionType) => {
      currentAction = action;
      activeExpression = action;
      actionTime = 0;
      targetRoamBlend = 0.0;
      stationaryCooldown = 3.2;
      coreLight.intensity = 6.0;
      orangeGlowMat.emissiveIntensity = 6.0;

      // Draw expression onto visor canvas immediately
      drawRobotFace(faceCtx, activeExpression, activeEyeColor, 1.0);
      faceTex.needsUpdate = true;
    };
    triggerActionRef.current = triggerAction;

    // Skin updater function
    const applySkin = (skinKey: RobotSkinId) => {
      applyRobotSkinToMaterials(skinKey, {
        orangeArmorMat,
        orangeGlowMat,
        eyeGlowMat,
        whiteArmorMat,
        darkMetalMat,
        orbitRingMat,
        coreLight,
        keyLight: orangeKeyLight,
      });

      const skinCfg = ROBOT_SKINS[skinKey] || ROBOT_SKINS.orange;
      activeEyeColor = `#${skinCfg.eyeHex.toString(16).padStart(6, "0")}`;
      drawRobotFace(faceCtx, activeExpression, activeEyeColor, currentBlinkScale);
      faceTex.needsUpdate = true;
    };
    triggerSkinRef.current = applySkin;

    const initSkin = (localStorage.getItem("robot_active_skin") as RobotSkinId) || "orange";
    if (initSkin && ROBOT_SKINS[initSkin]) {
      applySkin(initSkin);
    }

    // Initial face draw
    drawRobotFace(faceCtx, activeExpression, activeEyeColor, 1.0);
    faceTex.needsUpdate = true;

    // Raycaster for clicking directly on 3D robot
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    let cachedRect = container.getBoundingClientRect();
    const updateRect = () => {
      if (container) {
        cachedRect = container.getBoundingClientRect();
      }
    };

    let moveTicking = false;
    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      if (moveTicking) return;
      moveTicking = true;
      requestAnimationFrame(() => {
        moveTicking = false;
        const rect = cachedRect;
        if (!rect.width || !rect.height) return;
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        mouseCoord.x = x;
        mouseCoord.y = y;

        if (isDragging) {
          const deltaX = e.clientX - previousMouseX;
          robotRoot.rotation.y += deltaX * 0.012;
          dragVelocity = deltaX * 0.012;
          previousMouseX = e.clientX;
        } else {
          mouseX = x;
          mouseY = y;
          targetRotY = mouseX * 0.55;
          targetRotX = -mouseY * 0.35;
        }
      });
    };

    let pointerDownTime = 0;
    let pointerStartX = 0;
    let pointerStartY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      updateRect();
      isDragging = true;
      targetRoamBlend = 0.0;
      stationaryCooldown = 3.5;
      previousMouseX = e.clientX;
      pointerDownTime = performance.now();
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      stationaryCooldown = 2.0;
      const moveDistance = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
      const isQuickClick = performance.now() - pointerDownTime < 350 && moveDistance < 12;

      if (isQuickClick) {
        const rect = cachedRect;
        if (rect.width && rect.height) {
          mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

          raycaster.setFromCamera(mouseCoord, camera);
          const hits = raycaster.intersectObjects(robotRoot.children, true);

          if (hits.length > 0) {
            // Interactive poke response - does NOT switch or cancel selected action
            activeExpression = "happy";
            drawRobotFace(faceCtx, activeExpression, activeEyeColor, 1.0);
            faceTex.needsUpdate = true;
            robotAudio.playRobotBeep(940, 0.1);
            coreLight.intensity = 6.5;
            orangeGlowMat.emissiveIntensity = 6.5;

            const pokeList = (t("speechPoke") as string[]) || [
              "Bip-bop! 👋 Halo dari SMKN 1 Pasuruan!",
              "Sensor sentuh aktif! Ada yang bisa dibantu?",
            ];
            const randomPoke = pokeList[Math.floor(Math.random() * pokeList.length)];
            showSpeech(randomPoke, 3200);
          }
        }
      }
    };

    const handlePointerLeave = () => {
      isDragging = false;
      mouseX = 0;
      mouseY = 0;
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerLeave);

    // Mobile Device Orientation Gyroscope Tilt
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = THREE.MathUtils.clamp(e.gamma / 35, -1, 1);
        const tiltY = THREE.MathUtils.clamp((e.beta - 45) / 35, -1, 1);
        targetRotY = tiltX * 0.45;
        targetRotX = -tiltY * 0.25;
      }
    };
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      updateRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 768 ? 1.0 : 1.25));
      robotRoot.scale.setScalar(width < 640 ? 0.6 : 0.72);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation & Roaming Render Loop
    let animId = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Check stationary cooldown before roaming
      if (stationaryCooldown > 0) {
        stationaryCooldown -= delta;
        targetRoamBlend = 0.0;
      } else if (!isDragging && !currentAction) {
        targetRoamBlend = 1.0;
      } else {
        targetRoamBlend = 0.0;
      }

      roamBlend = THREE.MathUtils.damp(roamBlend, targetRoamBlend, 2.0, delta);

      // Natural Blinking & LED Visor Face Animation Routine
      blinkTimer += delta;
      let prevBlinkScale = currentBlinkScale;
      if (blinkTimer >= nextBlinkTime) {
        isBlinking = true;
        if (blinkTimer >= nextBlinkTime + 0.14) {
          isBlinking = false;
          blinkTimer = 0;
          nextBlinkTime = 3.2 + Math.random() * 3.5;
        }
      }

      const targetBlink = isBlinking ? 0.08 : 1.0;
      currentBlinkScale = THREE.MathUtils.damp(currentBlinkScale, targetBlink, 12.0, delta);

      // Redraw face if blink scale changed significantly
      if (Math.abs(prevBlinkScale - currentBlinkScale) > 0.05) {
        drawRobotFace(
          faceCtx,
          currentAction || "idle",
          activeEyeColor,
          currentBlinkScale
        );
        faceTex.needsUpdate = true;
      }

      // Smooth Aerospace Figure-8 Flight Glide
      flightPhase += delta * 0.32;
      const corridorX = width < 768 ? 1.05 : 1.75;
      const corridorY = 0.42;
      const corridorZ = 0.75;

      const cruiseX = Math.sin(flightPhase * 0.8) * corridorX;
      const cruiseY =
        stationPos.y +
        Math.sin(flightPhase * 1.6) * (corridorY * 0.5) +
        Math.cos(flightPhase * 0.5) * 0.12;
      const cruiseZ = Math.cos(flightPhase * 0.8) * (corridorZ * 0.6);

      const hoverY = Math.sin(elapsed * 2.0) * 0.07;

      const targetX = THREE.MathUtils.lerp(stationPos.x, cruiseX, roamBlend);
      const targetY = THREE.MathUtils.lerp(stationPos.y + hoverY, cruiseY, roamBlend);
      const targetZ = THREE.MathUtils.lerp(stationPos.z, cruiseZ, roamBlend);

      robotWorldPos.x = THREE.MathUtils.damp(robotWorldPos.x, targetX, 2.8, delta);
      robotWorldPos.y = THREE.MathUtils.damp(robotWorldPos.y, targetY, 3.0, delta);
      robotWorldPos.z = THREE.MathUtils.damp(robotWorldPos.z, targetZ, 2.8, delta);

      const dt = Math.max(delta, 0.001);
      const instVelX = (robotWorldPos.x - prevPosX) / dt;
      const instVelY = (robotWorldPos.y - prevPosY) / dt;
      const instVelZ = (robotWorldPos.z - prevPosZ) / dt;

      prevPosX = robotWorldPos.x;
      prevPosY = robotWorldPos.y;
      prevPosZ = robotWorldPos.z;

      smoothedVelX = THREE.MathUtils.damp(smoothedVelX, instVelX, 4.0, delta);
      smoothedVelY = THREE.MathUtils.damp(smoothedVelY, instVelY, 4.0, delta);
      smoothedVelZ = THREE.MathUtils.damp(smoothedVelZ, instVelZ, 4.0, delta);

      const targetBankZ = THREE.MathUtils.clamp(-smoothedVelX * 0.22 * roamBlend, -0.22, 0.22);
      const targetPitchX = THREE.MathUtils.clamp(smoothedVelY * 0.15 * roamBlend, -0.16, 0.16);
      const targetYawY = THREE.MathUtils.clamp(smoothedVelX * 0.28 * roamBlend, -0.35, 0.35);

      currentBankZ = THREE.MathUtils.damp(currentBankZ, targetBankZ, 3.8, delta);
      currentPitchX = THREE.MathUtils.damp(currentPitchX, targetPitchX, 3.8, delta);
      currentYawY = THREE.MathUtils.damp(currentYawY, targetYawY, 3.8, delta);

      robotRoot.rotation.z = currentBankZ;
      if (!isDragging) {
        robotRoot.rotation.x = currentPitchX;
        if (currentAction !== "spin") {
          robotRoot.rotation.y = THREE.MathUtils.damp(robotRoot.rotation.y, currentYawY, 3.8, delta);
        }
      }

      orbitRing.position.copy(robotWorldPos);
      orbitRing.position.y += 0.55;
      orbitNodesGroup.position.copy(robotWorldPos);

      if (!currentAction) {
        leftArmGroup.rotation.z = THREE.MathUtils.damp(
          leftArmGroup.rotation.z,
          -0.25 + currentBankZ * 0.4,
          3.2,
          delta
        );
        rightArmGroup.rotation.z = THREE.MathUtils.damp(
          rightArmGroup.rotation.z,
          0.25 + currentBankZ * 0.4,
          3.2,
          delta
        );
        leftArmGroup.rotation.x = THREE.MathUtils.damp(
          leftArmGroup.rotation.x,
          0.15 * roamBlend,
          3.2,
          delta
        );
        rightArmGroup.rotation.x = THREE.MathUtils.damp(
          rightArmGroup.rotation.x,
          0.15 * roamBlend,
          3.2,
          delta
        );
      }

      if (currentAction && currentAction !== "spin") {
        headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, targetRotY * 1.05, 4.5, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, targetRotX * 0.85, 4.5, delta);
        torsoGroup.rotation.y = THREE.MathUtils.damp(torsoGroup.rotation.y, targetRotY * 0.25, 3.0, delta);
      } else if (!currentAction) {
        headGroup.rotation.y = THREE.MathUtils.damp(
          headGroup.rotation.y,
          targetRotY * 0.8 + currentYawY * 0.5,
          4.2,
          delta
        );
        headGroup.rotation.x = THREE.MathUtils.damp(
          headGroup.rotation.x,
          targetRotX * 0.6 + currentPitchX * 0.4,
          4.2,
          delta
        );
      }

      const flightSpeed = Math.hypot(smoothedVelX, smoothedVelY, smoothedVelZ);
      const thrustFlame = 1.0 + Math.sin(elapsed * 16) * 0.15 + flightSpeed * 0.5 * roamBlend;
      leftExhaust.scale.set(1.1, thrustFlame, 1.1);
      rightExhaust.scale.set(1.1, thrustFlame, 1.1);

      robotRoot.position.copy(robotWorldPos);

      // Ground Shadow
      groundShadow.position.x = robotWorldPos.x;
      groundShadow.position.z = robotWorldPos.z;
      const groundDist = robotWorldPos.y - -1.05;
      groundShadow.scale.setScalar(Math.max(0.2, 1.25 - groundDist * 0.35));
      shadowMat.opacity = Math.max(0.02, 0.22 - groundDist * 0.07);

      // Jetpack exhaust particles
      const posAttr = pGeo.attributes.position as THREE.BufferAttribute;
      const leftJetWorld = new THREE.Vector3();
      const rightJetWorld = new THREE.Vector3();
      leftExhaust.getWorldPosition(leftJetWorld);
      rightExhaust.getWorldPosition(rightJetWorld);

      for (let p = 0; p < pCount; p++) {
        pLifetimes[p] += roamBlend > 0.5 ? 0.04 : 0.025;
        if (pLifetimes[p] >= 1.0) {
          pLifetimes[p] = 0;
          const source = p % 2 === 0 ? leftJetWorld : rightJetWorld;
          posAttr.setXYZ(
            p,
            source.x + (Math.random() - 0.5) * 0.06,
            source.y + (Math.random() - 0.5) * 0.06,
            source.z + (Math.random() - 0.5) * 0.06
          );
          if (roamBlend > 0.3) {
            pVelocities[p].set(
              -smoothedVelX * 1.2 + (Math.random() - 0.5) * 0.02,
              -smoothedVelY * 1.2 + (Math.random() - 0.5) * 0.02,
              -smoothedVelZ * 1.2 + (Math.random() - 0.5) * 0.02
            );
          } else {
            pVelocities[p].set(
              (Math.random() - 0.5) * 0.02,
              -0.035 - Math.random() * 0.03,
              -0.02 - Math.random() * 0.025
            );
          }
        } else {
          const px = posAttr.getX(p) + pVelocities[p].x;
          const py = posAttr.getY(p) + pVelocities[p].y;
          const pz = posAttr.getZ(p) + pVelocities[p].z;
          posAttr.setXYZ(p, px, py, pz);
        }
      }
      posAttr.needsUpdate = true;

      // Rotate Orbit Ring and Nodes
      if (orbitRing.visible) {
        orbitRing.rotation.z = elapsed * 0.3;
        orbitNodesGroup.rotation.y = elapsed * 0.45;
        nodeMeshes.forEach((nm) => {
          nm.rotation.y = -orbitNodesGroup.rotation.y;
        });
      }

      // Core pulsating glow
      const corePulse = 3.2 + Math.sin(elapsed * 4.5) * 1.2;
      coreLight.intensity = THREE.MathUtils.damp(coreLight.intensity, corePulse, 3.5, delta);
      orangeGlowMat.emissiveIntensity = THREE.MathUtils.damp(
        orangeGlowMat.emissiveIntensity,
        corePulse,
        3.5,
        delta
      );

      // Drag inertia
      if (!isDragging && currentAction !== "spin") {
        dragVelocity *= 0.94;
        robotRoot.rotation.y += dragVelocity;
      }

      // --- ACTION ANIMATIONS DISPATCHER ---
      if (currentAction) {
        actionTime += delta;

        if (currentAction === "code") {
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0.95, 0.14);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0.88, 0.14);
          holoScreenMesh.position.z = THREE.MathUtils.lerp(holoScreenMesh.position.z, 1.15, 0.1);
          kbMesh.position.z = THREE.MathUtils.lerp(kbMesh.position.z, 1.05, 0.1);

          const leftTap = Math.sin(actionTime * 14);
          const rightTap = Math.sin(actionTime * 14 + 1.8);

          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.68, 0.16);
          leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0.28, 0.16);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.16, 0.16);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.68, 0.16);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.28, 0.16);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.16, 0.16);

          leftForearmGroup.rotation.x = THREE.MathUtils.lerp(
            leftForearmGroup.rotation.x,
            -0.74 + leftTap * 0.12,
            0.22
          );
          leftForearmGroup.rotation.y = THREE.MathUtils.lerp(leftForearmGroup.rotation.y, -0.12, 0.16);
          leftForearmGroup.rotation.z = Math.cos(actionTime * 10) * 0.05;

          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(
            rightForearmGroup.rotation.x,
            -0.74 + rightTap * 0.12,
            0.22
          );
          rightForearmGroup.rotation.y = THREE.MathUtils.lerp(rightForearmGroup.rotation.y, 0.12, 0.16);
          rightForearmGroup.rotation.z = -Math.cos(actionTime * 10 + 1.8) * 0.05;

          leftHand.position.y = -0.6 + leftTap * 0.03;
          rightHand.position.y = -0.6 + rightTap * 0.03;

          headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0.26, 0.15);
          headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, Math.sin(actionTime * 3.5) * 0.08, 0.15);
        } else if (currentAction === "debug") {
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.85, 0.15);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.42, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.18, 0.15);
          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.92, 0.15);
          rightForearmGroup.rotation.z = THREE.MathUtils.lerp(rightForearmGroup.rotation.z, 0.65, 0.15);

          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.32, 0.12);
          leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0.18, 0.12);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.15, 0.12);
          leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, -0.42, 0.12);

          headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0.12, 0.1);
          headGroup.rotation.x = Math.sin(actionTime * 4.0) * 0.08;
        } else if (currentAction === "spin") {
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const spinProgress = actionTime / 1.6;
          if (spinProgress <= 1.0) {
            robotRoot.rotation.y = spinProgress * Math.PI * 2;
            robotRoot.position.y = hoverY + Math.sin(spinProgress * Math.PI) * 0.28;
            leftExhaust.scale.set(1.6, 2.0, 1.6);
            rightExhaust.scale.set(1.6, 2.0, 1.6);
            leftArmGroup.rotation.z = -1.1;
            rightArmGroup.rotation.z = 1.1;
            leftArmGroup.rotation.x = 0;
            rightArmGroup.rotation.x = 0;
            leftForearmGroup.rotation.x = 0;
            rightForearmGroup.rotation.x = 0;
          } else {
            robotRoot.rotation.y = THREE.MathUtils.damp(robotRoot.rotation.y, 0, 4.0, delta);
            leftArmGroup.rotation.z = THREE.MathUtils.damp(leftArmGroup.rotation.z, -0.25, 3.0, delta);
            rightArmGroup.rotation.z = THREE.MathUtils.damp(rightArmGroup.rotation.z, 0.25, 3.0, delta);
          }
        } else if (currentAction === "deploy") {
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const launchProgress = actionTime / 2.2;
          if (launchProgress <= 1.0) {
            const liftHeight = Math.sin(launchProgress * Math.PI) * 0.55;
            robotRoot.position.y = hoverY + liftHeight;
            leftExhaust.scale.set(2.0, 2.8, 2.0);
            rightExhaust.scale.set(2.0, 2.8, 2.0);

            leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0.68, 0.15);
            leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.35, 0.15);
            rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.68, 0.15);
            rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.35, 0.15);
            leftForearmGroup.rotation.x = 0;
            rightForearmGroup.rotation.x = 0;
            headGroup.rotation.x = -0.35;
          } else {
            robotRoot.position.y = THREE.MathUtils.damp(robotRoot.position.y, hoverY, 3.0, delta);
            leftExhaust.scale.set(1.1, 1.2, 1.1);
            rightExhaust.scale.set(1.1, 1.2, 1.1);
          }
        } else if (currentAction === "thumbsUp") {
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.85, 0.15);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.15, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.12, 0.15);
          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.68, 0.15);
          rightHand.scale.set(1.4, 1.4, 1.4);

          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.18, 0.1);
          coreLight.intensity = 5.5;
        } else if (currentAction === "dance") {
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const beat = Math.sin(actionTime * 6.5);
          robotRoot.position.y = hoverY + Math.abs(beat) * 0.15;
          torsoGroup.rotation.z = beat * 0.12;

          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.45 + beat * 0.35, 0.15);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.35 - beat * 0.2, 0.15);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.45 - beat * 0.35, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.35 + beat * 0.2, 0.15);

          headGroup.rotation.y = -beat * 0.25;
        } else if (currentAction === "wave") {
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 1.95, 0.15);
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.25, 0.15);
          rightForearmGroup.rotation.z = Math.sin(actionTime * 8.0) * 0.45;
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.2, 0.1);
        }
      } else {
        // Idle Pose
        holoMat.opacity = THREE.MathUtils.damp(holoMat.opacity, 0, 4.0, delta);
        kbMat.opacity = THREE.MathUtils.damp(kbMat.opacity, 0, 4.0, delta);
        rightArmGroup.rotation.z = THREE.MathUtils.damp(
          rightArmGroup.rotation.z,
          Math.sin(elapsed * 1.5) * 0.05,
          3.0,
          delta
        );
        rightArmGroup.rotation.x = THREE.MathUtils.damp(rightArmGroup.rotation.x, 0, 3.0, delta);
        rightArmGroup.rotation.y = THREE.MathUtils.damp(rightArmGroup.rotation.y, 0, 3.0, delta);
        rightForearmGroup.rotation.z = THREE.MathUtils.damp(rightForearmGroup.rotation.z, 0, 3.0, delta);
        rightForearmGroup.rotation.x = THREE.MathUtils.damp(rightForearmGroup.rotation.x, 0, 3.0, delta);
        rightForearmGroup.rotation.y = THREE.MathUtils.damp(rightForearmGroup.rotation.y, 0, 3.0, delta);

        leftArmGroup.rotation.z = THREE.MathUtils.damp(
          leftArmGroup.rotation.z,
          -Math.sin(elapsed * 1.5) * 0.05,
          3.0,
          delta
        );
        leftArmGroup.rotation.x = THREE.MathUtils.damp(leftArmGroup.rotation.x, 0, 3.0, delta);
        leftArmGroup.rotation.y = THREE.MathUtils.damp(leftArmGroup.rotation.y, 0, 3.0, delta);
        leftForearmGroup.rotation.x = THREE.MathUtils.damp(leftForearmGroup.rotation.x, 0, 3.0, delta);
        leftForearmGroup.rotation.y = THREE.MathUtils.damp(leftForearmGroup.rotation.y, 0, 3.0, delta);
        leftForearmGroup.rotation.z = THREE.MathUtils.damp(leftForearmGroup.rotation.z, 0, 3.0, delta);

        leftHand.position.y = THREE.MathUtils.damp(leftHand.position.y, -0.6, 3.0, delta);
        rightHand.position.y = THREE.MathUtils.damp(rightHand.position.y, -0.6, 3.0, delta);

        rightHand.scale.set(1, 1, 1);
        torsoGroup.rotation.z = THREE.MathUtils.damp(torsoGroup.rotation.z, 0, 3.0, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextVisible = entry.isIntersecting;
        if (nextVisible && !isVisible) {
          isVisible = true;
          clock.getDelta();
          animate();
        } else if (!nextVisible && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animId);
      } else {
        isVisible = true;
        clock.getDelta();
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      visibilityObserver.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }

      renderer.dispose();
      faceTex.dispose();
      faceMat.dispose();
      faceGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      pTex.dispose();
      kbTex.dispose();
      kbMat.dispose();
      kbGeo.dispose();
      holoTex.dispose();
      holoMat.dispose();
      holoGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleActionClick, showSpeech]);

  const activeSkinConfig = ROBOT_SKINS[activeSkin] || ROBOT_SKINS.orange;

  return (
    <>
      <div
        ref={containerRef}
        className={`interactive-robot-container relative flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      >
        {/* 1. TOP SPEECH BUBBLE */}
        {speechText && (
          <div className="robot-speech-bubble absolute top-4 sm:top-6 z-30 pointer-events-none max-w-[92vw] text-center animate-in fade-in zoom-in-95 duration-300">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-slate-950/95 px-3.5 sm:px-5 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold shadow-xl backdrop-blur-md"
              style={{
                borderColor: `${activeSkinConfig.dotColor}77`,
                color: activeSkinConfig.dotColor,
                boxShadow: `0 0 25px ${activeSkinConfig.dotColor}35`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full animate-ping shrink-0"
                style={{ backgroundColor: activeSkinConfig.dotColor }}
              />
              <span className="text-slate-300 font-medium line-clamp-1">{speechText}</span>
            </div>
          </div>
        )}

        {/* 2A. DESKTOP UNIFIED BOTTOM CYBER HUD DOCK (md:flex only) */}
        <div className="hidden md:flex robot-floating-actions-container absolute bottom-6 md:bottom-8 lg:bottom-6 inset-x-0 z-30 flex-col items-center pointer-events-none px-3">
          <div className="w-full max-w-[480px] md:max-w-[620px] rounded-full bg-slate-950/85 dark:bg-slate-950/95 border border-orange-500/25 p-2 backdrop-blur-md shadow-2xl shadow-black/60 pointer-events-auto flex flex-col items-center gap-2">
            {/* TIER 1: UTILITY STRIP */}
            <div className="flex items-center justify-between w-full px-3 py-0.5 border-b border-slate-800/80 text-[10.5px]">
              {/* Skin Palette */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold tracking-wider text-slate-400 text-[9.5px]">
                  SKIN:
                </span>
                <div className="flex items-center gap-1">
                  {ROBOT_SKIN_LIST.map((skin) => (
                    <button
                      key={skin.id}
                      type="button"
                      onClick={() => handleSkinChange(skin.id)}
                      className={`h-4 w-4 rounded-full border transition-all cursor-pointer ${
                        activeSkin === skin.id
                          ? "scale-125 border-white shadow-[0_0_10px_rgba(255,255,255,0.9)] ring-1 ring-white/60"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
                      }`}
                      style={{ backgroundColor: skin.dotColor }}
                      title={`${skin.name} • ${skin.tagline}`}
                      aria-label={`Ganti tema ke ${skin.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* School Tagline Micro Badge */}
              <span className="hidden md:inline font-mono text-[9px] text-slate-400 tracking-wider">
                SMKN 1 PASURUAN • RPL
              </span>

              {/* Right Controls: SFX + Game Launcher */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="flex items-center gap-1 font-mono text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
                  title={isMuted ? "Nyalakan Cyber SFX" : "Matikan Cyber SFX"}
                  aria-label={isMuted ? "Nyalakan Cyber SFX" : "Matikan Cyber SFX"}
                >
                  {isMuted ? (
                    <VolumeX size={12} className="text-slate-500" />
                  ) : (
                    <Volume2 size={12} style={{ color: activeSkinConfig.dotColor }} />
                  )}
                  <span className="font-bold text-[9.5px]">{isMuted ? "MUTE" : "SFX"}</span>
                </button>

                <div className="h-3 w-px bg-slate-800" />

                <button
                  type="button"
                  onClick={handleOpenArcade}
                  className="flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold transition-all cursor-pointer text-[10.5px] bg-gradient-to-r from-orange-500/25 to-amber-500/25 border border-orange-500/40 text-orange-300 hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,98,0,0.5)]"
                  title="Mainkan Game Roket Luar Angkasa 10 Level"
                >
                  <Rocket size={12} />
                  <span>{t("actionArcade")}</span>
                </button>
              </div>
            </div>

            {/* TIER 2: ACTION PILLS STRIP */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
              {ACTION_LIST.map((action) => {
                const isActive = activeAction === action.id;
                const ActionIcon = action.icon;
                const actionLabel = t(action.translationKey) || action.label;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(action.id);
                    }}
                    className={`group relative flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "!bg-gradient-to-r !from-orange-500 !to-amber-500 !text-white !border-orange-300 shadow-[0_0_20px_rgba(255,98,0,0.6)] ring-1 ring-orange-300"
                        : "bg-slate-900/90 text-slate-200 border border-slate-700/60 hover:border-orange-500/60 hover:text-orange-400 hover:bg-slate-800/90"
                    }`}
                    title={actionLabel}
                  >
                    <ActionIcon
                      size={11}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-125"
                    />
                    <span className="tracking-tight whitespace-nowrap">{actionLabel}</span>
                    {isActive && (
                      <span className="h-1 w-1 rounded-full bg-white animate-ping shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2B. MOBILE CLEAN FLOATING TRIGGER (md:hidden) */}
        <div className="md:hidden absolute bottom-[21%] sm:bottom-[23%] inset-x-0 z-30 flex justify-center pointer-events-none px-3">
          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-orange-500/50 bg-slate-950/90 px-4 py-2 text-xs font-bold text-orange-400 shadow-xl shadow-black/80 backdrop-blur-md transition-all active:scale-95 hover:border-orange-400 hover:text-white cursor-pointer"
          >
            <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Aksi Robot & Game</span>
            <span className="rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-mono text-orange-300">
              7
            </span>
          </button>
        </div>

        {/* 2C. MOBILE CYBER HUD BOTTOM SHEET DRAWER (md:hidden) */}
        {mounted && isMobileSheetOpen && createPortal(
          <div className="md:hidden fixed inset-0 z-[9999] flex flex-col justify-end pointer-events-auto">
            {/* Dark Backdrop */}
            <div
              onClick={() => setIsMobileSheetOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
              aria-hidden="true"
            />

            {/* Slide-Up Bottom Sheet */}
            <div className="robot-mobile-sheet relative z-10 w-full max-h-[82vh] overflow-y-auto rounded-t-3xl border-t border-orange-500/50 bg-[#090d16] p-5 shadow-2xl text-slate-100 animate-in slide-in-from-bottom duration-300">
              {/* Top Handle Pill */}
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-700" />

              {/* Header Row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-xl border border-orange-500/40 bg-orange-500/20 text-orange-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">Robot RPL Hub</h3>
                    <span className="text-[10px] text-slate-400 font-mono">SMKN 1 PASURUAN</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Utility Strip: Skins + SFX + Game */}
              <div className="py-3.5 space-y-3">
                {/* Skins */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    PILIH TEMA / SKIN ROBOT
                  </span>
                  <div className="mt-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {ROBOT_SKIN_LIST.map((skin) => (
                      <button
                        key={skin.id}
                        type="button"
                        onClick={() => handleSkinChange(skin.id)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                          activeSkin === skin.id
                            ? "border-orange-500 bg-orange-500/20 text-white shadow-md shadow-orange-500/30"
                            : "border-slate-800 bg-slate-900 text-slate-300"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: skin.dotColor }}
                        />
                        <span>{skin.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Buttons: Sound + Rocket Arcade */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 text-xs font-bold text-slate-300 hover:border-orange-500 cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={14} className="text-slate-500" /> : <Volume2 size={14} className="text-orange-400" />}
                    <span>{isMuted ? "SFX: Mute" : "SFX: Aktif"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSheetOpen(false);
                      handleOpenArcade();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-orange-500/40 bg-gradient-to-r from-orange-500/30 to-amber-500/30 py-2.5 text-xs font-bold text-orange-300 shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    <Rocket size={14} />
                    <span>{t("actionArcade")}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons Grid (7 Actions) */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  PILIH AKSI ANIMASI
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {ACTION_LIST.map((action) => {
                    const isActive = activeAction === action.id;
                    const ActionIcon = action.icon;
                    const actionLabel = t(action.translationKey) || action.label;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => {
                          handleActionClick(action.id);
                          setIsMobileSheetOpen(false);
                        }}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "border-orange-400 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40"
                            : "border-slate-800 bg-slate-900 text-slate-200 hover:border-orange-500/50 hover:bg-slate-850"
                        }`}
                      >
                        <ActionIcon size={14} className="shrink-0" />
                        <span className="truncate">{actionLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* 3. CYBER BUG ARCADE MINI-GAME MODAL */}
      <CyberBugArcadeGame
        isOpen={isArcadeOpen}
        onClose={handleCloseArcade}
        activeSkin={activeSkin}
        onGameWin={handleGameWin}
      />
    </>
  );
}
