import Link from "next/link";
export const dynamic = 'force-dynamic';
import { ArrowRight } from "lucide-react";

const values = [
  { icon: "🎯", title: "Quality First", desc: "Every product is crafted with the highest standards of quality and attention to detail." },
  { icon: "💡", title: "Creative Freedom", desc: "We believe everyone has the right to bring their creative vision to life." },
  { icon: "🤝", title: "Student Focused", desc: "Built for students, by people who understand the pressure of projects and deadlines." },
  { icon: "🚀", title: "Fast Delivery", desc: "We respect your deadlines. Most orders are delivered within 48-72 hours." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #ede9fe 0%, #bae6fd 50%, #fecdd3 100%)", padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#8b5cf6", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 20, lineHeight: 1.2 }}>
            We're Building the Future of<br />
            <span style={{ background: "linear-gradient(135deg, #7c3aed, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Creative Education
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.7 }}>
            Craft Verse was born from a simple frustration: students spend countless hours and stress over school projects — while the real magic of hands-on learning gets lost. We're here to change that.
          </p>
        </div>
      </div>

      {/* Mission + Vision */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 80 }}>
          {[
            { title: "Our Mission", emoji: "🎯", color: "#8b5cf6", text: "To make creative project-making accessible, affordable, and enjoyable for every student and creator in India. We provide premium DIY kits, custom models, and creative services so anyone can build something remarkable — without the stress." },
            { title: "Our Vision", emoji: "🔭", color: "#0ea5e9", text: "A future where every school project is a source of pride, not panic. Where creativity is celebrated and hands-on learning is the norm. Craft Verse aims to be India's #1 creative platform for students and makers." },
          ].map((item) => (
            <div key={item.title} className="glass-card" style={{ padding: "36px", borderRadius: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.emoji}</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>{item.title}</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#1a1a2e" }}>What We Stand For</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 80 }}>
          {values.map((v) => (
            <div key={v.title} style={{ padding: "28px", borderRadius: 20, background: "linear-gradient(135deg, rgba(245,243,255,0.8), rgba(240,249,255,0.8))", border: "1px solid rgba(139,92,246,0.1)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#1a1a2e", marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "56px 24px", borderRadius: 28, background: "linear-gradient(135deg, #ede9fe, #bae6fd)", border: "1px solid rgba(139,92,246,0.15)" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>
            Ready to create something amazing?
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 28 }}>Browse our catalog or start a custom project today.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/diy-charts" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link href="/founder" className="btn-secondary">Meet the Founder</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
