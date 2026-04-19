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
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #F5E9DA 0%, #EDD9C5 50%, #EDD9C5 100%)", padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#C97B63", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#2C1A0E", marginBottom: 20, lineHeight: 1.2 }}>
            We're Building the Future of<br />
            <span style={{ background: "linear-gradient(135deg, #A85E48, #D4906E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Creative Education
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "#6B4C3B", lineHeight: 1.7 }}>
            Craft Verse was born from a simple frustration: students spend countless hours and stress over school projects — while the real magic of hands-on learning gets lost. We're here to change that.
          </p>
        </div>
      </div>

      {/* Mission + Vision */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 80 }}>
          {[
            { title: "Our Mission", emoji: "🎯", color: "#C97B63", text: "To make creative project-making accessible, affordable, and enjoyable for every student and creator in India. We provide premium DIY kits, custom models, and creative services so anyone can build something remarkable — without the stress." },
            { title: "Our Vision", emoji: "🔭", color: "#D4906E", text: "A future where every school project is a source of pride, not panic. Where creativity is celebrated and hands-on learning is the norm. Craft Verse aims to be India's #1 creative platform for students and makers." },
          ].map((item) => (
            <div key={item.title} className="glass-card" style={{ padding: "36px", borderRadius: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.emoji}</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#2C1A0E", marginBottom: 14 }}>{item.title}</h2>
              <p style={{ fontSize: 15, color: "#6B4C3B", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#2C1A0E" }}>What We Stand For</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 80 }}>
          {values.map((v) => (
            <div key={v.title} style={{ padding: "28px", borderRadius: 20, background: "linear-gradient(135deg, rgba(253,246,238,0.8), rgba(240,249,255,0.8))", border: "1px solid rgba(201,123,99,0.1)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#2C1A0E", marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "#8B6F5E", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "56px 24px", borderRadius: 28, background: "linear-gradient(135deg, #F5E9DA, #EDD9C5)", border: "1px solid rgba(201,123,99,0.15)" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#2C1A0E", marginBottom: 12 }}>
            Ready to create something amazing?
          </h2>
          <p style={{ fontSize: 16, color: "#6B4C3B", marginBottom: 28 }}>Browse our catalog or start a custom project today.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/diy-charts" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link href="/founder" className="btn-secondary">Meet the Founder</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
