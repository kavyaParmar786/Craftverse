"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Package, Sparkles, Printer, Shirt, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

const categories = [
  { icon: BarChart3, label: "DIY Charts", desc: "Hand-crafted charts for school & college projects, beautifully made", href: "/diy-charts", symbol: "📊" },
  { icon: Package, label: "DIY Models", desc: "Working 3D models for science & geography — built with care", href: "/diy-models", symbol: "📦" },
  { icon: Sparkles, label: "Custom Projects", desc: "Your idea, our hands. We build it from scratch, just for you", href: "/custom-models", symbol: "✦" },
  { icon: Printer, label: "3D Printing", desc: "Upload your design — we print it with precision and craft", href: "/3d-printing", symbol: "🖨" },
  { icon: Shirt, label: "Custom Clothes", desc: "Wearable art — apparel designed exactly as you imagine it", href: "/custom-clothes", symbol: "✂" },
];

const steps = [
  { num: "01", title: "Choose or Request", desc: "Browse our catalog or tell us your idea. We love bringing fresh visions to life.", icon: "✦" },
  { num: "02", title: "We Craft It", desc: "Our makers work with real materials and real attention to every detail.", icon: "◈" },
  { num: "03", title: "Delivered to You", desc: "Packaged with care and delivered right to your doorstep.", icon: "◎" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Student, Class 12", text: "The science model was absolutely stunning. My teacher was amazed — and so was I. Got an A+ and it still sits on my desk.", initials: "PS" },
  { name: "Rahul Mehta", role: "Engineering Student", text: "3D printing service delivered exactly what I envisioned. The quality felt professional, not student-project level at all.", initials: "RM" },
  { name: "Ananya Singh", role: "Project Coordinator", text: "Ordered charts for our school exhibition. Premium quality, on time, and the team was so helpful throughout.", initials: "AS" },
];

/* Floating particles canvas */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const symbols = ["✦", "◈", "◎", "·"];
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.35 + 0.08,
      isSymbol: Math.random() > 0.65,
      sym: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#C97B63";
        if (p.isSymbol) {
          ctx.font = `${p.r * 6}px Georgia, serif`;
          ctx.fillText(p.sym, p.x, p.y);
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />;
}

/* Custom cursor */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.13;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.13;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    const grow = () => { if (ringRef.current) { ringRef.current.style.width = "48px"; ringRef.current.style.height = "48px"; ringRef.current.style.marginTop = "-4px"; ringRef.current.style.marginLeft = "-4px"; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; ringRef.current.style.marginTop = "0"; ringRef.current.style.marginLeft = "0"; } };
    document.addEventListener("mouseenter", grow, true);
    document.querySelectorAll("a, button").forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#C97B63", pointerEvents: "none", zIndex: 99999 }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(201,123,99,0.55)", pointerEvents: "none", zIndex: 99998, transition: "width 0.2s, height 0.2s, border-color 0.2s" }} />
    </>
  );
}

/* 3D tilt card */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.02)`;
    el.style.boxShadow = `${-x * 18}px ${-y * 18}px 36px rgba(62,47,47,0.14)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateY(0) scale(1)";
    el.style.boxShadow = "0 2px 12px rgba(62,47,47,0.08)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...style, transition: "transform 0.12s ease, box-shadow 0.12s ease", willChange: "transform" }}>
      {children}
    </div>
  );
}

