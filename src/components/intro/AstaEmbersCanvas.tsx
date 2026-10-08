"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export default function AstaEmbersCanvas({
  active = true,
  fading = false,
}: {
  active?: boolean;
  fading?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette fitting Asta's anti-magic & fiery determination
    const colors = [
      "rgba(244, 63, 94, ", // crimson
      "rgba(251, 146, 60, ", // orange-gold ember
      "rgba(168, 85, 247, ", // purple anti-magic
      "rgba(255, 255, 255, ", // white spark
    ];

    const emberCount = width < 768 ? 28 : 55;
    const embers: Ember[] = [];

    const createEmber = (initial = false): Ember => ({
      x: width * 0.5 + (Math.random() - 0.5) * (width * 0.7),
      y: initial ? Math.random() * height : height + 10,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -(Math.random() * 1.5 + 0.8),
      size: Math.random() * 2.5 + 1.2,
      alpha: Math.random() * 0.7 + 0.3,
      decay: Math.random() * 0.003 + 0.002,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber(true));
    }

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= e.decay;

        if (fading) {
          e.alpha -= 0.015;
        }

        if (e.y < -20 || e.alpha <= 0) {
          if (active && !fading) {
            embers[i] = createEmber(false);
          }
          continue;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color}${Math.max(0, e.alpha)})`;
        ctx.shadowColor = e.color.includes("244") ? "#f43f5e" : "#fb923c";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, fading]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden="true"
    />
  );
}
