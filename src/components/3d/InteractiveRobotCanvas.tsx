"use client";

import { useEffect, useRef, useState, useCallback, ComponentType } from "react";
import * as THREE from "three";
import {
  Code2,
  ShieldCheck,
  Zap,
  Rocket,
  ThumbsUp,
  Trophy,
  Hand,
} from "lucide-react";

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
  icon: ComponentType<{ className?: string; size?: number }>;
}

const ACTION_LIST: ActionItem[] = [
  { id: "code", label: "Holo Code", icon: Code2 },
  { id: "debug", label: "Fix Bug", icon: ShieldCheck },
  { id: "spin", label: "Turbo Spin", icon: Zap },
  { id: "deploy", label: "Deploy App", icon: Rocket },
  { id: "thumbsUp", label: "Clean Code", icon: ThumbsUp },
  { id: "dance", label: "Victory", icon: Trophy },
  { id: "wave", label: "Salam RPL", icon: Hand },
];

const RPL_SPEECHES: Record<RobotActionType, string[]> = {
  code: [
    "rpl-terminal: npm run dev --turbo",
    "Writing clean, modular TypeScript code!",
    "const dev = 'Azmi'; // Rekayasa Perangkat Lunak",
    "Building fullstack web app with Next.js 16",
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
    "TypeScript strict mode: Fully Verified!",
  ],
  dance: [
    "All Tests Passing on First Attempt!",
    "Feature Shipped on Schedule!",
    "Sprint Goal Achieved with 100% Velocity!",
  ],
  wave: [
    "Halo! Salam Rekayasa Perangkat Lunak",
    "Selamat datang di Azmi.Dev!",
    "Siap bantu kembangkan proyek digital Anda!",
  ],
};

