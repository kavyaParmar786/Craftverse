"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Package, Printer, Shirt, BarChart3, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

// Floating craft objects
const floatingObjects = [
  { emoji: "📐", top: "15%", left: "8%", delay: 0, size: 40 },
  { emoji: "🎨", top: "25%", right: "6%", delay: 1.2, size: 36 },
  { emoji: "⭐", top: "60%", left: "4%", delay: 0.6, size: 28 },
  { emoji: "🖨️", top: "70%", right: "8%", delay: 1.8, size: 38 },
  { emoji: "✂️", top: "45%", left: "5%", delay: 2.2, size: 32 },
  { emoji: "🏛️", top: "40%", right: "4%", delay: 0.4, size: 34 },
  { emoji: "💠", top: "80%", left: "12%", delay: 1.5, size: 26 },
  { emoji: "🎭", top: "10%", right: "14%", delay: 0.9, size: 30 },
];

const categories = [
  { icon: BarChart3, label: "DIY Charts", desc: "School & college project charts, beautifully crafted", href: "/diy-charts", color: "#C97B63", bg: "linear-gradient(135deg, #EDD9C5, #F5E9DA)" },
  { icon: Package, label: "DIY Models", desc: "3D working models for science & geography projects", href: "/diy-models", color: "#C97B63", bg: "linear-gradient(135deg, #FDF6EE, #EDD9C5)" },
  { icon: Sparkles, label: "Custom Projects", desc: "Tell us your idea — we'll build it from scratch", href: "/custom-models", color: "#C97B63", bg: "linear-gradient(135deg, #FDF6EE, #EDD9C5)" },
  { icon: Printer, label: "3D Printing", desc: "Upload your design, we print it professionally", href: "/3d-printing", color: "#C97B63", bg: "linear-gradient(135deg, #FDF6EE, #EDD9C5)" },
  { icon: Shirt, label: "Custom Clothes", desc: "Unique apparel designed exactly as you imagine", href: "/custom-clothes", color: "#C97B63", bg: "linear-gradient(135deg, #FDF6EE, #F5E9DA)" },
];

