"use client";

import * as THREE from "three";

export type RobotSkinId = "orange" | "matrix" | "neon" | "obsidian";

export interface RobotSkinConfig {
  id: RobotSkinId;
  name: string;
  tagline: string;
  dotColor: string;
  primaryHex: number;
  secondaryHex: number;
  glowHex: number;
  eyeHex: number;
  armorHex: number;
  metalHex: number;
  accentTailwind: string;
}

export const ROBOT_SKINS: Record<RobotSkinId, RobotSkinConfig> = {
  orange: {
    id: "orange",
    name: "Cyber Orange",
    tagline: "Signature RPL Warmth",
    dotColor: "#ff6200",
    primaryHex: 0xff5500,
    secondaryHex: 0xff9a55,
    glowHex: 0xff6200,
    eyeHex: 0x00f0ff,
    armorHex: 0xfdfdfd,
    metalHex: 0x111622,
    accentTailwind: "from-orange-500 to-amber-500 text-orange-400 border-orange-500/50",
  },
  matrix: {
    id: "matrix",
    name: "Matrix Green",
    tagline: "Hacker Terminal Core",
    dotColor: "#10b981",
    primaryHex: 0x059669,
    secondaryHex: 0x34d399,
    glowHex: 0x10b981,
    eyeHex: 0x6ee7b7,
    armorHex: 0x0f291e,
    metalHex: 0x05130e,
    accentTailwind: "from-emerald-500 to-teal-500 text-emerald-400 border-emerald-500/50",
  },
  neon: {
    id: "neon",
    name: "Cyberpunk Neon",
    tagline: "Synthwave Electric Pulse",
    dotColor: "#d946ef",
    primaryHex: 0xc026d3,
    secondaryHex: 0xf472b6,
    glowHex: 0xd946ef,
    eyeHex: 0x22d3ee,
    armorHex: 0x241238,
    metalHex: 0x12071f,
    accentTailwind: "from-fuchsia-500 to-cyan-500 text-fuchsia-400 border-fuchsia-500/50",
  },
  obsidian: {
    id: "obsidian",
    name: "Stealth Gold",
    tagline: "Obsidian Titanium & Gold",
    dotColor: "#eab308",
    primaryHex: 0xca8a04,
    secondaryHex: 0xfde047,
    glowHex: 0xeab308,
    eyeHex: 0xfacc15,
    armorHex: 0x18181b,
    metalHex: 0x09090b,
    accentTailwind: "from-amber-500 to-yellow-500 text-amber-400 border-amber-500/50",
  },
};

export const ROBOT_SKIN_LIST: RobotSkinConfig[] = [
  ROBOT_SKINS.orange,
  ROBOT_SKINS.matrix,
  ROBOT_SKINS.neon,
  ROBOT_SKINS.obsidian,
];

// Helper to apply skin to Three.js materials in real-time
export function applyRobotSkinToMaterials(
  skinId: RobotSkinId,
  materials: {
    orangeArmorMat: THREE.MeshStandardMaterial;
    orangeGlowMat: THREE.MeshStandardMaterial;
    eyeGlowMat: THREE.MeshStandardMaterial;
    whiteArmorMat?: THREE.MeshStandardMaterial;
    darkMetalMat?: THREE.MeshStandardMaterial;
    orbitRingMat?: THREE.MeshBasicMaterial;
    coreLight?: THREE.PointLight;
    keyLight?: THREE.DirectionalLight;
  }
) {
  const skin = ROBOT_SKINS[skinId] || ROBOT_SKINS.orange;

  // Animate/Lerp or set colors
  materials.orangeArmorMat.color.setHex(skin.primaryHex);
  materials.orangeGlowMat.color.setHex(skin.primaryHex);
  materials.orangeGlowMat.emissive.setHex(skin.glowHex);
  materials.eyeGlowMat.color.setHex(skin.eyeHex);
  materials.eyeGlowMat.emissive.setHex(skin.eyeHex);

  if (materials.orbitRingMat) {
    materials.orbitRingMat.color.setHex(skin.glowHex);
  }

  if (materials.whiteArmorMat) {
    materials.whiteArmorMat.color.setHex(skin.armorHex);
  }

  if (materials.darkMetalMat) {
    materials.darkMetalMat.color.setHex(skin.metalHex);
  }

  if (materials.coreLight) {
    materials.coreLight.color.setHex(skin.glowHex);
  }

  if (materials.keyLight) {
    materials.keyLight.color.setHex(skin.primaryHex);
  }
}
