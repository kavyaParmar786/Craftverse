"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2200);
    const t2 = setTimeout(() => setVisible(false), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
      background:"#F5E9DA",
      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
      transition:"opacity 0.6s ease",
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Warm blobs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,123,99,0.12) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"8%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(232,168,124,0.15) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Logo orbit */}
      <div style={{ position:"relative", width:120, height:120, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        {/* Orbit ring */}
        <svg style={{ position:"absolute", inset:0, animation:"spinLoader 8s linear infinite" }} width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#orbitG)" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" opacity="0.5"/>
          <defs>
            <linearGradient id="orbitG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C97B63"/>
              <stop offset="50%" stopColor="#E8A87C"/>
              <stop offset="100%" stopColor="#A85E48"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Orbiting dot */}
        <svg style={{ position:"absolute", inset:0, animation:"spinLoader 3s linear infinite" }} width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="8" r="5" fill="#C97B63"/>
        </svg>
        <svg style={{ position:"absolute", inset:0, animation:"spinLoader 5s linear infinite reverse" }} width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="8" r="3.5" fill="#E8A87C" opacity="0.7"/>
        </svg>

        {/* Sparkles */}
        {[
          { top:"6%",  left:"72%", delay:"0s",   size:6 },
          { top:"80%", left:"12%", delay:"0.5s",  size:4 },
          { top:"68%", left:"84%", delay:"1s",    size:5 },
          { top:"14%", left:"20%", delay:"0.8s",  size:3 },
        ].map((s,i) => (
          <div key={i} style={{ position:"absolute", top:s.top, left:s.left, width:s.size, height:s.size, borderRadius:"50%", background:"linear-gradient(135deg, #C97B63, #E8A87C)", animation:`sparkleAnim 1.8s ease-in-out ${s.delay} infinite` }}/>
        ))}

        {/* CV badge */}
        <div style={{
          position:"relative", zIndex:10,
          width:64, height:64, borderRadius:18,
          background:"linear-gradient(135deg, rgba(253,246,238,0.95), rgba(237,217,197,0.9))",
          border:"1.5px solid rgba(201,123,99,0.3)",
          boxShadow:"0 8px 32px rgba(44,26,14,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
          display:"flex", alignItems:"center", justifyContent:"center",
          backdropFilter:"blur(8px)",
        }}>
          <span style={{
            fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:22,
            background:"linear-gradient(135deg, #A85E48, #C97B63, #E8A87C)",
            backgroundSize:"200%",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            animation:"gradShift 3s ease infinite",
          }}>CV</span>
        </div>
      </div>

      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:500, color:"#A85E48", letterSpacing:"0.18em", opacity:0.8, animation:"pulseFade 2s ease-in-out infinite" }}>
        CRAFT VERSE
      </p>

      <style>{`
        @keyframes spinLoader { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sparkleAnim { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pulseFade { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
      `}</style>
    </div>
  );
}
