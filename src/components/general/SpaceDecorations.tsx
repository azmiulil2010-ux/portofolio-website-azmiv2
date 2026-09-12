import { BiPlanet } from "react-icons/bi";
import { LuPlane } from "react-icons/lu";

export default function SpaceDecorations() {
  return (
    <div className="space-decorations" aria-hidden="true">
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