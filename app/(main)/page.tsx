"use client";
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Package, Sparkles, Printer, Shirt, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

/* ─────────────────── DATA ─────────────────── */
const categories = [
  { icon: BarChart3, label: "DIY Charts",      desc: "Hand-crafted charts for school & college projects, beautifully made", href: "/diy-charts",     emoji: "📊", rot: -2 },
  { icon: Package,   label: "DIY Models",      desc: "Working 3D models for science & geography — built with care",         href: "/diy-models",     emoji: "📦", rot:  1 },
  { icon: Sparkles,  label: "Custom Projects", desc: "Your idea, our hands. We build it from scratch, just for you",        href: "/custom-models",  emoji: "✦",  rot: -1 },
  { icon: Printer,   label: "3D Printing",     desc: "Upload your design — we print it with precision and craft",           href: "/3d-printing",    emoji: "🖨",  rot:  2 },
  { icon: Shirt,     label: "Custom Clothes",  desc: "Wearable art — apparel designed exactly as you imagine it",           href: "/custom-clothes", emoji: "✂",  rot: -2 },
];
const steps = [
  { num:"01", title:"Choose or Request", desc:"Browse our catalog or tell us your idea. We love bringing fresh visions to life.", icon:"✦" },
  { num:"02", title:"We Craft It",       desc:"Our makers work with real materials and real attention to every detail.",          icon:"◈" },
  { num:"03", title:"Delivered to You",  desc:"Packaged with care and delivered right to your doorstep.",                        icon:"◎" },
];
const testimonials = [
  { name:"Priya Sharma",  role:"Student, Class 12",     text:"The science model was absolutely stunning. My teacher was amazed — and so was I. Got an A+ and it still sits on my desk.", initials:"PS" },
  { name:"Rahul Mehta",   role:"Engineering Student",   text:"3D printing service delivered exactly what I envisioned. The quality felt professional, not student-project level at all.", initials:"RM" },
  { name:"Ananya Singh",  role:"Project Coordinator",   text:"Ordered charts for our school exhibition. Premium quality, on time, and the team was so helpful throughout.",              initials:"AS" },
];

/* ─────────── CUSTOM CURSOR ─────────── */
function Cursor() {
  const dot   = useRef<HTMLDivElement>(null);
  const ring  = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement[]>([]);
  const pos   = useRef({ x:-200, y:-200 });
  const rPos  = useRef({ x:-200, y:-200 });
  const big   = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    let raf: number;
    const tick = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.11;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.11;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ring.current) {
        const s = big.current ? 1.7 : 1;
        ring.current.style.transform = `translate(${rPos.current.x}px,${rPos.current.y}px) translate(-50%,-50%) scale(${s})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const grow  = () => { big.current = true; };
    const shrink= () => { big.current = false; };
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dot} style={{
        position:"fixed", top:0, left:0, zIndex:99999, pointerEvents:"none",
        width:8, height:8, borderRadius:"50%", background:"#C97B63",
        mixBlendMode:"multiply", transition:"background 0.2s",
      }}/>
      {/* Ring */}
      <div ref={ring} style={{
        position:"fixed", top:0, left:0, zIndex:99998, pointerEvents:"none",
        width:38, height:38, borderRadius:"50%",
        border:"1.5px solid rgba(201,123,99,0.55)",
        transition:"transform 0.08s ease, border-color 0.2s, width 0.25s, height 0.25s",
      }}/>
    </>
  );
}

/* ─────────── NOISE SPOTLIGHT follows cursor ─────────── */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background =
          `radial-gradient(520px circle at ${e.clientX}px ${e.clientY}px, rgba(201,123,99,0.1) 0%, transparent 65%)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:2, transition:"background 0.15s ease" }}/>;
}

/* ─────────── PARTICLE CANVAS ─────────── */
function Particles() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const SYMS = ["✦","◈","◎","·","✿","◇"];
    const pts = Array.from({length:65}, ()=>({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.28,
      r: Math.random()*2+.6, op: Math.random()*.38+.07,
      sym: Math.random()>.6, s: SYMS[Math.floor(Math.random()*SYMS.length)],
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-20)p.x=W+20; if(p.x>W+20)p.x=-20;
        if(p.y<-20)p.y=H+20; if(p.y>H+20)p.y=-20;
        ctx.globalAlpha = p.op;
        ctx.fillStyle = "#C97B63";
        if(p.sym){
          ctx.font = `${p.r*7}px Georgia,serif`;
          ctx.fillText(p.s, p.x, p.y);
        } else {
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
      });
      ctx.globalAlpha=1;
      id = requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{ W=c.width=window.innerWidth; H=c.height=window.innerHeight; };
    window.addEventListener("resize",resize);
    return ()=>{ cancelAnimationFrame(id); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={cv} style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1}}/>;
}

