"use client";
import Link from "next/link";
import { Mail, MapPin, Phone, Instagram, Twitter, Youtube } from "lucide-react";

const shopLinks = [
  { label: "DIY Charts", href: "/diy-charts" },
  { label: "DIY Models", href: "/diy-models" },
  { label: "Custom Clothes", href: "/custom-clothes" },
  { label: "Cart", href: "/cart" },
];
const serviceLinks = [
  { label: "3D Printing", href: "/3d-printing" },
  { label: "Custom Models", href: "/custom-models" },
];
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "#EAD8C0",
      borderTop: "1px solid rgba(62,47,47,0.10)",
      padding: "64px 24px 32px",
    }}>
      <style>{`
        .footer-link {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #7A6060;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #C97B63; }
        .social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(62,47,47,0.07);
          border: 1px solid rgba(62,47,47,0.12);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-btn:hover { background: #C97B63; transform: translateY(-2px); }
        .social-btn:hover svg { stroke: white; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 40, marginBottom: 52 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: "white" }}>CV</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#3E2F2F" }}>Craft Verse</span>
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#7A6060", lineHeight: 1.7, maxWidth: 210, marginBottom: 20 }}>
              A creative studio where imagination becomes something you can hold.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="social-btn"><Icon size={15} color="#7A6060" /></a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 16 }}>Shop</h4>
            {shopLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 16 }}>Services</h4>
            {serviceLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 16 }}>Company</h4>
            {companyLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 16 }}>Contact</h4>
            {[
              { Icon: Mail,    text: "hello@craftverse.in" },
              { Icon: Phone,   text: "+91 98765 43210" },
              { Icon: MapPin,  text: "Rajkot, Gujarat, India" },
            ].map(({ Icon, text }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                <Icon size={13} color="#C97B63" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#7A6060", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid rgba(62,47,47,0.10)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#A89080" }}>
            © 2025 Craft Verse. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#C97B63", fontStyle: "italic" }}>
            Made with care &amp; creativity ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
