import { BiPlanet } from "react-icons/bi";
import { LuPlane } from "react-icons/lu";
import Particles from "@/components/home/hero/Particels";

const stars = Array.from({ length: 54 }, (_, index) => index);

export default function SpaceDecorations() {
  return (
    <div className="space-decorations" aria-hidden="true">
      <Particles
        className="space-particle-field"
        particleColors={["#ffffff", "#67e8f9", "#a5b4fc"]}
        particleCount={140}
        particleSpread={13}
        speed={0.045}
        particleBaseSize={55}
        sizeRandomness={0.8}
        alphaParticles
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="space-stars">
        {stars.map((star) => {
          const top = (star * 37 + 11) % 96;
          const left = (star * 61 + 7) % 96;

          return (
          <span
            key={star}
            className="space-star"
            style={{ top: `${top}%`, left: `${left}%` }}
          />
          );
        })}
      </div>
      <div className="space-planet space-planet-one">
        <BiPlanet />
      </div>
      <div className="space-planet space-planet-two">
        <BiPlanet />
      </div>
      <LuPlane className="space-plane space-plane-one" />
      <LuPlane className="space-plane space-plane-two" />
      <span className="space-flight-path space-flight-path-one" />
      <span className="space-flight-path space-flight-path-two" />
    </div>
  );
}