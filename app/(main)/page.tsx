"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Package, Sparkles, Printer, Shirt, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

const categories = [
  {
    icon: BarChart3,
    label: "DIY Charts",
    desc: "Hand-crafted charts for school & college projects, beautifully made",
    href: "/diy-charts",
    symbol: "📊",
  },
  {
    icon: Package,
    label: "DIY Models",
    desc: "Working 3D models for science & geography — built with care",
    href: "/diy-models",
    symbol: "📦",
  },
  {
    icon: Sparkles,
    label: "Custom Projects",
    desc: "Your idea, our hands. We build it from scratch, just for you",
    href: "/custom-models",
    symbol: "✦",
  },
  {
    icon: Printer,
    label: "3D Printing",
    desc: "Upload your design — we print it with precision and craft",
    href: "/3d-printing",
    symbol: "🖨",
  },
  {
    icon: Shirt,
    label: "Custom Clothes",
    desc: "Wearable art — apparel designed exactly as you imagine it",
    href: "/custom-clothes",
    symbol: "✂",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose or Request",
    desc: "Browse our catalog or tell us your idea. We love bringing fresh visions to life.",
    icon: "✦",
  },
  {
    num: "02",
    title: "We Craft It",
    desc: "Our makers work with real materials and real attention to every detail.",
    icon: "◈",
  },
  {
    num: "03",
    title: "Delivered to You",
    desc: "Packaged with care and delivered right to your doorstep.",
    icon: "◎",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student, Class 12",
    text: "The science model was absolutely stunning. My teacher was amazed — and so was I. Got an A+ and it still sits on my desk.",
    initials: "PS",
  },
  {
    name: "Rahul Mehta",
    role: "Engineering Student",
    text: "3D printing service delivered exactly what I envisioned. The quality felt professional, not student-project level at all.",
    initials: "RM",
  },
  {
    name: "Ananya Singh",
    role: "Project Coordinator",
    text: "Ordered charts for our school exhibition. Premium quality, on time, and the team was so helpful throughout.",
    initials: "AS",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Hand-drawn SVG decorations
function ScribbleLine({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 200, height: 20, ...style }}>
      <path d="M2 12 C30 4, 70 18, 100 10 C130 2, 165 16, 198 10"
        stroke="#C97B63" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

function DotGrid({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 80, height: 80, opacity: 0.15, ...style }}>
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="2" fill="#C97B63" />
      )))}
    </svg>
  );
}

