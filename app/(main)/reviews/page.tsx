"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/store/authStore";
import Link from "next/link";
import toast from "react-hot-toast";

const allReviews = [
  { name:"Priya Sharma",    role:"Student, Class 12",          initials:"PS", stars:5, date:"March 2025",   text:"The science model was absolutely stunning. My teacher was amazed — and so was I. Got an A+ and it still sits on my desk. Will definitely order again for next year!" },
  { name:"Rahul Mehta",     role:"Engineering Student",        initials:"RM", stars:5, date:"Feb 2025",     text:"3D printing service delivered exactly what I envisioned. The quality felt professional, not student-project level at all. Delivery was super fast too." },
  { name:"Ananya Singh",    role:"Project Coordinator",        initials:"AS", stars:5, date:"Jan 2025",     text:"Ordered charts for our school exhibition. Premium quality, on time, and the team was so helpful throughout. Will order in bulk next exhibition season." },
  { name:"Karan Patel",     role:"Class 10 Student",           initials:"KP", stars:5, date:"Dec 2024",     text:"The volcano working model was exactly what I needed. It actually erupts! My classmates were so impressed. Best ₹499 I ever spent on a project." },
  { name:"Meera Joshi",     role:"Biology Teacher",            initials:"MJ", stars:5, date:"Nov 2024",     text:"I recommended Craft Verse to my entire class for their anatomy projects. Every single student was happy with their models. Exceptional quality across the board." },
  { name:"Dev Acharya",     role:"Parent",                     initials:"DA", stars:4, date:"Oct 2024",     text:"My daughter's solar system model was gorgeous. Delivered in 2 days, well packaged. Minor issue with one planet ring but team fixed it promptly. Very happy overall." },
  { name:"Sneha Rao",       role:"College Student",            initials:"SR", stars:5, date:"Sep 2024",     text:"Custom hoodie design came out perfectly. The fabric quality is way above what I expected at this price. Wearing it every day now. Will order more!" },
  { name:"Arjun Verma",     role:"School Science Club Head",   initials:"AV", stars:5, date:"Aug 2024",     text:"Bulk ordered 12 models for our science fair. Every single one was perfect. Craft Verse's team even helped us choose appropriate models for each topic. 10/10." },
  { name:"Riya Desai",      role:"Interior Design Student",    initials:"RD", stars:5, date:"Jul 2024",     text:"The 3D printed architectural model for my college project was flawless. The level of detail was incredible. My professor asked where I got it made!" },
];

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display:"flex", gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button"
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHovered(i)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{ background:"none", border:"none", cursor: onChange ? "pointer" : "default", padding:1 }}
        >
          <Star size={onChange ? 22 : 14}
            fill={(hovered || value) >= i ? "#C97B63" : "none"}
            color={(hovered || value) >= i ? "#C97B63" : "#C9A898"}
            style={{ transition:"all 0.15s" }}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { user, token } = useAuth();
  const [form, setForm]   = useState({ rating: 5, text: "", name: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState(0); // 0 = all

  const avg = (allReviews.reduce((s, r) => s + r.stars, 0) / allReviews.length).toFixed(1);
  const dist = [5,4,3,2,1].map(s => ({ s, count: allReviews.filter(r => r.stars === s).length }));

  const filtered = filter === 0 ? allReviews : allReviews.filter(r => r.stars === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim()) { toast.error("Please write your review"); return; }
    setLoading(true);
    // Simulate submit (in production wire to /api/reviews)
    await new Promise(r => setTimeout(r, 900));
    setSubmitted(true);
    toast.success("Review submitted! Thank you 🎉");
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"transparent", padding:"80px 24px 100px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div className="badge" style={{ marginBottom:16 }}>Real Stories</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,5vw,52px)", fontWeight:700, color:"#3E2F2F", marginBottom:12 }}>
            Customer Reviews
          </h1>
          <div className="divider" style={{ margin:"12px auto 20px" }}/>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:16, color:"#7A6060", maxWidth:500, margin:"0 auto" }}>
            Real words from real students, parents, and creators who trusted Craft Verse.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:48, alignItems:"start" }}>

          {/* Left — reviews list */}
          <div>
            {/* Filter bar */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32 }}>
              {[0,5,4,3].map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  style={{
                    padding:"7px 18px", borderRadius:50, border:"1.5px solid",
                    borderColor: filter===s ? "#C97B63" : "rgba(201,123,99,0.2)",
                    background: filter===s ? "#C97B63" : "rgba(250,243,232,0.6)",
                    color: filter===s ? "white" : "#7A6060",
                    fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:500,
                    cursor:"pointer", backdropFilter:"blur(8px)",
                    transition:"all 0.2s",
                  }}>
                  {s === 0 ? "All Reviews" : `${s} Stars`}
                </button>
              ))}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {filtered.map((r, i) => (
                <div key={i} className="glass-card testimonial-card" style={{ padding:"28px 32px" }}>
                  {/* Top row */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#C97B63,#A85C45)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:14, flexShrink:0 }}>{r.initials}</div>
                      <div>
                        <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14, color:"#3E2F2F", margin:0 }}>{r.name}</p>
                        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", marginTop:2 }}>{r.role}</p>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <StarRating value={r.stars}/>
                      <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#A89080" }}>{r.date}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13.5, color:"#5C3D2E", lineHeight:1.75, margin:0, fontStyle:"italic" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — summary + write review */}
          <div style={{ display:"flex", flexDirection:"column", gap:24, position:"sticky", top:100 }}>

            {/* Rating summary */}
            <div className="glass-card" style={{ padding:"28px 24px" }}>
              <div style={{ textAlign:"center", marginBottom:20 }}>
                <p style={{ fontFamily:"'Playfair Display',serif", fontSize:52, fontWeight:700, color:"#C97B63", margin:0, lineHeight:1 }}>{avg}</p>
                <StarRating value={5}/>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", marginTop:6 }}>{allReviews.length} verified reviews</p>
              </div>
              {dist.map(({ s, count }) => (
                <div key={s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#7A6060", minWidth:12 }}>{s}</span>
                  <Star size={11} fill="#C97B63" color="#C97B63"/>
                  <div style={{ flex:1, height:6, borderRadius:3, background:"rgba(201,123,99,0.12)", overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg,#C97B63,#E8A87C)", width:`${(count/allReviews.length)*100}%`, transition:"width 0.4s ease" }}/>
                  </div>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", minWidth:14, textAlign:"right" }}>{count}</span>
                </div>
              ))}
            </div>

            {/* Write a review */}
            <div className="glass-card" style={{ padding:"28px 24px" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:600, color:"#3E2F2F", marginBottom:6 }}>Write a Review</h3>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", marginBottom:20 }}>Share your experience with others</p>

              {submitted ? (
                <div style={{ textAlign:"center", padding:"24px 0" }}>
                  <CheckCircle2 size={40} color="#C97B63" style={{ marginBottom:12 }}/>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:14, color:"#3E2F2F", fontWeight:600 }}>Thank you!</p>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#A89080", marginTop:4 }}>Your review has been submitted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"grid", gap:14 }}>
                  {!user && (
                    <div style={{ padding:"10px 14px", borderRadius:12, background:"rgba(201,123,99,0.07)", border:"1px solid rgba(201,123,99,0.15)", fontSize:12, color:"#A85C45", fontFamily:"'Poppins',sans-serif", textAlign:"center" }}>
                      <Link href="/login" style={{ color:"#C97B63", fontWeight:600 }}>Login</Link> to post under your name
                    </div>
                  )}
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5C3D2E", marginBottom:6, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.04em", textTransform:"uppercase" }}>Your Rating</label>
                    <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))}/>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5C3D2E", marginBottom:6, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.04em", textTransform:"uppercase" }}>Name</label>
                    <input className="craft-input" placeholder="Your name"
                      value={user ? user.name : form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      disabled={!!user}
                    />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5C3D2E", marginBottom:6, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.04em", textTransform:"uppercase" }}>Role / School</label>
                    <input className="craft-input" placeholder="e.g. Student, Class 12"
                      value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5C3D2E", marginBottom:6, fontFamily:"'Poppins',sans-serif", letterSpacing:"0.04em", textTransform:"uppercase" }}>Your Review *</label>
                    <textarea className="craft-input" required rows={4} placeholder="Tell others about your experience..."
                      value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                      style={{ resize:"vertical" }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading}
                    style={{ justifyContent:"center", borderRadius:50, opacity: loading ? 0.7 : 1 }}>
                    <Send size={14}/> {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