const steps = [
  { step: "01", title: "Choose or Request", desc: "Browse our catalog or submit a custom request with your vision and requirements.", icon: "🎯" },
  { step: "02", title: "We Create", desc: "Our skilled artisans and makers bring your project to life with precision and care.", icon: "⚡" },
  { step: "03", title: "Delivered to You", desc: "Receive your creation securely packaged, right at your doorstep.", icon: "🚀" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Student, Class 12", text: "The science model was absolutely stunning! Got an A+ and my teacher was amazed. Will definitely order again.", avatar: "PS", stars: 5 },
  { name: "Rahul Mehta", role: "Engineering Student", text: "The 3D printing service is incredible. My mechanical model came out exactly as designed. Super fast delivery!", avatar: "RM", stars: 5 },
  { name: "Ananya Singh", role: "Project Coordinator", text: "Ordered custom charts for our school exhibition. The quality was premium and delivery was on time!", avatar: "AS", stars: 5 },
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

      {/* ── HERO ────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg, #F5E9DA 0%, #EDD9C5 45%, #EDD9C5 100%)",
      }}>
        {/* Animated gradient blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,196,168,0.4) 0%, transparent 70%)", animation: "blobFloat 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,124,0.35) 0%, transparent 70%)", animation: "blobFloat 6s ease-in-out 2s infinite" }} />
          <div style={{ position: "absolute", top: "40%", right: "25%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,123,99,0.12) 0%, transparent 70%)", animation: "blobFloat 10s ease-in-out 1s infinite" }} />
        </div>

        {/* Floating craft objects */}
        {floatingObjects.map((obj, i) => (
          <div key={i} style={{
            position: "absolute",
            top: obj.top, left: (obj as any).left, right: (obj as any).right,
            fontSize: obj.size,
            animation: `floatAnim ${5 + i * 0.4}s ease-in-out ${obj.delay}s infinite`,
            filter: "drop-shadow(0 4px 12px rgba(201,123,99,0.2))",
            pointerEvents: "none", zIndex: 1,
          }}>
            {obj.emoji}
          </div>
        ))}

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800, padding: "0 24px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: 100,
            background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(201,123,99,0.2)",
            marginBottom: 32,
            animation: "fadeUp 0.7s ease forwards",
          }}>
            <Sparkles size={14} color="#C97B63" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#A85E48", letterSpacing: "0.05em" }}>
              India's Creative Platform
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#2C1A0E", marginBottom: 20,
            animation: "fadeUp 0.7s ease 0.15s both",
          }}>
            Craft Verse –{" "}
            <span style={{
              background: "linear-gradient(135deg, #A85E48, #D4906E, #C97B63)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s ease infinite",
            }}>
              Build. Create. Explore.
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#6B4C3B", lineHeight: 1.7, marginBottom: 40,
            animation: "fadeUp 0.7s ease 0.3s both",
          }}>
            DIY Kits · School Projects · Custom Creations · 3D Printing<br />
            Turn your imagination into something real.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s both" }}>
            <Link href="/diy-charts" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px", borderRadius: 18 }}>
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/custom-models" className="btn-secondary" style={{ fontSize: 15, padding: "14px 32px", borderRadius: 18 }}>
              Start Custom Project ✦
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap",
            marginTop: 56, animation: "fadeUp 0.7s ease 0.6s both",
          }}>
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "4.9★", label: "Average Rating" },
              { value: "48h", label: "Avg. Turnaround" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#A85E48", margin: 0 }}>{stat.value}</p>
                <p style={{ fontSize: 13, color: "#8B6F5E", margin: "4px 0 0" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s ease-in-out infinite" }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(201,123,99,0.4)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, background: "#C97B63", animation: "scrollDot 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "#F5E9DA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }} className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: "#C97B63", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>What We Offer</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#2C1A0E", marginBottom: 16 }}>
              Everything You Need to <span className="gradient-text">Create</span>
            </h2>
            <p style={{ fontSize: 16, color: "#8B6F5E", maxWidth: 500, margin: "0 auto" }}>
              From school projects to professional prints — we've got it all covered.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {categories.map((cat, i) => (
              <Link key={cat.label} href={cat.href} style={{ textDecoration: "none" }}>
                <div className="reveal product-card" style={{
                  padding: 28, borderRadius: 22, background: cat.bg,
                  border: `1px solid ${cat.color}22`,
                  height: "100%", cursor: "pointer",
                  animationDelay: `${i * 0.1}s`,
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <cat.icon size={24} color={cat.color} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 600, color: "#2C1A0E", marginBottom: 8 }}>{cat.label}</h3>
                  <p style={{ fontSize: 13, color: "#8B6F5E", lineHeight: 1.55, marginBottom: 16 }}>{cat.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: cat.color, fontSize: 13, fontWeight: 600 }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, #EDD9C5 0%, #EDD9C5 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }} className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: "#C97B63", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#2C1A0E" }}>
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} className="reveal glass-card" style={{ padding: 36, borderRadius: 24, textAlign: "center", position: "relative" }}>
                {/* Step connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div style={{ display: "none" }} className="step-connector" />
                )}
                <div style={{ fontSize: 48, marginBottom: 16 }}>{step.icon}</div>
                <div style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 8,
                  background: "linear-gradient(135deg, #C97B63, #D4906E)",
                  fontSize: 11, fontWeight: 700, color: "#FDF6EE", letterSpacing: "0.1em",
                  marginBottom: 16,
                }}>STEP {step.step}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#2C1A0E", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#8B6F5E", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "#F5E9DA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }} className="reveal">
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#C97B63", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Handpicked</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#2C1A0E" }}>
                Featured <span className="gradient-text">Products</span>
              </h2>
            </div>
            <Link href="/diy-charts" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#A85E48", textDecoration: "none" }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loadingProducts ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(201,123,99,0.08)" }}>
                  <div className="skeleton" style={{ height: 220 }} />
                  <div style={{ padding: 20 }}>
                    <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
                    <div className="skeleton" style={{ height: 14, marginBottom: 16 }} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="skeleton" style={{ height: 24, width: 70 }} />
                      <div className="skeleton" style={{ height: 36, width: 90, borderRadius: 12 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            /* Empty state */
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎨</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#2C1A0E", marginBottom: 8 }}>Products Coming Soon</h3>
              <p style={{ color: "#8B6F5E", marginBottom: 24 }}>Our catalog is being curated. Check back soon!</p>
              <Link href="/custom-models" className="btn-primary">Start a Custom Request</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── TRUST / TESTIMONIALS ────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, #FDF6EE 0%, #F5E9DA 50%, #EDD9C5 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Stats row */}
          <div className="reveal" style={{
            display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
            marginBottom: 72,
          }}>
            {[
              { num: "500+", label: "Projects Delivered", icon: "🎉" },
              { num: "98%", label: "Happy Customers", icon: "❤️" },
              { num: "48h", label: "Average Delivery", icon: "⚡" },
              { num: "5★", label: "Average Rating", icon: "⭐" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#A85E48", margin: 0 }}>{stat.num}</p>
                <p style={{ fontSize: 13, color: "#8B6F5E", margin: "4px 0 0" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: "#2C1A0E" }}>
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="reveal glass-card" style={{ padding: 28, borderRadius: 22 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p style={{ fontSize: 14, color: "#5C3D2E", lineHeight: 1.65, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "linear-gradient(135deg, #C97B63, #D4906E)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#FDF6EE", fontWeight: 700, fontSize: 14,
                  }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "#2C1A0E", margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#B89080", margin: "2px 0 0" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "#F5E9DA" }}>
        <div className="reveal" style={{
          maxWidth: 780, margin: "0 auto", textAlign: "center",
          padding: "72px 48px", borderRadius: 32,
          background: "linear-gradient(135deg, #F5E9DA, #EDD9C5, #EDD9C5)",
          border: "1px solid rgba(201,123,99,0.15)",
          boxShadow: "0 20px 64px rgba(201,123,99,0.12)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decoration */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,196,168,0.3), transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,124,0.25), transparent)", pointerEvents: "none" }} />

          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#2C1A0E", marginBottom: 16 }}>
            Turn Your Idea Into Reality
          </h2>
          <p style={{ fontSize: 16, color: "#6B4C3B", lineHeight: 1.7, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Whether it's a school project, a custom creation, or a 3D printed prototype — we're here to make it happen.
          </p>

          {/* Checklist */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {["Free Consultation", "Fast Delivery", "Quality Guaranteed"].map((point) => (
              <div key={point} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={16} color="#C97B63" />
                <span style={{ fontSize: 14, color: "#5C3D2E", fontWeight: 500 }}>{point}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/custom-models" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link href="/diy-charts" className="btn-secondary" style={{ fontSize: 15, padding: "14px 32px" }}>
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes blobFloat { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-20px) scale(1.05); } 66% { transform: translate(-15px,15px) scale(0.97); } }
        @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes scrollDot { 0% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(12px); } }
      `}</style>
    </div>
  );
}