function SketchCircle({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 120, height: 120, ...style }}>
      <path d="M60 10 C90 8, 112 30, 110 60 C108 90, 86 112, 60 110 C34 108, 10 88, 10 60 C10 32, 32 12, 60 10Z"
        stroke="#C97B63" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.2" />
    </svg>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  useScrollReveal();

  useEffect(() => {
    fetch("/api/products?featured=true&limit=4")
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoadingProducts(false); })
      .catch(() => setLoadingProducts(false));
  }, []);

  return (
    <div style={{ background: "#F5E9DA" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "#F5E9DA",
        paddingTop: 80,
      }}>
        {/* Background texture elements */}
        <DotGrid style={{ position: "absolute", top: "12%", left: "6%", pointerEvents: "none" }} />
        <DotGrid style={{ position: "absolute", bottom: "14%", right: "8%", pointerEvents: "none" }} />
        <SketchCircle style={{ position: "absolute", top: "8%", right: "12%", pointerEvents: "none" }} />
        <SketchCircle style={{ position: "absolute", bottom: "20%", left: "3%", pointerEvents: "none", width: 80, height: 80 }} />

        {/* Soft paper blob */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
          width: 700, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(234,216,192,0.5) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 780, padding: "0 28px" }}>

          <div className="badge" style={{ marginBottom: 28, animation: "fadeUp 0.6s ease forwards" }}>
            <span>✦</span> India's Creative Studio
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 7vw, 76px)",
            fontWeight: 700,
            lineHeight: 1.13,
            color: "#3E2F2F",
            marginBottom: 12,
            animation: "fadeUp 0.6s ease 0.1s both",
          }}>
            Craft Verse –
          </h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 6.5vw, 72px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.15,
            color: "#C97B63",
            marginBottom: 24,
            animation: "fadeUp 0.6s ease 0.18s both",
          }}>
            Where Creativity Comes to Life
          </h1>

          {/* Scribble underline */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, animation: "fadeUp 0.6s ease 0.24s both" }}>
            <ScribbleLine />
          </div>

          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(14px, 2vw, 17px)",
            color: "#7A6060",
            lineHeight: 1.8,
            marginBottom: 40,
            animation: "fadeUp 0.6s ease 0.3s both",
          }}>
            DIY Kits &nbsp;·&nbsp; School Projects &nbsp;·&nbsp; Custom Creations
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.38s both" }}>
            <Link href="/diy-charts" className="btn-primary">
              Explore Shop <ArrowRight size={15} />
            </Link>
            <Link href="/custom-models" className="btn-secondary">
              Start a Custom Project
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap",
            marginTop: 60, animation: "fadeUp 0.6s ease 0.46s both",
          }}>
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "4.9 ★", label: "Average Rating" },
              { value: "48h", label: "Avg. Turnaround" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#C97B63" }}>{stat.value}</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#A89080", marginTop: 4 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #C97B63)", margin: "0 auto" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C97B63", margin: "0 auto", marginTop: 4 }} />
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section style={{ padding: "100px 28px", background: "#FAF3E8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal">
            <div className="badge" style={{ marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, marginBottom: 8 }}>
              Everything You Need to Create
            </h2>
            <div className="divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))", gap: 20 }}>
            {categories.map((cat, i) => (
              <Link key={cat.label} href={cat.href} style={{ textDecoration: "none" }}>
                <div className="reveal paper-card product-card" style={{
                  padding: "28px 24px",
                  height: "100%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  animationDelay: `${i * 0.08}s`,
                }}>
                  {/* Corner decoration */}
                  <div style={{ position: "absolute", top: 14, right: 16, fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#C97B63", opacity: 0.3 }}>
                    {cat.symbol}
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "#EAD8C0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}>
                    <cat.icon size={20} color="#C97B63" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#3E2F2F", marginBottom: 8 }}>{cat.label}</h3>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12.5, color: "#7A6060", lineHeight: 1.6, marginBottom: 18 }}>{cat.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#C97B63", fontSize: 12, fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ padding: "100px 28px", background: "#F5E9DA", position: "relative", overflow: "hidden" }}>
        <DotGrid style={{ position: "absolute", top: "10%", right: "5%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }} className="reveal">
            <div className="badge" style={{ marginBottom: 16 }}>Simple Process</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, marginBottom: 8 }}>
              How It Works
            </h2>
            <div className="divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} className="reveal" style={{
                background: "#FAF3E8",
                border: "1px solid rgba(62,47,47,0.10)",
                borderRadius: 20,
                padding: "36px 32px",
                textAlign: "center",
                position: "relative",
              }}>
                {/* Step number in corner */}
                <div style={{
                  position: "absolute", top: 18, right: 20,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 13, fontWeight: 700, color: "#C97B63", opacity: 0.4, letterSpacing: "0.05em",
                }}>
                  {step.num}
                </div>

                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36, color: "#C97B63", marginBottom: 18, lineHeight: 1,
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: "#3E2F2F", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: "#7A6060", lineHeight: 1.7 }}>{step.desc}</p>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div style={{
                    display: "none",
                    position: "absolute", right: -20, top: "50%",
                    width: 40, height: 2,
                    background: "rgba(201,123,99,0.2)",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section style={{ padding: "100px 28px", background: "#FAF3E8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }} className="reveal">
            <div>
              <div className="badge" style={{ marginBottom: 14 }}>Handpicked</div>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700 }}>Featured Work</h2>
              <div style={{ width: 48, height: 3, background: "#C97B63", borderRadius: 2, marginTop: 10 }} />
            </div>
            <Link href="/diy-charts" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#C97B63", textDecoration: "none", fontFamily: "'Poppins', sans-serif" }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loadingProducts ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: "#C97B63", marginBottom: 16 }}>✦</div>
              <h3 style={{ fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>Products Coming Soon</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", color: "#7A6060", marginBottom: 28, fontSize: 14 }}>Our catalog is being curated. Check back soon!</p>
              <Link href="/custom-models" className="btn-primary">Start a Custom Request</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section style={{ padding: "100px 28px", background: "#EAD8C0", position: "relative", overflow: "hidden" }}>
        <SketchCircle style={{ position: "absolute", bottom: "5%", left: "2%", width: 100, height: 100, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Stats */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap", marginBottom: 72 }}>
            {[
              { num: "500+", label: "Projects Delivered" },
              { num: "98%", label: "Happy Customers" },
              { num: "48h", label: "Average Delivery" },
              { num: "4.9 ★", label: "Average Rating" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#C97B63" }}>{stat.num}</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#7A6060", marginTop: 4 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <div className="badge" style={{ marginBottom: 16 }}>Kind Words</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700 }}>What Our Customers Say</h2>
            <div className="divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="reveal paper-card" style={{ padding: "30px 28px" }}>
                {/* Quote mark */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: "#C97B63", lineHeight: 1, marginBottom: 12, opacity: 0.3 }}>"</div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: "#3E2F2F", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(62,47,47,0.08)" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#C97B63",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13,
                  }}>{t.initials}</div>
                  <div>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13.5, color: "#3E2F2F" }}>{t.name}</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11.5, color: "#A89080", marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 28px", background: "#FAF3E8" }}>
        <div className="reveal" style={{
          maxWidth: 740, margin: "0 auto", textAlign: "center",
          padding: "72px 48px", borderRadius: 28,
          background: "#F5E9DA",
          border: "1px solid rgba(62,47,47,0.10)",
          boxShadow: "0 8px 40px rgba(62,47,47,0.08)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Corner sketches */}
          <DotGrid style={{ position: "absolute", top: 12, right: 12, width: 60, height: 60 }} />
          <DotGrid style={{ position: "absolute", bottom: 12, left: 12, width: 60, height: 60 }} />

          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#C97B63", marginBottom: 20, opacity: 0.7 }}>✦</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 16, lineHeight: 1.25 }}>
            Turn Your Idea Into Something Real
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: "#7A6060", lineHeight: 1.8, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Whether it's a school project, a custom creation, or a 3D print — we're here to make it happen, by hand.
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            {["Free Consultation", "Fast Delivery", "Quality Guaranteed"].map(point => (
              <div key={point} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={14} color="#C97B63" />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#7A6060", fontWeight: 500 }}>{point}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/custom-models" className="btn-primary">
              Start Your Project <ArrowRight size={15} />
            </Link>
            <Link href="/diy-charts" className="btn-secondary">Browse Catalog</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(8px); } }
      `}</style>
    </div>
  );
}
