"use client";
import Particles from "./Particels";
import Image from "next/image";
import AnimatedIntro from "./AnimatedIntro";
import LinkButton from "@/components/general/LinkButton";
import { LuArrowRight } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        {/* glowing Image */}
        <div className="relative h-44 w-44 sm:h-52 sm:w-52" data-aos="fade-up">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-purple-600 blur-lg animate-pulse opacity-50"></div>
          <Image
            src="/profil.png"
            alt="Foto Azmi"
            className="rounded-full object-cover object-[center_65%]"
            fill
            sizes="(min-width: 640px) 208px, 176px"
            priority
          />
        </div>
        <h1
          data-aos="fade-up"
          data-aos-delay="400"
          className="my-6 text-center text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-gray-300 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {" "}
          HI I'm Azmi, A Web Developer
        </h1>
        <AnimatedIntro />
        <LinkButton
          href="#projects"
          text="See my work"
          icon={LuArrowRight}
          iconPosition={"right"}
          rounded
          aosType="fade-up"
          aosDelay={600}
          animate
        />
      </div>
    </section>
  );
}
