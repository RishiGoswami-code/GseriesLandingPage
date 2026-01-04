import Antigravity from "./Antigravity";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
        <Antigravity
        coreCount={1000}
        ambientCount={500}
        sphereRadius={300}
        rotationSpeed={0.005}
        driftAmplitude={22}
        />
    </div>
  );
}
