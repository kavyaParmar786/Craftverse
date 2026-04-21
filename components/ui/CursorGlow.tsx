"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x - 180}px, ${y - 180}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 360, height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,123,99,0.13) 0%, rgba(201,123,99,0.05) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9998,
        willChange: "transform",
      }}
    />
  );
}
