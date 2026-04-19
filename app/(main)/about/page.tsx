import Link from "next/link";
export const dynamic = 'force-dynamic';
import { ArrowRight } from "lucide-react";

const values = [
  { symbol: "✦", title: "Quality First", desc: "Every product is crafted with the highest standards and real attention to detail." },
  { symbol: "◈", title: "Creative Freedom", desc: "We believe everyone has the right to bring their creative vision to life." },
  { symbol: "◎", title: "Student Focused", desc: "Built for students, by people who understand the pressure of projects and deadlines." },
  { symbol: "→", title: "Fast Delivery", desc: "We respect your deadlines. Most orders delivered within 48-72 hours." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      {/* Hero */}
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "80px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 20 }}>Our Story</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5vw,54px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 20, lineHeight: 1.2 }}>
            We're Building the Future of<br />
            <span style={{ color: "#C97B63", fontStyle: "italic" }}>Creative Education</span>
          </h1>
          <div className="divider" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, color: "#7A6060", lineHeight: 1.75, marginTop: 24 }}>
            Craft Verse was born from a simple frustration: students spend countless hours stressing over school projects — while the real magic of hands-on learning gets lost. We're here to change that.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        {/* Mission + Vision */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: 80 }}>
          {[
            { title: "Our Mission", symbol: "✦", text: "To make creative project-making accessible, affordable, and enjoyable for every student and creator in India. We provide premium DIY kits, custom models, and creative services so anyone can build something remarkable — without the stress." },
            { title: "Our Vision", symbol: "◎", text: "A future where every school project is a source of pride, not panic. Where creativity is celebrated and hands-on learning is the norm. Craft Verse aims to be India's #1 creative platform for students and makers." },
          ].map((item) => (
            <div key={item.title} className="paper-card" style={{ padding: "36px" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, color: "#C97B63", marginBottom: 16, opacity: 0.6 }}>{item.symbol}</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#3E2F2F", marginBottom: 14 }}>{item.title}</h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#7A6060", lineHeight: 1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="badge" style={{ marginBottom: 14 }}>What We Stand For</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 700, color: "#3E2F2F" }}>Our Values</h2>
          <div className="divider" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 80 }}>
          {values.map((v) => (
            <div key={v.title} style={{ padding: "28px", borderRadius: 18, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C97B63", marginBottom: 12, opacity: 0.5 }}>{v.symbol}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 600, color: "#3E2F2F", marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "56px 40px", borderRadius: 24, background: "#EAD8C0", border: "1px solid rgba(62,47,47,0.10)" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, color: "#C97B63", opacity: 0.4, marginBottom: 16 }}>✦</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>Ready to create something amazing?</h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#7A6060", marginBottom: 28 }}>Browse our catalog or start a custom project today.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/diy-charts" className="btn-primary">Shop Now <ArrowRight size={15} /></Link>
            <Link href="/founder" className="btn-secondary">Meet the Founder</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
