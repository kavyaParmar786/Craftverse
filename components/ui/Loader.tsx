"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2200);
    const hide = setTimeout(() => setVisible(false), 2800);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fdfcfb",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer orbit ring */}
        <svg
          style={{ position: "absolute", inset: 0, animation: "spin 8s linear infinite" }}
          width="120" height="120" viewBox="0 0 120 120"
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" opacity="0.5" />
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting dot */}
        <svg
          style={{ position: "absolute", inset: 0, animation: "spin 3s linear infinite" }}
          width="120" height="120" viewBox="0 0 120 120"
        >
          <circle cx="60" cy="8" r="5" fill="url(#dotGrad)" />
          <defs>
            <radialGradient id="dotGrad">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </radialGradient>
          </defs>
        </svg>

        {/* Second orbiting dot, offset */}
        <svg
          style={{ position: "absolute", inset: 0, animation: "spin 5s linear infinite reverse" }}
          width="120" height="120" viewBox="0 0 120 120"
        >
          <circle cx="60" cy="8" r="3.5" fill="#38bdf8" opacity="0.7" />
        </svg>

        {/* Sparkles */}
        {[
          { top: "6%", left: "72%", delay: "0s", size: 6 },
          { top: "80%", left: "12%", delay: "0.5s", size: 4 },
          { top: "68%", left: "84%", delay: "1s", size: 5 },
          { top: "14%", left: "20%", delay: "0.8s", size: 3 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c4b5fd, #7dd3fc)",
              animation: `sparkleAnim 1.8s ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}

        {/* CV Logo mark */}
        <div style={{
          position: "relative", zIndex: 10,
          width: 64, height: 64,
          borderRadius: 18,
          background: "linear-gradient(135deg, rgba(237,233,254,0.9), rgba(224,242,254,0.9))",
          border: "1.5px solid rgba(139,92,246,0.25)",
          boxShadow: "0 8px 32px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 22,
            background: "linear-gradient(135deg, #7c3aed, #0ea5e9, #fb7185)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradShift 3s ease infinite",
          }}>CV</span>
        </div>
      </div>

      {/* Brand name */}
      <div style={{
        position: "absolute",
        bottom: "calc(50% - 90px)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15, fontWeight: 500,
          color: "#7c3aed",
          letterSpacing: "0.18em",
          opacity: 0.75,
          animation: "pulseFade 2s ease-in-out infinite",
        }}>CRAFT VERSE</p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sparkleAnim {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
