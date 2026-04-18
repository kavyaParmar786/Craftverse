"use client";
import Link from "next/link";
import { Share2, Link2, Mail, MapPin, Phone } from "lucide-react";

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
      background: "linear-gradient(135deg,#f5f3ff 0%,#e0f2fe 60%,#fff1f2 100%)",
      borderTop: "1px solid rgba(139,92,246,0.1)",
      padding: "64px 24px 32px",
    }}>
      <style>{`
        .footer-link { display:block;font-size:14px;color:#6b7280;text-decoration:none;margin-bottom:10px;transition:color 0.2s; }
        .footer-link:hover { color:#8b5cf6; }
        .social-btn { width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.7);border:1px solid rgba(139,92,246,0.15);display:flex;align-items:center;justify-content:center;transition:all 0.2s;text-decoration:none; }
        .social-btn:hover { background:rgba(139,92,246,0.1);transform:translateY(-2px); }
      `}</style>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#8b5cf6,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:"white" }}>CV</span>
              </div>
              <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:18,color:"#1a1a2e" }}>Craft Verse</span>
            </div>
            <p style={{ fontSize:14,color:"#6b7280",lineHeight:1.6,maxWidth:220,marginBottom:20 }}>
              Where creativity meets craftsmanship. Build, create, and explore your imagination.
            </p>
            <div style={{ display:"flex",gap:12 }}>
              {[Share2,Link2,Mail].map((Icon,i)=>(
                <a key={i} href="#" className="social-btn"><Icon size={16} color="#8b5cf6"/></a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#1a1a2e",marginBottom:16 }}>Shop</h4>
            {shopLinks.map(l=><Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#1a1a2e",marginBottom:16 }}>Services</h4>
            {serviceLinks.map(l=><Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#1a1a2e",marginBottom:16 }}>Company</h4>
            {companyLinks.map(l=><Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#1a1a2e",marginBottom:16 }}>Contact</h4>
            {[
              { Icon:Mail,   text:"hello@craftverse.in" },
              { Icon:Phone,  text:"+91 98765 43210" },
              { Icon:MapPin, text:"Rajkot, Gujarat, India" },
            ].map(({Icon,text},i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
                <Icon size={14} color="#8b5cf6"/><span style={{ fontSize:13,color:"#6b7280" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(139,92,246,0.12)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <p style={{ fontSize:13,color:"#9ca3af" }}>© 2025 Craft Verse. All rights reserved.</p>
          <p style={{ fontSize:13,color:"#c4b5fd" }}>Made with ✦ creativity</p>
        </div>
      </div>
    </footer>
  );
}
