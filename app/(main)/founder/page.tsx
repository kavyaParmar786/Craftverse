import Link from "next/link";
export const dynamic = 'force-dynamic';
import { ArrowRight, ExternalLink, Share2, Mail } from "lucide-react";

const timeline = [
  { year: "2022", title: "The Problem", text: "As a student, I watched classmates panic the night before science fairs. Either they couldn't find materials, couldn't afford them, or had no idea how to make a quality model. I started helping them — and realised how massive this gap was across India." },
  { year: "2023", title: "The Experiment", text: "I started taking custom project orders from my school, then word spread. Soon I was handling 15-20 orders a week from different schools. Every project taught me something about quality, delivery, and what students truly need." },
  { year: "2024", title: "Building Craft Verse", text: "I decided to build this into a proper platform — a place where any student anywhere could order premium project materials, custom models, or unique creative services. Craft Verse was officially born." },
  { year: "2025", title: "Today", text: "We've delivered 500+ projects across Gujarat. Our team of craftsmen, designers, and makers is growing. Our mission: to make every student feel proud of what they create — not stressed." },
];

export default function FounderPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      {/* Hero */}
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ width: 180, height: 180, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(201,123,99,0.3)", position: "relative" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 64, fontWeight: 700, color: "white", opacity: 0.9 }}>CV</span>
              <div style={{ position: "absolute", bottom: -10, right: -10, padding: "6px 12px", borderRadius: 10, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.10)", boxShadow: "0 4px 14px rgba(62,47,47,0.10)", fontSize: 11, fontWeight: 600, color: "#3E2F2F", fontFamily: "'Poppins',sans-serif" }}>
                ✦ Founder & CEO
              </div>
            </div>
          </div>
          <div>
            <div className="badge" style={{ marginBottom: 14 }}>Meet the Founder</div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 6 }}>Crafted with Passion</h1>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "#C97B63", fontWeight: 400, fontStyle: "italic", marginBottom: 20 }}>Founder, Craft Verse</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#7A6060", lineHeight: 1.8, marginBottom: 24, maxWidth: 560 }}>
              Craft Verse started as a personal project — frustrated by how difficult and expensive it was to find quality project materials for school. What began as helping classmates turned into a mission to democratise creative education for every student in India.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[{ Icon: ExternalLink, label: "LinkedIn" }, { Icon: Share2, label: "Instagram" }, { Icon: Mail, label: "Email" }].map(({ Icon, label }) => (
                <a key={label} href="#" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 50, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.10)", textDecoration: "none", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 500, color: "#7A6060", transition: "all 0.2s" }}>
                  <Icon size={13} color="#C97B63" /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 52 }}>
          <div className="badge" style={{ marginBottom: 14 }}>The Journey</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#3E2F2F" }}>The Story Behind Craft Verse</h2>
          <div style={{ width: 48, height: 3, background: "#C97B63", borderRadius: 2, marginTop: 12 }} />
        </div>
        {timeline.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 24, marginBottom: 40, paddingBottom: 40, borderBottom: i < timeline.length - 1 ? "1px solid rgba(62,47,47,0.07)" : "none" }}>
            <div style={{ flexShrink: 0 }}>
              <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: 50, background: "#C97B63", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700, color: "white", letterSpacing: "0.04em" }}>{item.year}</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 600, color: "#3E2F2F", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#7A6060", lineHeight: 1.8 }}>{item.text}</p>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", padding: "48px 36px", borderRadius: 22, background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#C97B63", opacity: 0.4, marginBottom: 14 }}>✦</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>Want to work together?</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 24, fontSize: 13 }}>Whether you're a school, college, or creative individual — we'd love to hear from you.</p>
          <Link href="/custom-models" className="btn-primary">Start a Project <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}
