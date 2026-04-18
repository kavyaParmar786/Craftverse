"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => setVisible(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "#F5E9DA",
      transition: "opacity 0.6s ease",
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Sketch circle animation */}
      <div style={{ position: "relative", width: 110, height: 110, marginBottom: 24 }}>
        <svg viewBox="0 0 110 110" width="110" height="110" style={{ position: "absolute", inset: 0, animation: "loaderSpin 8s linear infinite" }}>
          <path d="M55 10 C80 8, 100 28, 100 55 C100 82, 80 100, 55 100 C30 100, 10 82, 10 55 C10 28, 32 12, 55 10Z"
            stroke="#C97B63" strokeWidth="1.5" strokeDasharray="5 4" fill="none" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 110 110" width="110" height="110" style={{ position: "absolute", inset: 0, animation: "loaderSpin 4s linear infinite reverse" }}>
          <circle cx="55" cy="9" r="5" fill="#C97B63" opacity="0.7" />
        </svg>
        {/* Dot grid */}
        {[0,1,2,3].map(r => [0,1,2,3].map(c => (
          <div key={`${r}-${c}`} style={{
            position: "absolute",
            top: 25 + r * 14, left: 25 + c * 14,
            width: 3, height: 3, borderRadius: "50%",
            background: "#C97B63",
            opacity: 0.12,
          }} />
        )))}
        {/* CV center */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 58, height: 58, borderRadius: "50%",
            background: "#C97B63",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(201,123,99,0.25)",
          }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 20, color: "white" }}>CV</span>
          </div>
        </div>
      </div>

      <p style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: 14, fontWeight: 600,
        color: "#C97B63", letterSpacing: "0.2em",
        opacity: 0.7,
        animation: "loaderPulse 2s ease-in-out infinite",
      }}>CRAFT VERSE</p>

      <style>{`
        @keyframes loaderSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes loaderPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.8; } }
      `}</style>
    </div>
  );
}
