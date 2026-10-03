"use client";

import Image from "next/image";
import { useRef } from "react";

export default function HeroPhoto() {
  const photoRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const cachePhotoBounds = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      boundsRef.current = photoRef.current?.getBoundingClientRect() ?? null;
    }
  };

  const handlePhotoPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const photo = photoRef.current;
    const bounds = boundsRef.current;
    if (!photo || !bounds || event.pointerType !== "mouse") return;

    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
    photo.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    photo.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetPhotoTilt = () => {
    boundsRef.current = null;
    photoRef.current?.style.setProperty("--tilt-x", "0deg");
    photoRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={photoRef}
      onPointerEnter={cachePhotoBounds}
      onPointerMove={handlePhotoPointerMove}
      onPointerLeave={resetPhotoTilt}
      className="hero-photo-float relative aspect-square w-[min(78vw,32rem)]"
    >
      <div className="hero-photo-orbit hero-photo-orbit--outer absolute inset-[-8%] rounded-full" aria-hidden="true" />
      <div className="hero-photo-orbit hero-photo-orbit--inner absolute inset-[-2%] rounded-full" aria-hidden="true" />
      <div className="hero-photo-circle absolute inset-[4%] rounded-full" />
      <div className="hero-photo-halo absolute inset-0 rounded-full border" />
      <Image
        src="/profil.png"
        alt="Foto Azmi"
        width={420}
        height={420}
        quality={70}
        priority
        sizes="(max-width: 640px) 67vw, (max-width: 1024px) 36vw, 28vw"
        className="hero-photo-image absolute inset-[7%] h-[86%] w-[86%] rounded-full object-cover object-[center_25%]"
      />
      <div className="hero-photo-tag absolute bottom-[10%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
        Web Developer
      </div>
      <span className="hero-photo-marker hero-photo-marker--top absolute left-[17%] top-[15%]" aria-hidden="true" />
      <span className="hero-photo-marker hero-photo-marker--bottom absolute bottom-[18%] right-[13%]" aria-hidden="true" />
    </div>
  );
}
