import Link from "next/link";
export const dynamic = 'force-dynamic';
import { ArrowRight, ExternalLink, Share2, Mail } from "lucide-react";

export default function FounderPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      <div style={{ background: "linear-gradient(135deg, #EDD9C5 0%, #EDD9C5 100%)", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr", gap: 60, alignItems: "center" }}>
          {/* Avatar */}
          <div>
            <div style={{
              width: 200, height: 200, borderRadius: 40,
              background: "linear-gradient(135deg, #C97B63, #D4906E, #C97B63)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 20px 60px rgba(201,123,99,0.3)",
              position: "relative",
            }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 72, fontWeight: 700, color: "#FDF6EE" }}>CV</span>
              {/* Badge */}
              <div style={{ position: "absolute", bottom: -12, right: -12, padding: "8px 14px", borderRadius: 12, background: "#FDF6EE", boxShadow: "0 4px 16px rgba(201,123,99,0.2)", fontSize: 11, fontWeight: 700, color: "#A85E48" }}>
                🚀 Founder & CEO
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#C97B63", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Meet the Founder</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#2C1A0E", marginBottom: 6 }}>
              Crafted with Passion
            </h1>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#C97B63", fontWeight: 500, marginBottom: 20 }}>Founder, Craft Verse</h2>
            <p style={{ fontSize: 16, color: "#6B4C3B", lineHeight: 1.75, marginBottom: 24, maxWidth: 580 }}>
              Craft Verse started as a personal project — frustrated by how difficult and expensive it was to find quality project materials for school. What began as helping classmates turned into a mission to democratise creative education for every student in India.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[{ Icon: ExternalLink, label: "LinkedIn", color: "#0077b5" }, { Icon: Share2, label: "Instagram", color: "#e1306c" }, { Icon: Mail, label: "Email", color: "#C97B63" }].map(({ Icon, label, color }) => (
                <a key={label} href="#" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,123,99,0.15)", textDecoration: "none", fontSize: 13, fontWeight: 500, color: "#5C3D2E" }}>
                  <Icon size={14} color={color} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#2C1A0E", marginBottom: 32 }}>The Story Behind Craft Verse</h2>

        {[
          { year: "2022", title: "The Problem", text: "As a student, I watched classmates panic the night before science fairs. Either they couldn't find materials, couldn't afford them, or had no idea how to make a quality model. I started helping them — and realized how massive this gap was across India." },
          { year: "2023", title: "The Experiment", text: "I started taking custom project orders from my school, then word spread. Soon I was handling 15-20 orders a week from different schools. Every project taught me something about quality, delivery, and what students truly need." },
          { year: "2024", title: "Building Craft Verse", text: "I decided to build this into a proper platform — a place where any student anywhere could order premium project materials, custom models, or unique creative services. Craft Verse was officially born." },
          { year: "2025", title: "Today", text: "We've delivered 500+ projects across Gujarat. Our team of craftsmen, designers, and makers is growing. Our mission: to make every student feel proud of what they create — not stressed." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 28, marginBottom: 40 }}>
            <div style={{ flexShrink: 0, width: 60, paddingTop: 4 }}>
              <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 8, background: "linear-gradient(135deg, #C97B63, #D4906E)", fontSize: 12, fontWeight: 700, color: "#FDF6EE" }}>{item.year}</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#2C1A0E", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#6B4C3B", lineHeight: 1.75 }}>{item.text}</p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 56, padding: "48px", borderRadius: 28, background: "linear-gradient(135deg, #F5E9DA, #EDD9C5)", border: "1px solid rgba(201,123,99,0.12)" }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#2C1A0E", marginBottom: 12 }}>Want to work together?</h3>
          <p style={{ color: "#8B6F5E", marginBottom: 24 }}>Whether you're a school, college, or creative individual — we'd love to hear from you.</p>
          <Link href="/custom-models" className="btn-primary">Start a Project <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
