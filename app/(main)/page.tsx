"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Package, Sparkles, Printer, Shirt, CheckCircle2, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import HeroCanvas from "@/components/ui/HeroCanvas";
import { Product } from "@/types";

const categories = [
  { icon: BarChart3, label: "DIY Charts",     desc: "Hand-crafted charts for school & college projects, beautifully made",         href: "/diy-charts",     symbol: "📊" },
  { icon: Package,   label: "DIY Models",     desc: "Working 3D models for science & geography — built with care",                 href: "/diy-models",     symbol: "📦" },
  { icon: Sparkles,  label: "Custom Projects",desc: "Your idea, our hands. We build it from scratch, just for you",               href: "/custom-models",  symbol: "✦"  },
  { icon: Printer,   label: "3D Printing",    desc: "Upload your design — we print it with precision and craft",                  href: "/3d-printing",    symbol: "🖨" },
  { icon: Shirt,     label: "Custom Clothes", desc: "Wearable art — apparel designed exactly as you imagine it",                  href: "/custom-clothes", symbol: "✂"  },
];

const steps = [
  { num:"01", title:"Choose or Request", desc:"Browse our catalog or tell us your idea. We love bringing fresh visions to life.",  icon:"✦" },
  { num:"02", title:"We Craft It",       desc:"Our makers work with real materials and real attention to every detail.",             icon:"◈" },
  { num:"03", title:"Delivered to You", desc:"Packaged with care and delivered right to your doorstep.",                           icon:"◎" },
];

const testimonials = [
  { name:"Priya Sharma",  role:"Student, Class 12",        text:"The science model was absolutely stunning. My teacher was amazed — and so was I. Got an A+ and it still sits on my desk.", initials:"PS", stars:5 },
  { name:"Rahul Mehta",   role:"Engineering Student",      text:"3D printing service delivered exactly what I envisioned. The quality felt professional, not student-project level at all.",   initials:"RM", stars:5 },
  { name:"Ananya Singh",  role:"Project Coordinator",      text:"Ordered charts for our school exhibition. Premium quality, on time, and the team was so helpful throughout.",               initials:"AS", stars:5 },
];

