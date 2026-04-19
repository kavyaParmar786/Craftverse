"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Printer, CheckCircle2, FileBox } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

const features = [
  { symbol: "✦", title: "Precise Printing", desc: "Layer resolution as fine as 0.1mm for incredibly detailed prints" },
  { symbol: "◈", title: "Multiple Materials", desc: "PLA, PETG, Resin — choose the right material for your project" },
  { symbol: "◎", title: "Any Color", desc: "Wide range of filament colors to match your vision perfectly" },
  { symbol: "→", title: "Safe Delivery", desc: "Each print is carefully packaged and delivered to your door" },
];

const labelStyle = { display: "block" as const, fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 as const, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

export default function PrintingPage() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", material: "PLA", color: "White", budget: "", phone: "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to submit a request"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...form, type: "3d-printing", budget: Number(form.budget) }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("3D print request submitted!");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      {/* Hero */}
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 16 }}>Professional Printing</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>3D Printing <span style={{ color: "#C97B63", fontStyle: "italic" }}>Service</span></h1>
          <div className="divider" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7 }}>Have a design file? We print it. Upload your STL or describe your idea — we handle the rest with professional-grade printers.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 72 }}>
          {features.map((f) => (
            <div key={f.title} className="paper-card" style={{ padding: 24 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#C97B63", marginBottom: 12, opacity: 0.5 }}>{f.symbol}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "#7A6060", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 6 }}>Submit a Print Request</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>Fill out the form and we'll get back to you with a quote within 24 hours.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 24px", background: "#FAF3E8", borderRadius: 22, border: "1px solid rgba(62,47,47,0.08)" }}>
              <CheckCircle2 size={52} color="#C97B63" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>Request Submitted!</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 24, fontSize: 13 }}>Our team will review and contact you within 24 hours with pricing and timeline.</p>
              <Link href="/" className="btn-primary">Back to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "#FAF3E8", borderRadius: 22, padding: "36px", border: "1px solid rgba(62,47,47,0.08)" }}>
              {!user && (
                <div style={{ padding: "12px 16px", borderRadius: 10, background: "#EAD8C0", border: "1px solid rgba(62,47,47,0.10)", marginBottom: 24 }}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", textAlign: "center" }}>
                    <Link href="/login" style={{ color: "#C97B63", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to submit a request.
                  </p>
                </div>
              )}
              <div style={{ display: "grid", gap: 18 }}>
                <div><label style={labelStyle}>Project Title *</label><input className="craft-input" required placeholder="e.g. Custom trophy stand" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
                <div><label style={labelStyle}>Description *</label><textarea className="craft-input" required rows={4} placeholder="Describe your design, dimensions, purpose..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div><label style={labelStyle}>Material</label><select className="craft-input" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))}>{["PLA", "PETG", "ABS", "Resin", "Flexible TPU"].map(m => <option key={m}>{m}</option>)}</select></div>
                  <div><label style={labelStyle}>Color</label><select className="craft-input" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}>{["White", "Black", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Natural"].map(c => <option key={c}>{c}</option>)}</select></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div><label style={labelStyle}>Budget (₹)</label><input className="craft-input" type="number" placeholder="e.g. 500" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div>
                  <div><label style={labelStyle}>Phone</label><input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                </div>
                <div><label style={labelStyle}>Email *</label><input className="craft-input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div style={{ padding: "16px", borderRadius: 12, background: "#EAD8C0", border: "1px dashed rgba(201,123,99,0.4)", textAlign: "center" }}>
                  <FileBox size={22} color="#C97B63" style={{ marginBottom: 6 }} />
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", margin: 0 }}>Have an STL/OBJ file? Share it via WhatsApp or email after submitting.</p>
                </div>
                <button type="submit" className="btn-primary" disabled={loading || !user} style={{ justifyContent: "center", fontSize: 14, padding: "14px", opacity: (!user || loading) ? 0.6 : 1 }}>
                  <Printer size={15} />{loading ? "Submitting..." : "Submit Print Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
