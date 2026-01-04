import { useEffect, useRef } from "react";

export default function Antigravity({
  coreCount = 700,
  ambientCount = 500,
  color = "#a09c9cff",
  particleSize = 1.5,
  sphereRadius = 400,
  growthSpeed = 0.8,          // 🔥 emergence speed
  restoreStrength = 0.02,
  ambientRestore = 0.002,
  repelRadius = 170,
  repelStrength = 0.4,
  damping = 0.92,
  rotationSpeed = 0.0009,
  driftAmplitude = 18,
  driftSpeed = 0.0006,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const baseCenter = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    });

    // ---------------- Mouse ----------------
    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ---------------- Init particles ----------------
    const particles = [];
    const { x: cx, y: cy } = baseCenter();

    // 🔴 CORE PARTICLES (born at center)
    for (let i = 0; i < coreCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const targetRadius = sphereRadius * Math.sqrt(Math.random());

      particles.push({
        type: "core",
        angle,
        targetRadius,
        currentRadius: 0,        // 🔥 start at center
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
      });
    }

    // 🟣 AMBIENT PARTICLES (static field)
    for (let i = 0; i < ambientCount; i++) {
      particles.push({
        type: "ambient",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        homeX: Math.random() * canvas.width,
        homeY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }

    particlesRef.current = particles;

    // ---------------- Animation ----------------
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;

      timeRef.current++;
      const t = timeRef.current;

      // 🌊 Subtle sphere drift
      const driftX = Math.sin(t * driftSpeed) * driftAmplitude;
      const driftY = Math.cos(t * driftSpeed * 0.8) * driftAmplitude;

      const centerX = baseCenter().x + driftX;
      const centerY = baseCenter().y + driftY;

      const rotation = t * rotationSpeed;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        let homeX, homeY;

        if (p.type === "core") {
          // 🌱 Grow outward from center
          p.currentRadius +=
            (p.targetRadius - p.currentRadius) * growthSpeed * 0.02;

          const a = p.angle + rotation;

          homeX = centerX + Math.cos(a) * p.currentRadius;
          homeY = centerY + Math.sin(a) * p.currentRadius;

          // Restore to moving home
          p.vx += (homeX - p.x) * restoreStrength;
          p.vy += (homeY - p.y) * restoreStrength;
        } else {
          // Ambient restore
          p.vx += (p.homeX - p.x) * ambientRestore;
          p.vy += (p.homeY - p.y) * ambientRestore;
        }

        // 🧲 Cursor repulsion
        if (mx !== null && my !== null) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0.1) {
            const force =
              (1 - dist / repelRadius) * repelStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Integrate motion
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