// Hand-drawn SVG decorations
function ScribbleLine({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" style={{ width:200, height:20, ...style }}>
      <path d="M2 12 C30 4, 70 18, 100 10 C130 2, 165 16, 198 10" stroke="#C97B63" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}
function DotGrid({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" style={{ width:80, height:80, opacity:0.15, ...style }}>
      {[0,1,2,3].map(r=>[0,1,2,3].map(c=>(
        <circle key={`${r}-${c}`} cx={10+c*20} cy={10+r*20} r="2" fill="#C97B63"/>
      )))}
    </svg>
  );
}
function SketchCircle({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" style={{ width:120, height:120, ...style }}>
      <path d="M60 10 C90 8, 112 30, 110 60 C108 90, 86 112, 60 110 C34 108, 10 88, 10 60 C10 32, 32 12, 60 10Z"
        stroke="#C97B63" strokeWidth="1.5" strokeDasharray="4 3" fill="none" opacity="0.2"/>
    </svg>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
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
    // ── FULL PAGE wrapper — WebGL canvas spans entire page ──────────────
    <div style={{ position: "relative", background: "#F5E9DA" }}>

      {/* ══ FIXED FULL-PAGE WEBGL CANVAS ══════════════════════════════ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <HeroCanvas fullPage />
      </div>

      {/* ══ ALL CONTENT sits above canvas ══════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          paddingTop: 80,
        }}>
          {/* SVG overlays */}
          <DotGrid style={{ position:"absolute", top:"12%",  left:"6%",  pointerEvents:"none", zIndex:2 }} />
          <DotGrid style={{ position:"absolute", bottom:"14%",right:"8%",  pointerEvents:"none", zIndex:2 }} />
          <SketchCircle style={{ position:"absolute", top:"8%", right:"12%", pointerEvents:"none", zIndex:2 }} />
          <SketchCircle style={{ position:"absolute", bottom:"20%", left:"3%", pointerEvents:"none", width:80, height:80, zIndex:2 }} />

          {/* Hero content — glassmorphism card */}
          <div style={{ position:"relative", zIndex:3, textAlign:"center", maxWidth:820, padding:"0 28px" }}>
            <div style={{
              background:"rgba(250,243,232,0.52)",
              backdropFilter:"blur(22px)",
              WebkitBackdropFilter:"blur(22px)",
              border:"1px solid rgba(201,123,99,0.2)",
              borderRadius:32,
              padding:"64px 56px 56px",
              boxShadow:"0 24px 80px rgba(62,47,47,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}>
              <div className="badge" style={{ marginBottom:28, animation:"fadeUp 0.6s ease forwards" }}>
                <span>✦</span> India&apos;s Creative Studio
              </div>

              <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(40px,7vw,76px)", fontWeight:700, lineHeight:1.13, color:"#3E2F2F", marginBottom:12, animation:"fadeUp 0.6s ease 0.1s both" }}>
                Craft Verse –
              </h1>
              <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(38px,6.5vw,72px)", fontWeight:400, fontStyle:"italic", lineHeight:1.15, color:"#C97B63", marginBottom:24, animation:"fadeUp 0.6s ease 0.18s both" }}>
                Where Creativity Comes to Life
              </h1>

              <ScribbleLine style={{ margin:"0 auto 28px", animation:"fadeUp 0.6s ease 0.25s both" }} />

              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(15px,2vw,18px)", color:"#7A6060", lineHeight:1.75, marginBottom:40, maxWidth:560, margin:"0 auto 40px", animation:"fadeUp 0.6s ease 0.3s both" }}>
                DIY Kits · School Projects · Custom Creations · 3D Printing<br/>
                <em>Turn your imagination into something real.</em>
              </p>

              <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", animation:"fadeUp 0.6s ease 0.4s both" }}>
                <Link href="/diy-charts" className="btn-primary" style={{ fontSize:15, padding:"14px 32px", borderRadius:50 }}>
                  Shop Now <ArrowRight size={16}/>
                </Link>
                <Link href="/custom-models" className="btn-secondary" style={{ fontSize:15, padding:"14px 32px", borderRadius:50 }}>
                  Start Custom Project ✦
                </Link>
              </div>

              {/* Stats row inside hero glass */}
              <div style={{ display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap", marginTop:48, paddingTop:36, borderTop:"1px solid rgba(201,123,99,0.15)", animation:"fadeUp 0.6s ease 0.5s both" }}>
                {[
                  { value:"500+", label:"Projects Delivered" },
                  { value:"4.9★", label:"Average Rating" },
                  { value:"48h",  label:"Avg. Turnaround" },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign:"center" }}>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#C97B63", margin:0 }}>{stat.value}</p>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", margin:"4px 0 0" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", zIndex:3, animation:"bounce 2s ease-in-out infinite" }}>
            <div style={{ width:24, height:40, borderRadius:12, border:"2px solid rgba(201,123,99,0.35)", display:"flex", justifyContent:"center", paddingTop:6 }}>
              <div style={{ width:4, height:8, borderRadius:2, background:"#C97B63", animation:"scrollDot 1.5s ease-in-out infinite" }}/>
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ──────────────────────────────────────────── */}
        <section style={{ padding:"100px 28px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:56 }} className="reveal">
              <div className="badge" style={{ marginBottom:16 }}>What We Offer</div>
              <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:8 }}>Everything You Need to Create</h2>
              <div className="divider"/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(215px,1fr))", gap:20 }}>
              {categories.map((cat, i) => (
                <Link key={cat.label} href={cat.href} style={{ textDecoration:"none" }}>
                  <div className={`reveal glass-card cv-card reveal-d${i+1}`} style={{
                    padding:"28px 24px", height:"100%", cursor:"pointer",
                    position:"relative", overflow:"hidden",
                  }}>
                    <div style={{ position:"absolute", top:14, right:16, fontFamily:"'Playfair Display',serif", fontSize:22, color:"#C97B63", opacity:0.3 }}>{cat.symbol}</div>
                    <div style={{ width:44, height:44, borderRadius:12, background:"rgba(201,123,99,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                      <cat.icon size={20} color="#C97B63"/>
                    </div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:600, color:"#3E2F2F", marginBottom:8 }}>{cat.label}</h3>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12.5, color:"#7A6060", lineHeight:1.6, marginBottom:18 }}>{cat.desc}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:4, color:"#C97B63", fontSize:12, fontWeight:600, fontFamily:"'Poppins',sans-serif" }}>
                      Explore <ArrowRight size={12}/>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────── */}
        <section style={{ padding:"100px 28px", position:"relative", overflow:"hidden" }}>
          <DotGrid style={{ position:"absolute", top:"10%", right:"5%", pointerEvents:"none" }}/>

          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:60 }} className="reveal">
              <div className="badge" style={{ marginBottom:16 }}>Simple Process</div>
              <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:700, marginBottom:8 }}>How It Works</h2>
              <div className="divider"/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(270px,1fr))", gap:32 }}>
              {steps.map((step, i) => (
                <div key={i} className={`reveal glass-card cv-card reveal-d${i+1}`} style={{ padding:"36px 32px", textAlign:"center", position:"relative" }}>
                  <div style={{ position:"absolute", top:18, right:20, fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:700, color:"#C97B63", opacity:0.4, letterSpacing:"0.05em" }}>{step.num}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, color:"#C97B63", marginBottom:18, lineHeight:1 }}>{step.icon}</div>
                  <h3 style={{ fontSize:19, fontWeight:600, color:"#3E2F2F", marginBottom:12 }}>{step.title}</h3>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:"#7A6060", lineHeight:1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
        <section style={{ padding:"100px 28px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }} className="reveal">
              <div>
                <div className="badge" style={{ marginBottom:14 }}>Handpicked</div>
                <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:700 }}>Featured Work</h2>
                <div style={{ width:48, height:3, background:"#C97B63", borderRadius:2, marginTop:10 }}/>
              </div>
              <Link href="/diy-charts" style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:500, color:"#C97B63", textDecoration:"none", fontFamily:"'Poppins',sans-serif" }}>
                View All <ArrowRight size={14}/>
              </Link>
            </div>

            {loadingProducts ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px,1fr))", gap:24 }}>
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="glass-card" style={{ borderRadius:20, overflow:"hidden" }}>
                    <div className="skeleton" style={{ height:220 }}/>
                    <div style={{ padding:20 }}>
                      <div className="skeleton" style={{ height:16, width:"70%", marginBottom:10 }}/>
                      <div className="skeleton" style={{ height:13, marginBottom:16 }}/>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        <div className="skeleton" style={{ height:22, width:60 }}/>
                        <div className="skeleton" style={{ height:34, width:85, borderRadius:50 }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px,1fr))", gap:24 }}>
                {products.map(p => <ProductCard key={p._id} product={p}/>)}
              </div>
            ) : (
              <div className="glass-card" style={{ textAlign:"center", padding:"80px 24px" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:48, color:"#C97B63", marginBottom:16 }}>✦</div>
                <h3 style={{ fontSize:22, color:"#3E2F2F", marginBottom:8 }}>Products Coming Soon</h3>
                <p style={{ fontFamily:"'Poppins',sans-serif", color:"#7A6060", marginBottom:28, fontSize:14 }}>Our catalog is being curated. Check back soon!</p>
                <Link href="/custom-models" className="btn-primary">Start a Custom Request</Link>
              </div>
            )}
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────── */}
        <section style={{ padding:"100px 28px", position:"relative", overflow:"hidden" }}>
          <SketchCircle style={{ position:"absolute", bottom:"5%", left:"2%", width:100, height:100, pointerEvents:"none" }}/>

          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            {/* Stats */}
            <div className="reveal" style={{ display:"flex", justifyContent:"center", gap:56, flexWrap:"wrap", marginBottom:72 }}>
              {[
                { num:"500+", label:"Projects Delivered" },
                { num:"98%",  label:"Happy Customers" },
                { num:"48h",  label:"Average Delivery" },
                { num:"4.9 ★",label:"Average Rating" },
              ].map((stat,i) => (
                <div key={stat.label} className={`glass-card stat-card reveal-d${i+1}`} style={{ textAlign:"center", padding:"20px 28px", minWidth:130 }}>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"#C97B63", margin:0 }}>{stat.num}</p>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#7A6060", marginTop:4 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign:"center", marginBottom:48 }} className="reveal">
              <div className="badge" style={{ marginBottom:16 }}>Kind Words</div>
              <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:700 }}>What Our Customers Say</h2>
              <div className="divider"/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(270px,1fr))", gap:24 }}>
              {testimonials.map((t, i) => (
                <div key={i} className={`reveal glass-card testimonial-card reveal-d${i+1}`} style={{ padding:"30px 28px" }}>
                  {/* Stars */}
                  <div style={{ display:"flex", gap:3, marginBottom:12 }}>
                    {[...Array(t.stars)].map((_,j) => <Star key={j} size={13} fill="#C97B63" color="#C97B63"/>)}
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:48, color:"#C97B63", lineHeight:1, marginBottom:12, opacity:0.3 }}>"</div>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:"#3E2F2F", lineHeight:1.75, marginBottom:24, fontStyle:"italic" }}>{t.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:16, borderTop:"1px solid rgba(62,47,47,0.08)" }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#C97B63,#A85C45)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:13, flexShrink:0 }}>{t.initials}</div>
                    <div>
                      <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:13.5, color:"#3E2F2F", margin:0 }}>{t.name}</p>
                      <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11.5, color:"#A89080", marginTop:2 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign:"center", marginTop:40 }} className="reveal">
              <Link href="/reviews" className="btn-secondary" style={{ borderRadius:50 }}>
                Read All Reviews <ArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section style={{ padding:"100px 28px" }}>
          <div className="reveal glass-card" style={{
            maxWidth:740, margin:"0 auto", textAlign:"center",
            padding:"72px 48px",
            position:"relative", overflow:"hidden",
          }}>
            <DotGrid style={{ position:"absolute", top:12, right:12, width:60, height:60 }}/>
            <DotGrid style={{ position:"absolute", bottom:12, left:12, width:60, height:60 }}/>

            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:40, color:"#C97B63", marginBottom:20, opacity:0.7 }}>✦</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:700, color:"#3E2F2F", marginBottom:16, lineHeight:1.25 }}>
              Turn Your Idea Into Something Real
            </h2>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:15, color:"#7A6060", lineHeight:1.8, maxWidth:480, margin:"0 auto 36px" }}>
              Whether it&apos;s a school project, a custom creation, or a 3D print — we&apos;re here to make it happen, by hand.
            </p>

            <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
              {["Free Consultation","Fast Delivery","Quality Guaranteed"].map(point => (
                <div key={point} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <CheckCircle2 size={14} color="#C97B63"/>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:"#7A6060", fontWeight:500 }}>{point}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/custom-models" className="btn-primary" style={{ borderRadius:50 }}>Start Your Project <ArrowRight size={15}/></Link>
              <Link href="/diy-charts"    className="btn-secondary" style={{ borderRadius:50 }}>Browse Catalog</Link>
            </div>
          </div>
        </section>
      </div>{/* end content wrapper */}

      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce    { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes scrollDot { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(12px)} }
      `}</style>
    </div>
  );
}