/* ─────────── ANIMATED MESH BACKGROUND ─────────── */
function MeshBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:0.55}} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g1" cx="20%" cy="30%">
          <stop offset="0%" stopColor="#C97B63" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#C97B63" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="75%" cy="65%">
          <stop offset="0%" stopColor="#A85C45" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#A85C45" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="g3" cx="50%" cy="90%">
          <stop offset="0%" stopColor="#EAD8C0" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#EAD8C0" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g1)">
        <animateTransform attributeName="transform" type="translate" values="0 0;30 -20;-20 30;0 0" dur="12s" repeatCount="indefinite"/>
      </rect>
      <rect width="800" height="600" fill="url(#g2)">
        <animateTransform attributeName="transform" type="translate" values="0 0;-25 15;20 -25;0 0" dur="15s" repeatCount="indefinite"/>
      </rect>
      <rect width="800" height="600" fill="url(#g3)"/>
    </svg>
  );
}

/* ─────────── SCRAMBLE TEXT ─────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789✦◈◎";
function useScramble(target: string, trigger: boolean, delay = 0) {
  const [text, setText] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 22;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setText(target.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i / target.length < progress) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(""));
        if (frame >= totalFrames) { clearInterval(interval); setText(target); }
      }, 35);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger, target, delay]);
  return text;
}

/* ─────────── CHAR-BY-CHAR REVEAL ─────────── */
function CharReveal({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-char" style={{
          animationDelay: `${delay + i * 0.028}s`,
          display: ch === " " ? "inline" : "inline-block",
        }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─────────── 3D TILT ─────────── */
function Tilt({ children, style, intensity=11 }: { children: React.ReactNode; style?: React.CSSProperties; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - .5;
    const y = (e.clientY - top) / height - .5;
    el.style.transform = `perspective(700px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) translateY(-8px) scale(1.03)`;
    el.style.boxShadow = `${-x*22}px ${-y*22}px 44px rgba(62,47,47,0.16)`;
    if(glow.current){
      glow.current.style.background=`radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(201,123,99,0.13), transparent 65%)`;
    }
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateY(0) scale(1)";
    el.style.boxShadow = "0 2px 12px rgba(62,47,47,0.08)";
    if(glow.current) glow.current.style.background="transparent";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{...style, transition:"transform 0.1s ease, box-shadow 0.1s ease", willChange:"transform", position:"relative"}}>
      <div ref={glow} style={{position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",transition:"background 0.15s",zIndex:1}}/>
      <div style={{position:"relative",zIndex:2,height:"100%"}}>{children}</div>
    </div>
  );
}

/* ─────────── MAGNETIC BUTTON ─────────── */
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width/2) * 0.22;
    const y = (e.clientY - top - height/2) * 0.22;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { if(ref.current) ref.current.style.transform="translate(0,0)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{display:"inline-block", transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1)"}}>
      {children}
    </div>
  );
}

