"use client";
import Link from "next/link";
import { Share2, Link2, Mail, MapPin, Phone } from "lucide-react";

const shopLinks    = [{ label:"DIY Charts",href:"/diy-charts" },{ label:"DIY Models",href:"/diy-models" },{ label:"Custom Clothes",href:"/custom-clothes" },{ label:"Cart",href:"/cart" }];
const serviceLinks = [{ label:"3D Printing",href:"/3d-printing" },{ label:"Custom Models",href:"/custom-models" }];
const companyLinks = [{ label:"About Us",href:"/about" },{ label:"Founder",href:"/founder" },{ label:"News",href:"/news" },{ label:"FAQ",href:"/faq" }];

export default function Footer() {
  return (
    <footer style={{ background:"linear-gradient(135deg,#EDD9C5 0%,#F5E9DA 50%,#EDD9C5 100%)", borderTop:"1px solid rgba(201,123,99,0.15)", padding:"64px 24px 32px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#C97B63,#A85E48)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:"#FDF6EE" }}>CV</span>
              </div>
              <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:18,color:"#2C1A0E" }}>Craft Verse</span>
            </div>
            <p style={{ fontSize:14,color:"#8B6F5E",lineHeight:1.6,maxWidth:220,marginBottom:20 }}>Where creativity meets craftsmanship. Build, create, and explore your imagination.</p>
            <div style={{ display:"flex",gap:12 }}>
              {[Share2,Link2,Mail].map((Icon,i) => (
                <a key={i} href="#" className="social-btn"><Icon size={16} color="#C97B63"/></a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#2C1A0E",marginBottom:16 }}>Shop</h4>
            {shopLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#2C1A0E",marginBottom:16 }}>Services</h4>
            {serviceLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#2C1A0E",marginBottom:16 }}>Company</h4>
            {companyLinks.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
          </div>
          <div>
            <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:"#2C1A0E",marginBottom:16 }}>Contact</h4>
            {[
              { Icon:Mail,   text:"hello@craftverse.in" },
              { Icon:Phone,  text:"+91 98765 43210" },
              { Icon:MapPin, text:"Rajkot, Gujarat, India" },
            ].map(({Icon,text},i) => (
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
                <Icon size={14} color="#C97B63"/><span style={{ fontSize:13,color:"#8B6F5E" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(201,123,99,0.15)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <p style={{ fontSize:13,color:"#B89080" }}>© 2025 Craft Verse. All rights reserved.</p>
          <p style={{ fontSize:13,color:"#C97B63" }}>Made with ✦ creativity</p>
        </div>
      </div>
    </footer>
  );
}