export default function InteractiveRobotCanvas({ className = "" }: RobotCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speechText, setSpeechText] = useState<string | null>("Halo! Klik robot atau pilih aksi RPL di bawah");
  const [activeAction, setActiveAction] = useState<RobotActionType>("wave");

  // Keep actions triggerable without recreating the Three.js scene
  const triggerActionRef = useRef<((action: RobotActionType) => void) | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSpeech = useCallback((text: string) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeechText(text);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechText(null);
    }, 3500);
  }, []);

  const handleActionClick = useCallback((action: RobotActionType) => {
    setActiveAction(action);
    const msgs = RPL_SPEECHES[action];
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    showSpeech(randomMsg);
    if (triggerActionRef.current) {
      triggerActionRef.current(action);
    }
  }, [showSpeech]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    // Perspective camera set for full-bleed home section roaming
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
    robotRoot.scale.setScalar(width < 640 ? 0.60 : 0.72);
    robotRoot.position.set(0, -0.15, 0);
    scene.add(robotRoot);

    // --- TORSO GROUP ---
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    // Upper Torso / Chest Armor
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
      // Draw cyber circuit traces
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
      // Circuit nodes
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

    // Center Arc Reactor / Power Core (Software Logic Core)
    const coreRingGeo = new THREE.TorusGeometry(0.2, 0.045, 16, 32);
    const coreRingMesh = new THREE.Mesh(coreRingGeo, darkMetalMat);
    coreRingMesh.position.set(0, 0.54, 0.7);
    torsoGroup.add(coreRingMesh);

    const coreInnerGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24);
    coreInnerGeo.rotateX(Math.PI / 2);
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, orangeGlowMat);
    coreInnerMesh.position.set(0, 0.54, 0.7);
    torsoGroup.add(coreInnerMesh);

    // Ribbed Spine & Abdomen
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

    // Pelvis & Antigrav Thruster Orb
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

    // Curved Glossy Visor
    const visorGeo = new THREE.SphereGeometry(0.58, 24, 24, 0, Math.PI, 0, Math.PI * 0.55);
    visorGeo.scale(0.96, 0.82, 1.08);
    visorGeo.rotateY(Math.PI / 2);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.02, 0.08);
    headGroup.add(visorMesh);

    // Digital LED Eyes (Dual Cyan / Orange glowing lenses)
    const eyeGeo = new THREE.CapsuleGeometry(0.065, 0.16, 8, 16);
    eyeGeo.rotateZ(Math.PI / 2);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.22, 0.06, 0.62);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.22, 0.06, 0.62);
    headGroup.add(rightEye);

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
    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.92, 0.72, 0);
    torsoGroup.add(leftArmGroup);

    const pauldronGeo = new THREE.SphereGeometry(0.34, 16, 16);
    pauldronGeo.scale(1.1, 0.8, 1);
    const leftPauldron = new THREE.Mesh(pauldronGeo, orangeArmorMat);
    leftArmGroup.add(leftPauldron);

    // 1. LEFT SHOULDER: RPL BADGE (Rekayasa Perangkat Lunak)
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

    // 2. RIGHT SHOULDER: CODE BADGE "{ }"
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
      smkCtx.font = "bold 44px 'Courier New', monospace";
      smkCtx.textAlign = "center";
      smkCtx.textBaseline = "middle";
      smkCtx.fillText("{ DEV }", 80, 40);
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

    // --- JETPACK ON BACK (For Deploy / Rocket Thruster Mode) ---
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

    // --- 5. RPL HOLOGRAPHIC CODE TERMINAL (Projects in front on Code action) ---
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

      // Terminal top bar
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

      // Code text
      holoCtx.font = "bold 20px monospace";
      holoCtx.fillStyle = "#ff9955";
      holoCtx.fillText("rpl-ide@azmi:~/project$ npm run dev", 26, 68);
      holoCtx.fillStyle = "#00f0ff";
      holoCtx.fillText("✓ Ready in 118ms (Next.js 16 + Turbopack)", 26, 108);
      holoCtx.fillStyle = "#ffffff";
      holoCtx.fillText("const dev = new Developer('Ulil Azmi');", 26, 148);
      holoCtx.fillStyle = "#fb923c";
      holoCtx.fillText("dev.stack(['React', 'TypeScript', 'Node']);", 26, 188);
      holoCtx.fillStyle = "#34d399";
      holoCtx.fillText("status: '0 ERRORS • READY TO HIRE ⚡'", 26, 226);
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

    // --- 5B. VIRTUAL HOLOGRAPHIC KEYBOARD (Projects in front for Holo Code) ---
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

      // Futuristic Cyber Grid Keyboard Keycaps
      const rows = 4;
      const cols = 12;
      const keyW = 32;
      const keyH = 26;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const kx = 22 + c * 38 + (r * 7);
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
      // Spacebar
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

    // --- 6. FLOATING ORBITING CODE NODES (RPL Software Symbols) ---
    // 6 Orbiting tech chips: < / >, { }, >_, git, TS, API
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
      const radius = 1.25; // Compact radius so it NEVER cuts into border
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

    // Ground Shadow (Lifted so it won't be cut off by container bottom)
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

    // --- 6B. JETPACK ROCKET EXHAUST PARTICLES (Active during roaming flight) ---
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

    // 7. Interactive State Machine & Autonomous Roaming Engine
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

    // Autonomous Roaming State
    let isRoaming = false;
    let stationaryCooldown = 2.5; // Initial stationary greeting before roaming begins
    let roamTime = 0.5;
    const robotWorldPos = new THREE.Vector3(0, -0.15, 0);
    const stationPos = new THREE.Vector3(0, -0.15, 0);
    let prevRoamX = 0;
    let prevRoamY = -0.15;
    let prevRoamZ = 0;
    let flightVelX = 0;
    let flightVelY = 0;
    let flightVelZ = 0;

    const triggerAction = (action: RobotActionType) => {
      currentAction = action;
      actionTime = 0;
      isRoaming = false; // STOP ROAMING IMMEDIATELY
      stationaryCooldown = 3.5; // Stay still for action duration + post-interaction pause
      coreLight.intensity = 6.0;
      orangeGlowMat.emissiveIntensity = 6.0;
    };
    triggerActionRef.current = triggerAction;

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
      isRoaming = false;
      stationaryCooldown = 3.5;
      previousMouseX = e.clientX;
      pointerDownTime = performance.now();
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      stationaryCooldown = 2.5;
      const moveDistance = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
      const isQuickClick = performance.now() - pointerDownTime < 350 && moveDistance < 10;

      if (isQuickClick) {
        // Direct click on canvas / robot!
        const rect = cachedRect;
        if (rect.width && rect.height) {
          mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

          raycaster.setFromCamera(mouseCoord, camera);
          const hits = raycaster.intersectObjects(robotRoot.children, true);

          // Advance to next exciting RPL action!
          const actionCycle: RobotActionType[] = [
            "code",
            "debug",
            "spin",
            "deploy",
            "thumbsUp",
            "dance",
            "wave",
          ];

          let nextAction: RobotActionType;
          if (hits.length > 0) {
            const currentIndex = currentAction ? actionCycle.indexOf(currentAction) : -1;
            nextAction = actionCycle[(currentIndex + 1) % actionCycle.length];
          } else {
            const currentIndex = currentAction ? actionCycle.indexOf(currentAction) : -1;
            nextAction = actionCycle[(currentIndex + 1) % actionCycle.length];
          }

          handleActionClick(nextAction);
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

    const handleResize = () => {
      if (!container) return;
      updateRect();
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      robotRoot.scale.setScalar(width < 640 ? 0.60 : 0.72);
    };
    window.addEventListener("resize", handleResize);

    // 8. Main Render & Animation Loop
    let clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Base Hovering oscillation
      const hoverY = Math.sin(elapsed * 2.2) * 0.05;

      // =========================================================================
      // DYNAMIC FLIGHT: AUTONOMOUS ROAMING vs. STATIONARY INTERACTION ("DIAM DULU")
      // =========================================================================
      if (currentAction || isDragging || stationaryCooldown > 0) {
        // --- 1. STATIONARY INTERACTION MODE ("DIAM DULU / BERDIRI") ---
        isRoaming = false;
        if (!currentAction && !isDragging) {
          stationaryCooldown -= 0.018;
        }

        // Smoothly glide back to center interactive station
        robotWorldPos.x = THREE.MathUtils.lerp(robotWorldPos.x, stationPos.x, 0.08);
        robotWorldPos.y = THREE.MathUtils.lerp(robotWorldPos.y, stationPos.y + hoverY, 0.08);
        robotWorldPos.z = THREE.MathUtils.lerp(robotWorldPos.z, stationPos.z, 0.08);

        flightVelX *= 0.85;
        flightVelY *= 0.85;
        flightVelZ *= 0.85;

        // Reset banking, heading, and pitch to clean upright interaction stance
        robotRoot.rotation.z = THREE.MathUtils.lerp(robotRoot.rotation.z, 0, 0.08);
        if (currentAction !== "deploy") {
          robotRoot.rotation.x = THREE.MathUtils.lerp(robotRoot.rotation.x, 0, 0.08);
        }
        if (!isDragging && currentAction !== "spin") {
          robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, 0, 0.08);
        }

        // Tech ring & nodes visible when interacting
        orbitRing.visible = true;
        orbitNodesGroup.visible = true;
        orbitRing.position.copy(robotWorldPos);
        orbitRing.position.y += 0.4;
        orbitNodesGroup.position.copy(robotWorldPos);

        // Thrusters in calm idle hover
        const idleFlame = 0.85 + Math.sin(elapsed * 12) * 0.22;
        leftExhaust.scale.set(1.0, idleFlame, 1.0);
        rightExhaust.scale.set(1.0, idleFlame, 1.0);
      } else {
        // --- 2. AUTONOMOUS SUPERSONIC ROCKET FLIGHT ("TERBANG TIDUR KELILING SECTION HOME") ---
        isRoaming = true;
        roamTime += 0.009; // smooth pacing

        // Hide tech ring during high-speed rocket cruise
        orbitRing.visible = false;
        orbitNodesGroup.visible = false;

        // Dynamic roaming boundaries covering the ENTIRE Home section
        // Viewport bounds: horizontal span up to ~4.0 on desktop, vertical span up to ~1.45
        const roamSpanX = Math.max(1.4, Math.min(4.0, camera.aspect * 2.25));
        const roamSpanY = 1.35;
        const roamSpanZ = 0.65;

        // Broad looping trajectory covering left orange half, central editorial title, and right white/dark half
        const targetX =
          Math.sin(roamTime * 0.72) * (roamSpanX * 0.86) +
          Math.cos(roamTime * 1.44) * (roamSpanX * 0.22);
        const targetY =
          0.12 +
          Math.sin(roamTime * 0.92) * (roamSpanY * 0.72) +
          Math.cos(roamTime * 0.46) * 0.42;
        const targetZ = Math.sin(roamTime * 0.62) * roamSpanZ;

        // Velocity tracking for aerodynamics
        flightVelX = targetX - prevRoamX;
        flightVelY = targetY - prevRoamY;
        flightVelZ = targetZ - prevRoamZ;
        prevRoamX = targetX;
        prevRoamY = targetY;
        prevRoamZ = targetZ;

        const flightSpeed = Math.hypot(flightVelX, flightVelY, flightVelZ);

        // Smooth position interpolation
        robotWorldPos.x = THREE.MathUtils.lerp(robotWorldPos.x, targetX, 0.06);
        robotWorldPos.y = THREE.MathUtils.lerp(robotWorldPos.y, targetY, 0.06);
        robotWorldPos.z = THREE.MathUtils.lerp(robotWorldPos.z, targetZ, 0.06);

        // =====================================================================
        // ROCKET PRONE FLIGHT POSTURE ("TERBANG TIDUR", BUKAN BERDIRI)
        // =====================================================================
        // 1. Pitch: Body lies horizontally flat in the air (~78° to 84° forward lean)
        // Head leads forward, feet & thrusters trail behind!
        const basePronePitch = Math.PI * 0.44; // ~79.2 degrees forward tilt!
        const climbAngle = (flightVelY / Math.max(0.001, flightSpeed)) * 0.32;
        const targetPitchX = basePronePitch - climbAngle;

        // 2. Heading / Yaw: Points smoothly toward flight direction
        const targetHeadingY = Math.atan2(flightVelX, 0.02 + Math.abs(flightVelZ) * 0.4) * 0.95;

        // 3. Dynamic Aerodynamic Banking: Roll body into curves
        const targetBankZ = -flightVelX * 4.4;

        robotRoot.rotation.z = THREE.MathUtils.lerp(robotRoot.rotation.z, targetBankZ, 0.08);
        robotRoot.rotation.x = THREE.MathUtils.lerp(robotRoot.rotation.x, targetPitchX, 0.08);
        robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, targetHeadingY, 0.08);

        // 4. Head pose: Tilted up & forward relative to pitched torso so eyes look where it is flying!
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -0.56 - climbAngle * 0.3, 0.08);
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, flightVelX * 1.8, 0.08);

        // 5. Streamlined Rocket Arms: Tucked back along the torso like supersonic wings/fins
        leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 1.82, 0.08);
        leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.32 + targetBankZ * 0.2, 0.08);
        leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0.1, 0.08);

        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 1.82, 0.08);
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.32 + targetBankZ * 0.2, 0.08);
        rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.1, 0.08);

        // Forearms streamlined with subtle flight micro-flutter
        leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, 0.16 + Math.sin(elapsed * 10) * 0.03, 0.08);
        rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, 0.16 + Math.sin(elapsed * 10 + 1) * 0.03, 0.08);
        leftForearmGroup.rotation.y = 0;
        rightForearmGroup.rotation.y = 0;
        leftForearmGroup.rotation.z = 0;
        rightForearmGroup.rotation.z = 0;

        leftHand.position.y = -0.6;
        rightHand.position.y = -0.6;

        // 6. Rocket Thrusters flare bright and long
        const cruiseFlame = 1.85 + flightSpeed * 28.0 + Math.sin(elapsed * 28) * 0.35;
        leftExhaust.scale.set(1.4, cruiseFlame, 1.4);
        rightExhaust.scale.set(1.4, cruiseFlame, 1.4);
      }

      robotRoot.position.copy(robotWorldPos);

      // Ground Shadow follows robot position and scales with flight altitude
      groundShadow.position.x = robotWorldPos.x;
      groundShadow.position.z = robotWorldPos.z;
      const groundDist = robotWorldPos.y - (-1.05);
      groundShadow.scale.setScalar(Math.max(0.2, 1.25 - groundDist * 0.35));
      shadowMat.opacity = Math.max(0.02, 0.22 - groundDist * 0.07);

      // --- JETPACK ROCKET PARTICLE TRAIL UPDATE ---
      const posAttr = pGeo.attributes.position as THREE.BufferAttribute;
      const leftJetWorld = new THREE.Vector3();
      const rightJetWorld = new THREE.Vector3();
      leftExhaust.getWorldPosition(leftJetWorld);
      rightExhaust.getWorldPosition(rightJetWorld);

      for (let p = 0; p < pCount; p++) {
        pLifetimes[p] += isRoaming ? 0.045 : 0.025;
        if (pLifetimes[p] >= 1.0) {
          pLifetimes[p] = 0;
          const source = p % 2 === 0 ? leftJetWorld : rightJetWorld;
          posAttr.setXYZ(
            p,
            source.x + (Math.random() - 0.5) * 0.06,
            source.y + (Math.random() - 0.5) * 0.06,
            source.z + (Math.random() - 0.5) * 0.06
          );
          if (isRoaming) {
            // Trailing backwards behind the robot's flight path
            pVelocities[p].set(
              -flightVelX * 1.5 + (Math.random() - 0.5) * 0.025,
              -flightVelY * 1.5 + (Math.random() - 0.5) * 0.025,
              -flightVelZ * 1.5 + (Math.random() - 0.5) * 0.025
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

      // Rotate Orbit Ring and Nodes when visible
      if (orbitRing.visible) {
        orbitRing.rotation.z = elapsed * 0.3;
        orbitNodesGroup.rotation.y = elapsed * 0.45;
        nodeMeshes.forEach((nm) => {
          nm.rotation.y = -orbitNodesGroup.rotation.y;
        });
      }

      // Core pulsating glow
      const corePulse = 3.2 + Math.sin(elapsed * 4.5) * 1.2;
      coreLight.intensity = THREE.MathUtils.lerp(coreLight.intensity, corePulse, 0.05);
      orangeGlowMat.emissiveIntensity = THREE.MathUtils.lerp(orangeGlowMat.emissiveIntensity, corePulse, 0.05);

      // Smooth Head Tracking when interacting
      if (currentAction && currentAction !== "spin") {
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetRotY * 1.15, 0.08);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetRotX * 0.95, 0.08);
        torsoGroup.rotation.y = THREE.MathUtils.lerp(torsoGroup.rotation.y, targetRotY * 0.35, 0.05);
      }

      // Drag inertia
      if (!isDragging && currentAction !== "spin") {
        dragVelocity *= 0.94;
        robotRoot.rotation.y += dragVelocity;
        if (Math.abs(dragVelocity) < 0.001) {
          robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, 0, 0.03);
        }
      }

      // --- ACTION ANIMATIONS DISPATCHER ---
      if (currentAction) {
        actionTime += 0.024;

        if (currentAction === "code") {
          // ACTION 1: Hologram Coding Mode
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0.95, 0.14);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0.88, 0.14);
          holoScreenMesh.position.z = THREE.MathUtils.lerp(holoScreenMesh.position.z, 1.15, 0.1);
          kbMesh.position.z = THREE.MathUtils.lerp(kbMesh.position.z, 1.05, 0.1);

          // Alternating natural typing rhythm
          const leftTap = Math.sin(actionTime * 24);
          const rightTap = Math.sin(actionTime * 24 + 1.8);

          // Both arms reach FORWARD (negative X angle) and angle inward (Y angle) towards the keyboard
          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.68, 0.16);
          leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0.28, 0.16);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.16, 0.16);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.68, 0.16);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.28, 0.16);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.16, 0.16);

          // Forearms: Bend up/forward horizontally over virtual keyboard with fluid keystroke tapping
          leftForearmGroup.rotation.x = THREE.MathUtils.lerp(
            leftForearmGroup.rotation.x,
            -0.74 + leftTap * 0.12,
            0.22
          );
          leftForearmGroup.rotation.y = THREE.MathUtils.lerp(leftForearmGroup.rotation.y, -0.12, 0.16);
          leftForearmGroup.rotation.z = Math.cos(actionTime * 18) * 0.05;

          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(
            rightForearmGroup.rotation.x,
            -0.74 + rightTap * 0.12,
            0.22
          );
          rightForearmGroup.rotation.y = THREE.MathUtils.lerp(rightForearmGroup.rotation.y, 0.12, 0.16);
          rightForearmGroup.rotation.z = -Math.cos(actionTime * 18 + 1.8) * 0.05;

          // Hands: subtle fingertip tapping displacement
          leftHand.position.y = -0.6 + leftTap * 0.03;
          rightHand.position.y = -0.6 + rightTap * 0.03;

          // Head looks directly down at the holographic code and keyboard
          headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0.26, 0.15);
          headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, Math.sin(actionTime * 4.5) * 0.08, 0.15);

          if (actionTime > actionDuration + 0.6) {
            currentAction = null;
          }
        } else if (currentAction === "debug") {
          // ACTION 2: Debug Mode / 0 Errors Resolved
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);
          leftEye.material = debugGreenMat;
          rightEye.material = debugGreenMat;

          // Natural thinking posture: Right hand to chin, left arm resting forward
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.85, 0.15);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.42, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.18, 0.15);
          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.92, 0.15);
          rightForearmGroup.rotation.z = THREE.MathUtils.lerp(rightForearmGroup.rotation.z, 0.65, 0.15);

          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.32, 0.12);
          leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0.18, 0.12);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.15, 0.12);
          leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, -0.42, 0.12);

          // Head tilt of thoughtful satisfaction
          headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0.12, 0.1);
          headGroup.rotation.x = Math.sin(actionTime * 5.5) * 0.08;

          if (actionTime > actionDuration) {
            leftEye.material = eyeGlowMat;
            rightEye.material = eyeGlowMat;
            currentAction = null;
          }
        } else if (currentAction === "spin") {
          // ACTION 3: 360 Turbo Spin Trick
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const spinProgress = actionTime / 1.5;
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
            robotRoot.rotation.y = 0;
            currentAction = null;
          }
        } else if (currentAction === "deploy") {
          // ACTION 4: Deploy / Rocket Thruster Launch Boost
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const launchProgress = actionTime / 2.2;
          const liftHeight = Math.sin(Math.min(launchProgress, 1.0) * Math.PI) * 0.55;
          robotRoot.position.y = hoverY + liftHeight;

          // Mega flame jets
          leftExhaust.scale.set(2.0, 2.8, 2.0);
          rightExhaust.scale.set(2.0, 2.8, 2.0);

          // Aerodynamic flight pose: arms swept BACKWARDS (positive X in Three.js)
          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0.68, 0.15);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.35, 0.15);
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.68, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.35, 0.15);
          leftForearmGroup.rotation.x = 0;
          rightForearmGroup.rotation.x = 0;

          // Look up towards cloud
          headGroup.rotation.x = -0.35;

          if (actionTime > actionDuration) {
            currentAction = null;
          }
        } else if (currentAction === "thumbsUp") {
          // ACTION 5: Thumbs Up / Dev Respect
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);
          // Right arm reaches FORWARD (negative X) with confident thumbs-up
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.85, 0.15);
          rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, -0.15, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.12, 0.15);
          rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, -0.68, 0.15);
          rightHand.scale.set(1.4, 1.4, 1.4);

          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.18, 0.1);
          coreLight.intensity = 5.5;

          if (actionTime > actionDuration) {
            rightHand.scale.set(1, 1, 1);
            currentAction = null;
          }
        } else if (currentAction === "dance") {
          // ACTION 6: Victory Groove Dance
          holoMat.opacity = 0;
          kbMat.opacity = 0;
          const beat = Math.sin(actionTime * 9);
          robotRoot.position.y = hoverY + Math.abs(beat) * 0.15;
          torsoGroup.rotation.z = beat * 0.12;

          leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, -0.45 + beat * 0.35, 0.15);
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, 0.35 - beat * 0.2, 0.15);

          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.45 - beat * 0.35, 0.15);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, -0.35 + beat * 0.2, 0.15);

          headGroup.rotation.y = -beat * 0.25;

          if (actionTime > actionDuration) {
            torsoGroup.rotation.z = 0;
            currentAction = null;
          }
        } else if (currentAction === "wave") {
          // ACTION 7: Friendly RPL Greeting Wave
          holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.12);
          kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.12);
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 1.95, 0.15);
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.25, 0.15);
          rightForearmGroup.rotation.z = Math.sin(actionTime * 12) * 0.45;
          leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -0.2, 0.1);

          if (actionTime > actionDuration) {
            currentAction = null;
          }
        }
      } else {
        // Return smoothly to idle pose
        holoMat.opacity = THREE.MathUtils.lerp(holoMat.opacity, 0, 0.1);
        kbMat.opacity = THREE.MathUtils.lerp(kbMat.opacity, 0, 0.1);
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, Math.sin(elapsed * 1.5) * 0.05, 0.08);
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0, 0.08);
        rightArmGroup.rotation.y = THREE.MathUtils.lerp(rightArmGroup.rotation.y, 0, 0.08);
        rightForearmGroup.rotation.z = THREE.MathUtils.lerp(rightForearmGroup.rotation.z, 0, 0.08);
        rightForearmGroup.rotation.x = THREE.MathUtils.lerp(rightForearmGroup.rotation.x, 0, 0.08);
        rightForearmGroup.rotation.y = THREE.MathUtils.lerp(rightForearmGroup.rotation.y, 0, 0.08);

        leftArmGroup.rotation.z = THREE.MathUtils.lerp(leftArmGroup.rotation.z, -Math.sin(elapsed * 1.5) * 0.05, 0.08);
        leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0, 0.08);
        leftArmGroup.rotation.y = THREE.MathUtils.lerp(leftArmGroup.rotation.y, 0, 0.08);
        leftForearmGroup.rotation.x = THREE.MathUtils.lerp(leftForearmGroup.rotation.x, 0, 0.08);
        leftForearmGroup.rotation.y = THREE.MathUtils.lerp(leftForearmGroup.rotation.y, 0, 0.08);
        leftForearmGroup.rotation.z = THREE.MathUtils.lerp(leftForearmGroup.rotation.z, 0, 0.08);

        leftHand.position.y = THREE.MathUtils.lerp(leftHand.position.y, -0.6, 0.08);
        rightHand.position.y = THREE.MathUtils.lerp(rightHand.position.y, -0.6, 0.08);

        leftEye.material = eyeGlowMat;
        rightEye.material = eyeGlowMat;
        rightHand.scale.set(1, 1, 1);
        torsoGroup.rotation.z = THREE.MathUtils.lerp(torsoGroup.rotation.z, 0, 0.08);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0, 0.08);
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

      renderer.dispose();
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
  }, [handleActionClick]);

  return (
    <div
      ref={containerRef}
      className={`interactive-robot-container relative flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* 1. Tech Speech Bubble / Status Output */}
      {speechText && (
        <div className="robot-speech-bubble absolute top-4 sm:top-6 z-30 animate-bounce pointer-events-none max-w-[90vw] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-slate-950/95 px-4 sm:px-5 py-1.5 sm:py-2 text-[0.72rem] sm:text-xs font-bold text-orange-400 shadow-[0_0_25px_rgba(255,98,0,0.45)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="line-clamp-2">{speechText}</span>
          </div>
        </div>
      )}

      {/* 2. Interactive RPL Floating Action Hologram Badges (Zero-gravity random floating) */}
      <div className="robot-floating-actions-container absolute bottom-28 sm:bottom-32 md:bottom-28 lg:bottom-6 inset-x-0 z-30 flex flex-col items-center pointer-events-none px-2">
        {/* Subtle floating HUD micro-label */}
        <div className="mb-1.5 sm:mb-2 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-slate-950/85 dark:bg-slate-950/90 border border-orange-500/35 text-[9px] sm:text-[11px] font-mono text-orange-400 backdrop-blur-md shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="tracking-wide">Holo Actions • Click Robot or Floating Badges</span>
        </div>

        {/* Floating Badges Constellation */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-[340px] sm:max-w-[460px] md:max-w-[580px] pointer-events-auto">
          {ACTION_LIST.map((action, idx) => {
            const isActive = activeAction === action.id;
            const floatClass = `float-pill-${(idx % 7) + 1}`;
            const ActionIcon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleActionClick(action.id);
                }}
                className={`float-pill-btn ${floatClass} ${
                  isActive ? "is-active" : ""
                } group relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[0.62rem] sm:text-xs font-bold backdrop-blur-md transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "!bg-gradient-to-r !from-orange-500 !to-amber-500 !text-white !border-orange-300 shadow-[0_0_25px_rgba(255,98,0,0.65)] ring-2 ring-orange-300"
                    : "bg-white/95 dark:bg-slate-950/90 text-slate-800 dark:text-slate-100 border border-orange-400/50 dark:border-orange-500/40 shadow-[0_6px_20px_rgba(249,115,22,0.18)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.45)] hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-white dark:hover:bg-slate-900"
                }`}
                title={action.label}
              >
                <ActionIcon
                  size={12}
                  className="shrink-0 transition-transform duration-300 group-hover:scale-125"
                />
                <span className="tracking-tight">{action.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping shrink-0 ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