/* ─────────── COUNTER ─────────── */
function Counter({ to, suffix="" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !done.current){
        done.current=true;
        const dur=1600, t0=performance.now();
        const tick=(now:number)=>{
          const p = Math.min((now-t0)/dur,1);
          setV(Math.round((1-Math.pow(1-p,3))*to));
          if(p<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ─────────── SCROLL REVEAL ─────────── */
function useReveal() {
  useEffect(()=>{
    const obs = new IntersectionObserver(
      entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); }),
      {threshold:0.07}
    );
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[]);
}

/* ─────────── MARQUEE ─────────── */
function Marquee() {
  const items=["DIY Charts","Custom Clothes","3D Printing","Handcrafted Models","School Projects","Custom Creations","Made with Love in India ✦"];
  const all=[...items,...items,...items];
  return (
    <div style={{overflow:"hidden",background:"#C97B63",padding:"14px 0",position:"relative",zIndex:10}}>
      <div className="marquee-inner" style={{display:"flex",gap:56,whiteSpace:"nowrap",width:"max-content"}}>
        {all.map((s,i)=>(
          <span key={i} style={{fontFamily:"'Poppins',sans-serif",fontSize:11,fontWeight:700,color:"white",letterSpacing:"0.18em",textTransform:"uppercase",flexShrink:0}}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── WAVE DIVIDER ─────────── */
function Wave({bg, fill}: {bg:string; fill:string}) {
  return (
    <div style={{lineHeight:0, background:bg}}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{display:"block",width:"100%",height:60}}>
        <path d="M0,30 C360,65 1080,-5 1440,30 L1440,60 L0,60 Z" fill={fill}/>
      </svg>
    </div>
  );
}

/* ─────────── INK UNDERLINE ─────────── */
function InkLine({visible}: {visible:boolean}) {
  return (
    <svg viewBox="0 0 300 22" style={{width:300,height:22,display:"block",margin:"10px auto 0"}}>
      <path d="M4 16 C50 5, 100 20, 150 12 C200 3, 255 18, 296 13"
        stroke="#C97B63" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55"
        strokeDasharray="400" strokeDashoffset={visible?"0":"400"}
        style={{transition:"stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)"}}/>
    </svg>
  );
}

/* ─────────── SECTION HEADING ─────────── */
function SectionHead({badge, title, sub}: {badge:string; title:string; sub?:string}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(e=>{ if(e[0].isIntersecting){ setVis(true); obs.disconnect(); }},{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <div ref={ref} style={{textAlign:"center",marginBottom:64}}>
      <span className="badge" style={{marginBottom:18,opacity:vis?1:0,transition:"opacity 0.5s 0.1s"}}><span>✦</span>{badge}</span>
      <h2 style={{fontSize:"clamp(30px,4.5vw,48px)",fontWeight:700,lineHeight:1.15,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:"all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s"}}>
        {title}
      </h2>
      <InkLine visible={vis}/>
      {sub && <p style={{fontFamily:"'Poppins',sans-serif",fontSize:14,color:"#7A6060",marginTop:14,maxWidth:480,margin:"14px auto 0",opacity:vis?1:0,transition:"opacity 0.6s 0.4s"}}>{sub}</p>}
    </div>
  );
}

/* ─────────── FEATURED CARD WITH RIBBON ─────────── */
function CategoryCard({cat, index}: {cat: typeof categories[0]; index: number}) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={cat.href} style={{textDecoration:"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <Tilt style={{
        background:"#FAF3E8",
        border:`1px solid ${hov?"rgba(201,123,99,0.35)":"rgba(62,47,47,0.1)"}`,
        borderRadius:22,
        boxShadow: hov ? "0 20px 50px rgba(62,47,47,0.15)" : "0 2px 12px rgba(62,47,47,0.07)",
        height:"100%",
        opacity:0,
        animation:`cardUp 0.7s cubic-bezier(0.16,1,0.3,1) ${0.05+index*0.1}s forwards`,
        transition:"border-color 0.25s, box-shadow 0.25s",
        cursor:"none",
      }}>
        <div style={{padding:"30px 26px",height:"100%",position:"relative",overflow:"hidden"}}>
          {/* Top shimmer strip */}
          <div style={{
            position:"absolute",top:0,left:0,right:0,height:3,
            background:`linear-gradient(90deg,transparent,#C97B63,transparent)`,
            transform:hov?"scaleX(1)":"scaleX(0)",
            transformOrigin:"left",
            transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}/>

          {/* Watermark emoji */}
          <div style={{position:"absolute",bottom:-10,right:-8,fontSize:72,opacity:hov?0.12:0.06,transition:"opacity 0.3s, transform 0.3s",transform:hov?"scale(1.1) rotate(-8deg)":"scale(1) rotate(-5deg)",filter:"grayscale(1) sepia(1) hue-rotate(-10deg)"}}>
            {cat.emoji}
          </div>

          {/* Icon */}
          <div style={{
            width:50,height:50,borderRadius:14,
            background:`linear-gradient(135deg, rgba(201,123,99,${hov?0.18:0.1}), rgba(234,216,192,${hov?0.8:0.5}))`,
            display:"flex",alignItems:"center",justifyContent:"center",
            marginBottom:20,
            boxShadow: hov?"0 4px 16px rgba(201,123,99,0.2)":"none",
            transition:"all 0.3s",
          }}>
            <cat.icon size={21} color="#C97B63"/>
          </div>

          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:600,color:"#3E2F2F",marginBottom:10,transition:"color 0.2s",..( hov ? {color:"#C97B63"} : {})}}>
            {cat.label}
          </h3>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:12.5,color:"#7A6060",lineHeight:1.7,marginBottom:22}}>
            {cat.desc}
          </p>
          <div style={{display:"flex",alignItems:"center",gap:5,color:"#C97B63",fontSize:12,fontWeight:700,fontFamily:"'Poppins',sans-serif",transform:hov?"translateX(4px)":"translateX(0)",transition:"transform 0.25s"}}>
            Explore <ArrowRight size={13}/>
          </div>
        </div>
      </Tilt>
    </Link>
  );
}

/* ─────────── HERO TEXT STRIPE ─────────── */
function HeroTag({text, delay, rotate=0}: {text:string; delay:number; rotate?:number}) {
  return (
    <div style={{
      display:"inline-block",
      background:"rgba(201,123,99,0.1)",
      border:"1px solid rgba(201,123,99,0.25)",
      borderRadius:50,
      padding:"6px 18px",
      fontFamily:"'Poppins',sans-serif",
      fontSize:12,
      fontWeight:600,
      color:"#C97B63",
      letterSpacing:"0.1em",
      textTransform:"uppercase",
      transform:`rotate(${rotate}deg)`,
      opacity:0,
      animation:`tagFly 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s forwards`,
    }}>
      {text}
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [curtainDone, setCurtainDone] = useState(false);
  useReveal();

  const line1 = "Craft Verse";
  const line2 = "Where Creativity";
  const line2b = "Comes to Life";

  useEffect(()=>{
    const t=setTimeout(()=>setCurtainDone(true), 950);
    fetch("/api/products?featured=true&limit=4")
      .then(r=>r.json())
      .then(d=>{setProducts(d.products||[]); setLoading(false);})
      .catch(()=>setLoading(false));
    return ()=>clearTimeout(t);
  },[]);

  return (
    <>
      {/* ─ Curtain ─ */}
      {!curtainDone && <div className="page-curtain"/>}

      <Cursor/>
      <Spotlight/>

      <div style={{background:"#F5E9DA", cursor:"none", overflow:"hidden"}}>

        {/* ════════════════ HERO ════════════════ */}
        <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"linear-gradient(145deg,#F5E9DA 0%,#EAD8C0 50%,#F2E4D0 100%)",paddingTop:90}}>
          <MeshBg/>
          <Particles/>

          {/* Floating craft icons */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:3}}>
            <div className="float-a" style={{position:"absolute",top:"16%",left:"7%",fontSize:36,opacity:0.2,filter:"sepia(1) saturate(0.6)"}}>✂️</div>
            <div className="float-b" style={{position:"absolute",top:"25%",right:"8%",fontSize:30,opacity:0.18,filter:"sepia(1) saturate(0.6)"}}>✏️</div>
            <div className="float-c" style={{position:"absolute",bottom:"28%",left:"10%",fontSize:28,opacity:0.16,filter:"sepia(1) saturate(0.6)"}}>📐</div>
            <div className="float-d" style={{position:"absolute",bottom:"20%",right:"6%",fontSize:30,opacity:0.17,filter:"sepia(1) saturate(0.6)"}}>🎨</div>
            <div className="float-a" style={{position:"absolute",top:"60%",left:"4%",fontSize:22,opacity:0.12,filter:"sepia(1)",animationDelay:"2s"}}>📌</div>
            <div className="float-b" style={{position:"absolute",top:"45%",right:"3%",fontSize:20,opacity:0.11,filter:"sepia(1)",animationDelay:"1s"}}>📏</div>

            {/* Decorative rings */}
            <svg style={{position:"absolute",top:"9%",right:"16%",opacity:0.1}} viewBox="0 0 160 160" width="160" height="160">
              <circle cx="80" cy="80" r="70" stroke="#C97B63" strokeWidth="1.5" strokeDasharray="8 5" fill="none">
                <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="30s" repeatCount="indefinite"/>
              </circle>
              <circle cx="80" cy="80" r="45" stroke="#C97B63" strokeWidth="1" strokeDasharray="4 6" fill="none">
                <animateTransform attributeName="transform" type="rotate" from="360 80 80" to="0 80 80" dur="20s" repeatCount="indefinite"/>
              </circle>
            </svg>

            {/* Dot matrix */}
            <svg style={{position:"absolute",top:"7%",left:"4%",opacity:0.12}} viewBox="0 0 110 110" width="110" height="110">
              {[0,1,2,3,4].map(r=>[0,1,2,3,4].map(c=><circle key={`${r}-${c}`} cx={11+c*22} cy={11+r*22} r="2.5" fill="#C97B63"/>))}
            </svg>
            <svg style={{position:"absolute",bottom:"10%",right:"4%",opacity:0.12}} viewBox="0 0 110 110" width="110" height="110">
              {[0,1,2,3,4].map(r=>[0,1,2,3,4].map(c=><circle key={`${r}-${c}`} cx={11+c*22} cy={11+r*22} r="2.5" fill="#C97B63"/>))}
            </svg>
          </div>

          {/* Content */}
          <div style={{position:"relative",zIndex:4,textAlign:"center",maxWidth:860,padding:"0 28px"}}>

            {/* Floating tags */}
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:32}}>
              <HeroTag text="School Projects" delay={0.8} rotate={-1}/>
              <HeroTag text="India's Creative Studio" delay={0.95}/>
              <HeroTag text="Custom Made" delay={1.1} rotate={1}/>
            </div>

            {/* Main headline — char by char */}
            <div style={{overflow:"hidden",marginBottom:4}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(48px,8vw,90px)",fontWeight:700,lineHeight:1.08,color:"#3E2F2F",display:"block"}}>
                <CharReveal text={line1} delay={0.3}/>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3.5vw,40px)",fontWeight:400,color:"#C97B63",letterSpacing:"0.04em"}}> — </span>
              </h1>
            </div>
            <div style={{overflow:"hidden",marginBottom:4}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(36px,6.5vw,74px)",fontWeight:400,lineHeight:1.15,color:"#C97B63",display:"block"}}>
                <CharReveal text={line2} delay={0.55}/>
              </h1>
            </div>
            <div style={{overflow:"hidden",marginBottom:28}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(36px,6.5vw,74px)",fontWeight:400,lineHeight:1.15,color:"#C97B63",display:"block"}}>
                <CharReveal text={line2b} delay={0.78}/>
              </h1>
            </div>

            {/* Animated ink underline */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:30}}>
              <svg viewBox="0 0 300 24" style={{width:300,height:24}}>
                <path d="M4 16 C55 4, 110 22, 150 12 C190 2, 250 18, 296 12"
                  stroke="#C97B63" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55"
                  strokeDasharray="400" strokeDashoffset="400">
                  <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1.2s" begin="1.2s" fill="freeze"/>
                </path>
              </svg>
            </div>

            <p style={{fontFamily:"'Poppins',sans-serif",fontSize:"clamp(14px,2vw,17px)",color:"#7A6060",lineHeight:1.85,marginBottom:46,opacity:0,animation:"fadeUp 0.7s ease 1.4s forwards"}}>
              DIY Kits &nbsp;·&nbsp; School Projects &nbsp;·&nbsp; Custom Creations
            </p>

            {/* CTA buttons — magnetic */}
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginBottom:66,opacity:0,animation:"fadeUp 0.7s ease 1.6s forwards"}}>
              <MagneticWrap>
                <Link href="/diy-charts" className="btn-primary" style={{fontSize:15,padding:"15px 34px"}}>
                  Explore Shop <ArrowRight size={16}/>
                </Link>
              </MagneticWrap>
              <MagneticWrap>
                <Link href="/custom-models" className="btn-secondary" style={{fontSize:15,padding:"14px 34px"}}>
                  Start a Custom Project
                </Link>
              </MagneticWrap>
            </div>

            {/* Stats */}
            <div style={{display:"flex",gap:"clamp(28px,6vw,64px)",justifyContent:"center",flexWrap:"wrap",opacity:0,animation:"fadeUp 0.7s ease 1.8s forwards"}}>
              {[{to:500,suf:"+",label:"Projects Delivered"},{to:49,suf:" ★",label:"Average Rating"},{to:48,suf:"h",label:"Avg. Turnaround"}].map(s=>(
                <div key={s.label} style={{textAlign:"center"}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,34px)",fontWeight:700,color:"#C97B63"}}>
                    <Counter to={s.to} suffix={s.suf}/>
                  </p>
                  <p style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"#A89080",marginTop:5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,zIndex:4}}>
            <span style={{fontFamily:"'Poppins',sans-serif",fontSize:9,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"#A89080",opacity:0,animation:"fadeUp 0.5s ease 2.2s forwards"}}>Scroll</span>
            <div style={{width:1,height:52,background:"linear-gradient(to bottom,transparent,#C97B63 55%,transparent)",animation:"scrollDrop 2.2s ease-in-out 2.2s infinite"}}/>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#C97B63"}}/>
          </div>
        </section>

        {/* ════════ MARQUEE ════════ */}
        <Marquee/>

        {/* ════════ CATEGORIES ════════ */}
        <section style={{padding:"120px 28px",background:"#FAF3E8",position:"relative"}}>
          {/* Background dots */}
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(201,123,99,0.08) 1.5px,transparent 1.5px)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
          <div style={{maxWidth:1240,margin:"0 auto",position:"relative",zIndex:2}}>
            <SectionHead badge="What We Offer" title="Everything You Need to Create" sub="Five ways to turn your imagination into something you can hold."/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(215px,1fr))",gap:24}}>
              {categories.map((cat,i)=><CategoryCard key={cat.label} cat={cat} index={i}/>)}
            </div>
          </div>
        </section>

        <Wave bg="#FAF3E8" fill="#F5E9DA"/>

        {/* ════════ HOW IT WORKS ════════ */}
        <section style={{padding:"100px 28px 130px",background:"#F5E9DA",position:"relative",overflow:"hidden"}}>
          {/* Cross-hatch bg */}
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.04}} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hatch" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M0 0 L26 26 M26 0 L0 26" stroke="#C97B63" strokeWidth="0.7"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#hatch)"/>
          </svg>

          <div style={{maxWidth:1060,margin:"0 auto",position:"relative",zIndex:2}}>
            <SectionHead badge="Simple Process" title="How It Works" sub="Three steps from idea to doorstep."/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:36,position:"relative"}}>
              {steps.map((step,i)=>(
                <div key={i} className="reveal" style={{transitionDelay:`${i*0.14}s`}}>
                  <Tilt style={{background:"#FAF3E8",border:"1px solid rgba(62,47,47,0.1)",borderRadius:24,cursor:"none"}}>
                    <div style={{padding:"44px 34px",textAlign:"center",position:"relative"}}>
                      {/* Pulse ring */}
                      <div style={{position:"absolute",top:20,right:22,fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#C97B63",opacity:0.3}}>{step.num}</div>

                      <div style={{position:"relative",width:74,height:74,margin:"0 auto 26px"}}>
                        <div style={{position:"absolute",inset:-6,borderRadius:"50%",border:"1.5px dashed rgba(201,123,99,0.35)",animation:"spinSlow 15s linear infinite"}}/>
                        <div style={{position:"absolute",inset:-14,borderRadius:"50%",border:"1px dashed rgba(201,123,99,0.15)",animation:"spinSlowRev 22s linear infinite"}}/>
                        <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"linear-gradient(135deg,#EAD8C0,#F5E9DA)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(201,123,99,0.2)"}}>
                          <span style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#C97B63"}}>{step.icon}</span>
                        </div>
                      </div>

                      <h3 style={{fontSize:20,fontWeight:600,color:"#3E2F2F",marginBottom:14}}>{step.title}</h3>
                      <p style={{fontFamily:"'Poppins',sans-serif",fontSize:13.5,color:"#7A6060",lineHeight:1.8}}>{step.desc}</p>
                    </div>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Wave bg="#F5E9DA" fill="#FAF3E8"/>

        {/* ════════ FEATURED PRODUCTS ════════ */}
        <section style={{padding:"120px 28px",background:"#FAF3E8"}}>
          <div style={{maxWidth:1240,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:56,flexWrap:"wrap",gap:16}} className="reveal">
              <div>
                <span className="badge" style={{marginBottom:14}}><span>✦</span>Handpicked</span>
                <h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:700}}>Featured Work</h2>
                <div style={{width:52,height:3,background:"#C97B63",borderRadius:2,marginTop:12}}/>
              </div>
              <MagneticWrap>
                <Link href="/diy-charts" style={{display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,color:"#C97B63",textDecoration:"none",fontFamily:"'Poppins',sans-serif",padding:"10px 20px",border:"1.5px solid rgba(201,123,99,0.3)",borderRadius:50,cursor:"none",transition:"all 0.2s"}}>
                  View All <ArrowRight size={14}/>
                </Link>
              </MagneticWrap>
            </div>

            {loading ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:24}}>
                {[...Array(4)].map((_,i)=>(
                  <div key={i} style={{borderRadius:20,overflow:"hidden",border:"1px solid rgba(62,47,47,0.08)"}}>
                    <div className="skeleton" style={{height:220}}/>
                    <div style={{padding:20,background:"#FAF3E8"}}>
                      <div className="skeleton" style={{height:16,width:"70%",marginBottom:10}}/>
                      <div className="skeleton" style={{height:13,marginBottom:16}}/>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div className="skeleton" style={{height:22,width:60}}/>
                        <div className="skeleton" style={{height:34,width:85,borderRadius:50}}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length>0 ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:24}}>
                {products.map(p=><ProductCard key={p._id} product={p}/>)}
              </div>
            ) : (
              <div style={{textAlign:"center",padding:"90px 24px"}}>
                <div style={{display:"inline-block",fontFamily:"'Playfair Display',serif",fontSize:56,color:"#C97B63",marginBottom:18,animation:"spinSlow 10s linear infinite"}}>✦</div>
                <h3 style={{fontSize:24,color:"#3E2F2F",marginBottom:10}}>Products Coming Soon</h3>
                <p style={{fontFamily:"'Poppins',sans-serif",color:"#7A6060",marginBottom:30,fontSize:14}}>Our catalog is being curated. Check back soon!</p>
                <MagneticWrap><Link href="/custom-models" className="btn-primary">Start a Custom Request</Link></MagneticWrap>
              </div>
            )}
          </div>
        </section>

        {/* ════════ STATS BAND ════════ */}
        <section style={{background:"linear-gradient(135deg,#C97B63,#A85C45)",padding:"80px 28px",position:"relative",overflow:"hidden"}}>
          {/* Animated circles bg */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
            <div style={{position:"absolute",top:"-40%",right:"-10%",width:500,height:500,borderRadius:"50%",background:"rgba(255,255,255,0.06)",animation:"spinSlow 30s linear infinite"}}/>
            <div style={{position:"absolute",bottom:"-50%",left:"-8%",width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
          </div>
          <div style={{maxWidth:1000,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(32px,7vw,90px)",flexWrap:"wrap",position:"relative",zIndex:2}} className="reveal">
            {[{to:500,suf:"+",label:"Projects Delivered"},{to:98,suf:"%",label:"Happy Customers"},{to:48,suf:"h",label:"Average Delivery"},{to:49,suf:" ★",label:"Average Rating"}].map(s=>(
              <div key={s.label} style={{textAlign:"center"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,5.5vw,56px)",fontWeight:700,color:"white",textShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                  <Counter to={s.to} suffix={s.suf}/>
                </p>
                <p style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:7,textTransform:"uppercase",letterSpacing:"0.14em"}}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ TESTIMONIALS ════════ */}
        <section style={{padding:"120px 28px",background:"#EAD8C0",position:"relative",overflow:"hidden"}}>
          {/* Large decorative quote */}
          <div style={{position:"absolute",top:20,left:"50%",transform:"translateX(-50%)",fontFamily:"'Playfair Display',serif",fontSize:280,color:"#C97B63",opacity:0.04,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>"</div>

          <div style={{maxWidth:1140,margin:"0 auto",position:"relative",zIndex:2}}>
            <SectionHead badge="Kind Words" title="What Our Customers Say"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:26}}>
              {testimonials.map((t,i)=>(
                <div key={i} className="reveal" style={{transitionDelay:`${i*0.14}s`}}>
                  <Tilt intensity={7} style={{background:"#FAF3E8",border:"1px solid rgba(62,47,47,0.09)",borderRadius:24,boxShadow:"0 2px 14px rgba(62,47,47,0.07)",cursor:"none"}}>
                    <div style={{padding:"34px 30px"}}>
                      {/* Stars */}
                      <div style={{display:"flex",gap:3,marginBottom:14}}>
                        {[1,2,3,4,5].map(s=><span key={s} style={{color:"#C97B63",fontSize:14}}>★</span>)}
                      </div>
                      <p style={{fontFamily:"'Poppins',sans-serif",fontSize:13.5,color:"#3E2F2F",lineHeight:1.85,marginBottom:26,fontStyle:"italic"}}>{t.text}</p>
                      <div style={{display:"flex",alignItems:"center",gap:14,paddingTop:20,borderTop:"1px solid rgba(62,47,47,0.08)"}}>
                        <div style={{position:"relative",flexShrink:0}}>
                          <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#C97B63,#A85C45)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,boxShadow:"0 4px 14px rgba(201,123,99,0.35)"}}>
                            {t.initials}
                          </div>
                          <div style={{position:"absolute",inset:-3,borderRadius:"50%",border:"1.5px solid rgba(201,123,99,0.3)",animation:"pulseRing 2.5s ease-out infinite"}}/>
                        </div>
                        <div>
                          <p style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:14,color:"#3E2F2F"}}>{t.name}</p>
                          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:12,color:"#A89080",marginTop:2}}>{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section style={{padding:"120px 28px",background:"#FAF3E8"}}>
          <div className="reveal" style={{maxWidth:800,margin:"0 auto",textAlign:"center",padding:"90px 56px",borderRadius:32,background:"linear-gradient(135deg,#F5E9DA,#EAD8C0)",border:"1px solid rgba(62,47,47,0.1)",boxShadow:"0 20px 70px rgba(62,47,47,0.1)",position:"relative",overflow:"hidden"}}>
            {/* Corner dots */}
            {[[16,16],[16,"auto"],[null,16]].map(([t,b],i)=>null)}
            <svg style={{position:"absolute",top:18,right:18,opacity:0.14}} viewBox="0 0 90 90" width="90" height="90">{[0,1,2,3].map(r=>[0,1,2,3].map(c=><circle key={`${r}-${c}`} cx={11+c*22} cy={11+r*22} r="2.5" fill="#C97B63"/>))}</svg>
            <svg style={{position:"absolute",bottom:18,left:18,opacity:0.14}} viewBox="0 0 90 90" width="90" height="90">{[0,1,2,3].map(r=>[0,1,2,3].map(c=><circle key={`${r}-${c}`} cx={11+c*22} cy={11+r*22} r="2.5" fill="#C97B63"/>))}</svg>
            {/* Spinning rings */}
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:560,height:560,borderRadius:"50%",border:"1px dashed rgba(201,123,99,0.1)",animation:"spinSlow 40s linear infinite",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:420,height:420,borderRadius:"50%",border:"1px dashed rgba(201,123,99,0.08)",animation:"spinSlowRev 28s linear infinite",pointerEvents:"none"}}/>

            <div style={{position:"relative",zIndex:2}}>
              <div style={{display:"inline-block",fontFamily:"'Playfair Display',serif",fontSize:50,color:"#C97B63",marginBottom:24,opacity:0.65,animation:"spinSlow 14s linear infinite"}}>✦</div>
              <h2 style={{fontSize:"clamp(28px,4.5vw,46px)",fontWeight:700,color:"#3E2F2F",marginBottom:20,lineHeight:1.2}}>
                Turn Your Idea Into<br/>Something Real
              </h2>
              <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15,color:"#7A6060",lineHeight:1.85,marginBottom:40,maxWidth:500,margin:"0 auto 40px"}}>
                Whether it's a school project, a custom creation, or a 3D print — we're here to make it happen, by hand.
              </p>
              <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",marginBottom:36}}>
                {["Free Consultation","Fast Delivery","Quality Guaranteed"].map(pt=>(
                  <div key={pt} style={{display:"flex",alignItems:"center",gap:6}}>
                    <CheckCircle2 size={14} color="#C97B63"/>
                    <span style={{fontFamily:"'Poppins',sans-serif",fontSize:13,color:"#7A6060",fontWeight:500}}>{pt}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                <MagneticWrap><Link href="/custom-models" className="btn-primary" style={{fontSize:15,padding:"15px 34px"}}>Start Your Project <ArrowRight size={16}/></Link></MagneticWrap>
                <MagneticWrap><Link href="/diy-charts" className="btn-secondary" style={{fontSize:15,padding:"14px 34px"}}>Browse Catalog</Link></MagneticWrap>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
          @keyframes cardUp { from{opacity:0;transform:translateY(34px)} to{opacity:1;transform:translateY(0)} }
          @keyframes tagFly { from{opacity:0;transform:translateY(18px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
          .btn-primary, .btn-secondary { cursor: none !important; }
          a, button { cursor: none !important; }
          * { cursor: none !important; }
        `}</style>
      </div>
    </>
  );
}
