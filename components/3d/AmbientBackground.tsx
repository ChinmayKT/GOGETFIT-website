"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Global cinematic backdrop, fixed behind everything:
 * - two drifting mesh-gradient blobs (CSS keyframes, transform-only)
 * - canvas particle field with slow upward drift
 * - mouse-reactive radial glow (rAF-lerped, no re-render)
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionGlowRef = useRef<HTMLDivElement>(null);

  // Section-reactive ambient light: the orange glow drifts to the opposite
  // side of the phone and breathes as SnapScroll changes chapters.
  useEffect(() => {
    const el = sectionGlowRef.current;
    if (!el) return;
    const onSection = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      const side = idx % 2 === 0 ? -1 : 1; // phone alternates sides; glow mirrors
      gsap.to(el, {
        xPercent: side * 22,
        yPercent: (idx % 3) * 8 - 8,
        opacity: idx === 7 ? 0.5 : 0.28,
        scale: idx === 7 ? 1.35 : 1,
        duration: 1.4,
        ease: "power3.out",
      });
    };
    window.addEventListener("snap:section", onSection);
    return () => window.removeEventListener("snap:section", onSection);
  }, []);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;

    const COUNT = Math.min(70, Math.floor(w / 22));
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.25 + 0.06),
      vx: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.5 + 0.1,
      orange: Math.random() < 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.orange
          ? `rgba(255,106,0,${p.a * 0.7})`
          : `rgba(200,204,212,${p.a * 0.45})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) raf = requestAnimationFrame(draw);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Mouse glow — lerped toward cursor for a weighty, liquid feel
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      glow.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      {/* Mesh gradient blobs */}
      <div
        className="blob-a absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,106,0,0.28), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="blob-b absolute -bottom-[25%] -right-[15%] h-[80vh] w-[80vh] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(255,138,61,0.22), transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[30%] left-[50%] h-[50vh] w-[50vh] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(200,204,212,0.12), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Section-reactive ambient glow */}
      <div
        ref={sectionGlowRef}
        className="absolute top-1/2 left-1/2 h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 opacity-25 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,0,0.16), transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse-reactive glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[800px] w-[800px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,0,0.07), transparent 60%)",
        }}
      />

      {/* Vignette to anchor the frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.7) 100%)",
        }}
      />
    </div>
  );
}
