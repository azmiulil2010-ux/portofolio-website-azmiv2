"use client";

import React, { useRef, useCallback, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 7)
  scale?: number; // Scale on hover (default: 1.015)
  glare?: boolean; // Show light reflection (default: true)
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.015,
  glare = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef(true);

  useEffect(() => {
    isFinePointerRef.current = window.matchMedia("(pointer: fine)").matches;
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isFinePointerRef.current || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
    cardRef.current.style.transition = "transform 0.1s ease-out";
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isFinePointerRef.current || !cardRef.current) return;
      if (!rectRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
      }

      const rect = rectRef.current;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = -percentY * maxTilt;
      const tiltY = percentX * maxTilt;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      rafIdRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(
          2
        )}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        if (glare && glareRef.current) {
          glareRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 80%)`;
        }
      });
    },
    [maxTilt, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isFinePointerRef.current || !cardRef.current) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rectRef.current = null;
    cardRef.current.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 z-20"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