/* Animated number counter */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const dur = 1400;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* Scroll reveal */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* Marquee */
function Marquee() {
  const items = ["DIY Charts", "Custom Clothes", "3D Printing", "Hand-crafted Models", "School Projects", "Custom Creations", "Made in India ✦"];
  const all = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: "#C97B63", padding: "13px 0" }}>
      <div className="marquee-inner" style={{ display: "flex", gap: 52, whiteSpace: "nowrap", width: "max-content" }}>
        {all.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11.5, fontWeight: 600, color: "white", letterSpacing: "0.14em", textTransform: "uppercase", flexShrink: 0 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Wavy SVG divider */
function Wave({ color }: { color: string }) {
  return (
    <div style={{ lineHeight: 0, display: "block" }}>
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 56 }}>
        <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [show, setShow] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    fetch("/api/products?featured=true&limit=4")
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoadingProducts(false); })
      .catch(() => setLoadingProducts(false));
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <CustomCursor />
      <div style={{ background: "#F5E9DA", cursor: "none" }}>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "linear-gradient(150deg, #F5E9DA 0%, #EAD8C0 55%, #F5E9DA 100%)", paddingTop: 80 }}>
          <ParticleField />

          {/* Floating deco */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <div className="f-a" style={{ position: "absolute", top: "18%", left: "7%", fontSize: 28, opacity: 0.17, filter: "sepia(1)" }}>✂️</div>
            <div className="f-b" style={{ position: "absolute", top: "28%", right: "9%", fontSize: 24, opacity: 0.14, filter: "sepia(1)" }}>✏️</div>
            <div className="f-c" style={{ position: "absolute", bottom: "30%", left: "11%", fontSize: 22, opacity: 0.13, filter: "sepia(1)" }}>📐</div>
            <div className="f-a" style={{ position: "absolute", bottom: "24%", right: "7%", fontSize: 24, opacity: 0.13, filter: "sepia(1)", animationDelay: "1.2s" }}>🎨</div>
            <svg style={{ position: "absolute", top: "8%", right: "18%", opacity: 0.08 }} viewBox="0 0 130 130" width="130" height="130">
              <circle cx="65" cy="65" r="55" stroke="#C97B63" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
              <circle cx="65" cy="65" r="35" stroke="#C97B63" strokeWidth="1" strokeDasharray="3 5" fill="none" />
            </svg>
            <svg style={{ position: "absolute", bottom: "12%", left: "4%", opacity: 0.07 }} viewBox="0 0 180 180" width="180" height="180">
              <path d="M90 20 C140 15, 170 55, 165 100 C160 145, 128 175, 90 170 C48 165, 15 132, 18 90 C22 45, 50 25, 90 20Z" fill="#C97B63" />
            </svg>
            <svg style={{ position: "absolute", top: "6%", left: "4%", opacity: 0.1 }} viewBox="0 0 100 100" width="100" height="100">
              {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => <circle key={`${r}-${c}`} cx={10+c*20} cy={10+r*20} r="2" fill="#C97B63" />))}
            </svg>
            {/* Radial glow */}
            <div style={{ position: "absolute", top: "28%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 550, background: "radial-gradient(ellipse, rgba(201,123,99,0.11) 0%, transparent 70%)" }} />
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 820, padding: "0 28px" }}>
            <div className="badge" style={{ marginBottom: 28, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(18px)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
              <span>✦</span> India's Creative Studio
            </div>

            <div style={{ overflow: "hidden" }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(44px,7.5vw,82px)", fontWeight: 700, lineHeight: 1.1, color: "#3E2F2F", marginBottom: 8, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(44px)", transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
                Craft Verse –
              </h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: 22 }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px,7vw,76px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15, color: "#C97B63", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(44px)", transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
                Where Creativity Comes to Life
              </h1>
            </div>

            {/* Animated SVG underline */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, opacity: show ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}>
              <svg viewBox="0 0 260 22" style={{ width: 260, height: 22 }}>
                <path d="M4 14 C45 4, 90 20, 130 12 C170 3, 220 18, 256 12"
                  stroke="#C97B63" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55"
                  strokeDasharray="300" strokeDashoffset="300">
                  <animate attributeName="stroke-dashoffset" from="300" to="0" dur="1s" begin="0.5s" fill="freeze" />
                </path>
              </svg>
            </div>

            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(14px,2vw,17px)", color: "#7A6060", lineHeight: 1.8, marginBottom: 42, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.38s" }}>
              DIY Kits &nbsp;·&nbsp; School Projects &nbsp;·&nbsp; Custom Creations
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.48s" }}>
              <Link href="/diy-charts" className="btn-primary" style={{ boxShadow: "0 6px 24px rgba(201,123,99,0.4)" }}>Explore Shop <ArrowRight size={15} /></Link>
              <Link href="/custom-models" className="btn-secondary">Start a Custom Project</Link>
            </div>

            {/* Hero stats */}
            <div style={{ display: "flex", gap: 52, justifyContent: "center", flexWrap: "wrap", marginTop: 66, opacity: show ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
              {[
                { to: 500, suffix: "+", label: "Projects Delivered" },
                { to: 49, suffix: " ★", label: "Average Rating" },
                { to: 48, suffix: "h", label: "Avg. Turnaround" },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#C97B63" }}>
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div className="scroll-cue" style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #C97B63 60%, transparent)" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C97B63" }} />
          </div>
        </section>

        {/* MARQUEE */}
        <Marquee />

        {/* CATEGORIES */}
        <section style={{ padding: "110px 28px", background: "#FAF3E8" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
              <div className="badge" style={{ marginBottom: 16 }}>What We Offer</div>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, marginBottom: 10 }}>Everything You Need to Create</h2>
              <div className="divider" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))", gap: 22 }}>
              {categories.map((cat, i) => (
                <Link key={cat.label} href={cat.href} style={{ textDecoration: "none" }}>
                  <TiltCard style={{
                    background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.1)", borderRadius: 20,
                    boxShadow: "0 2px 12px rgba(62,47,47,0.08)", height: "100%",
                    opacity: 0, animation: `catUp 0.65s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.09}s forwards`,
                  }}>
                    <div style={{ padding: "28px 24px", height: "100%", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 14, right: 16, fontSize: 22, opacity: 0.2 }}>{cat.symbol}</div>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg,#EAD8C0,#F5E9DA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "0 2px 8px rgba(62,47,47,0.07)" }}>
                        <cat.icon size={20} color="#C97B63" />
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 600, color: "#3E2F2F", marginBottom: 10 }}>{cat.label}</h3>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "#7A6060", lineHeight: 1.65, marginBottom: 20 }}>{cat.desc}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#C97B63", fontSize: 12, fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}>
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Wave color="#F5E9DA" />

        {/* HOW IT WORKS */}
        <section style={{ padding: "100px 28px 120px", background: "#F5E9DA", position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04 }}>
            <defs>
              <pattern id="hatch" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M0 0 L28 28 M28 0 L0 28" stroke="#C97B63" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hatch)" />
          </svg>
          <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
              <div className="badge" style={{ marginBottom: 16 }}>Simple Process</div>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, marginBottom: 10 }}>How It Works</h2>
              <div className="divider" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 32 }}>
              {steps.map((step, i) => (
                <div key={i} className="reveal" style={{ animationDelay: `${i*0.13}s` }}>
                  <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.1)", borderRadius: 22, padding: "40px 32px", textAlign: "center", position: "relative", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "none" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-9px)"; el.style.boxShadow = "0 22px 52px rgba(62,47,47,0.13)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                    <div style={{ position: "absolute", top: 20, right: 22, fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: "#C97B63", opacity: 0.3 }}>{step.num}</div>
                    <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#EAD8C0,#F5E9DA)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", boxShadow: "0 4px 20px rgba(201,123,99,0.18)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px dashed rgba(201,123,99,0.35)" }} />
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "#C97B63" }}>{step.icon}</span>
                    </div>
                    <h3 style={{ fontSize: 19, fontWeight: 600, color: "#3E2F2F", marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13.5, color: "#7A6060", lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Wave color="#FAF3E8" />

        {/* FEATURED PRODUCTS */}
        <section style={{ padding: "110px 28px", background: "#FAF3E8" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 16 }} className="reveal">
              <div>
                <div className="badge" style={{ marginBottom: 14 }}>Handpicked</div>
                <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700 }}>Featured Work</h2>
                <div style={{ width: 48, height: 3, background: "#C97B63", borderRadius: 2, marginTop: 10 }} />
              </div>
              <Link href="/diy-charts" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#C97B63", textDecoration: "none", fontFamily: "'Poppins',sans-serif" }}>View All <ArrowRight size={14} /></Link>
            </div>
            {loadingProducts ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px,1fr))", gap: 24 }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(62,47,47,0.08)" }}>
                    <div className="skeleton" style={{ height: 220 }} />
                    <div style={{ padding: 20, background: "#FAF3E8" }}>
                      <div className="skeleton" style={{ height: 16, width: "70%", marginBottom: 10 }} />
                      <div className="skeleton" style={{ height: 13, marginBottom: 16 }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="skeleton" style={{ height: 22, width: 60 }} />
                        <div className="skeleton" style={{ height: 34, width: 85, borderRadius: 50 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px,1fr))", gap: 24 }}>
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, color: "#C97B63", marginBottom: 16, display: "inline-block", animation: "spinSlow 9s linear infinite" }}>✦</div>
                <h3 style={{ fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>Products Coming Soon</h3>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 28, fontSize: 14 }}>Our catalog is being curated. Check back soon!</p>
                <Link href="/custom-models" className="btn-primary">Start a Custom Request</Link>
              </div>
            )}
          </div>
        </section>

        {/* STATS BAND */}
        <section style={{ background: "#C97B63", padding: "68px 28px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", pointerEvents: "none" }} />
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(28px,6vw,80px)", flexWrap: "wrap" }} className="reveal">
            {[
              { to: 500, suffix: "+", label: "Projects Delivered" },
              { to: 98, suffix: "%", label: "Happy Customers" },
              { to: 48, suffix: "h", label: "Average Delivery" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5vw,50px)", fontWeight: 700, color: "white" }}>
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.12em" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "110px 28px", background: "#EAD8C0", position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", bottom: 0, left: 0, opacity: 0.06, pointerEvents: "none" }} viewBox="0 0 200 200" width="200" height="200">
            <path d="M100 20 C155 15,185 55,180 100 C175 145,140 180,100 180 C55 180,15 145,20 100 C25 50,52 25,100 20Z" fill="#C97B63" />
          </svg>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal">
              <div className="badge" style={{ marginBottom: 16 }}>Kind Words</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700 }}>What Our Customers Say</h2>
              <div className="divider" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={i} className="reveal" style={{ animationDelay: `${i*0.12}s` }}>
                  <TiltCard style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 22, boxShadow: "0 2px 12px rgba(62,47,47,0.07)" }}>
                    <div style={{ padding: "32px 28px" }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, color: "#C97B63", lineHeight: 1, marginBottom: 14, opacity: 0.22 }}>"</div>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13.5, color: "#3E2F2F", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>{t.text}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid rgba(62,47,47,0.08)" }}>
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#C97B63,#A85C45)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 12px rgba(201,123,99,0.3)", flexShrink: 0 }}>{t.initials}</div>
                        <div>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13.5, color: "#3E2F2F" }}>{t.name}</p>
                          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11.5, color: "#A89080", marginTop: 2 }}>{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "110px 28px", background: "#FAF3E8" }}>
          <div className="reveal" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "80px 52px", borderRadius: 30, background: "linear-gradient(135deg,#F5E9DA,#EAD8C0)", border: "1px solid rgba(62,47,47,0.1)", boxShadow: "0 14px 52px rgba(62,47,47,0.1)", position: "relative", overflow: "hidden" }}>
            <svg style={{ position: "absolute", top: 16, right: 16, opacity: 0.14 }} viewBox="0 0 80 80" width="80" height="80">
              {[0,1,2,3].map(r => [0,1,2,3].map(c => <circle key={`${r}-${c}`} cx={10+c*20} cy={10+r*20} r="2" fill="#C97B63" />))}
            </svg>
            <svg style={{ position: "absolute", bottom: 16, left: 16, opacity: 0.14 }} viewBox="0 0 80 80" width="80" height="80">
              {[0,1,2,3].map(r => [0,1,2,3].map(c => <circle key={`${r}-${c}`} cx={10+c*20} cy={10+r*20} r="2" fill="#C97B63" />))}
            </svg>
            <div style={{ display: "inline-block", fontFamily: "'Playfair Display',serif", fontSize: 44, color: "#C97B63", marginBottom: 22, opacity: 0.65, animation: "spinSlow 12s linear infinite" }}>✦</div>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 18, lineHeight: 1.25 }}>Turn Your Idea Into Something Real</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", lineHeight: 1.8, marginBottom: 36, maxWidth: 490, margin: "0 auto 36px" }}>
              Whether it's a school project, a custom creation, or a 3D print — we're here to make it happen, by hand.
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              {["Free Consultation", "Fast Delivery", "Quality Guaranteed"].map(point => (
                <div key={point} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={14} color="#C97B63" />
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", fontWeight: 500 }}>{point}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/custom-models" className="btn-primary">Start Your Project <ArrowRight size={15} /></Link>
              <Link href="/diy-charts" className="btn-secondary">Browse Catalog</Link>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes catUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
          @keyframes spinSlow { to { transform: rotate(360deg); } }
          @keyframes marquee { to { transform: translateX(-33.333%); } }
          @keyframes fa { 0%,100% { transform:translateY(0) rotate(-3deg); } 50% { transform:translateY(-18px) rotate(3deg); } }
          @keyframes fb { 0%,100% { transform:translateY(0) rotate(5deg); } 50% { transform:translateY(-22px) rotate(-5deg); } }
          @keyframes fc { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-13px) rotate(7deg); } }
          @keyframes scrollPulse { 0%,100% { opacity:1; transform:scaleY(1); } 50% { opacity:0.4; transform:scaleY(0.6); } }

          .f-a { animation: fa 5s ease-in-out infinite; }
          .f-b { animation: fb 6.5s ease-in-out infinite; }
          .f-c { animation: fc 4.5s ease-in-out infinite; }
          .marquee-inner { animation: marquee 20s linear infinite; }
          .marquee-inner:hover { animation-play-state: paused; }
          .scroll-cue { animation: scrollPulse 2s ease-in-out infinite; transform-origin: top; }

          .btn-primary { transition: all 0.2s ease !important; }
          .btn-primary:hover { transform: translateY(-3px) scale(1.04) !important; box-shadow: 0 10px 30px rgba(201,123,99,0.45) !important; }
          .btn-secondary:hover { transform: translateY(-2px) !important; }
        `}</style>
      </div>
    </>
  );
}
