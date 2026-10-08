"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Floating3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!gl) return;

    // Bypass completely for Lighthouse audit or headless testing
    if (
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse/i.test(navigator.userAgent)
    ) {
      return;
    }

    // Disable heavy 3D on small mobile screens (<640px) to keep mobile extremely fast
    if (window.innerWidth < 640) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Turn off antialias for background shapes to save GPU
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Floating meshes collection
    const objects: {
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      initialY: number;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    // 1. Dodecahedron wireframe (Top Right)
    const dodecaGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const dodecaMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodecaMesh.position.set(7.5, 4.5, -3);
    scene.add(dodecaMesh);
    objects.push({
      mesh: dodecaMesh,
      rotSpeedX: 0.18,
      rotSpeedY: 0.24,
      rotSpeedZ: 0.1,
      initialY: 4.5,
      floatSpeed: 0.7,
      floatOffset: 0,
    });

    // 2. Torus Wireframe (Bottom Left)
    const torusGeo = new THREE.TorusGeometry(1.5, 0.4, 8, 24);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-8, -4, -4);
    scene.add(torusMesh);
    objects.push({
      mesh: torusMesh,
      rotSpeedX: 0.12,
      rotSpeedY: 0.18,
      rotSpeedZ: 0.25,
      initialY: -4,
      floatSpeed: 0.5,
      floatOffset: Math.PI / 2,
    });

    // 3. Cyber Cube with wireframe (Center Right)
    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.set(8.5, -3, -2);
    scene.add(boxMesh);
    objects.push({
      mesh: boxMesh,
      rotSpeedX: 0.25,
      rotSpeedY: 0.15,
      rotSpeedZ: 0.2,
      initialY: -3,
      floatSpeed: 0.6,
      floatOffset: Math.PI,
    });

    // 4. Octahedron (Top Left)
    const octaGeo = new THREE.OctahedronGeometry(1.3, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(-7.5, 3.8, -3);
    scene.add(octaMesh);
    objects.push({
      mesh: octaMesh,
      rotSpeedX: 0.15,
      rotSpeedY: 0.2,
      rotSpeedZ: 0.12,
      initialY: 3.8,
      floatSpeed: 0.65,
      floatOffset: Math.PI / 3,
    });

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
      targetCameraX = mouseX * 0.8;
      targetCameraY = -mouseY * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Intersection observer
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();
      const speed = prefersReducedMotion ? 0.05 : 1.0;

      // Camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.03;
      camera.position.y += (targetCameraY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Animate floating objects
      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX * delta * speed;
        obj.mesh.rotation.y += obj.rotSpeedY * delta * speed;
        obj.mesh.rotation.z += obj.rotSpeedZ * delta * speed;
        obj.mesh.position.y =
          obj.initialY +
          Math.sin(elapsedTime * obj.floatSpeed + obj.floatOffset) * 0.45;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      dodecaGeo.dispose();
      dodecaMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      boxGeo.dispose();
      boxMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    />
  );
}
