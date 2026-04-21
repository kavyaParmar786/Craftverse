"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

const labelStyle = { display: "block" as const, fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 as const, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

export default function CustomModelsPage() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", budget: "", phone: "", email: user?.email || "", category: "science", fileUrl: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login first"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...form, type: "model", budget: Number(form.budget) }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("Custom request submitted!");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 16 }}>Made Just for You</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>Custom <span style={{ color: "#C97B63", fontStyle: "italic" }}>Models & Projects</span></h1>
          <div className="divider" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 500, margin: "20px auto 0", lineHeight: 1.7 }}>Have a unique idea? Tell us what you need and our craftsmen will build it from scratch — exactly the way you imagine it.</p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "64px 24px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "#FAF3E8", borderRadius: 22, border: "1px solid rgba(62,47,47,0.08)" }}>
            <CheckCircle2 size={52} color="#C97B63" style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>Request Submitted!</h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 24, fontSize: 13 }}>We'll review your project and get back within 24 hours with a quote.</p>
            <Link href="/" className="btn-primary">Back to Home <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#FAF3E8", borderRadius: 22, padding: "40px", border: "1px solid rgba(62,47,47,0.08)" }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#3E2F2F" }}>Tell Us Your Vision</h2>
              <div style={{ width: 40, height: 2.5, background: "#C97B63", borderRadius: 2, marginTop: 10 }} />
            </div>
            {!user && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "#EAD8C0", border: "1px solid rgba(62,47,47,0.10)", marginBottom: 24 }}>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", textAlign: "center" }}>
                  <Link href="/login" style={{ color: "#C97B63", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to submit a request.
                </p>
              </div>
            )}
            <div style={{ display: "grid", gap: 18 }}>
              <div><label style={labelStyle}>Project Category</label>
                <select className="craft-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {["Science Model", "Geography Model", "Engineering Project", "Art & Craft", "Architecture", "Other"].map(c => <option key={c} value={c.toLowerCase().replace(/ /g, "-")}>{c}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Project Title *</label><input className="craft-input" required placeholder="e.g. Working water pump model for school" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><label style={labelStyle}>Detailed Description *</label><textarea className="craft-input" required rows={5} placeholder="Describe your project — size, materials, functionality, colours, purpose..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div><label style={labelStyle}>Budget (₹)</label><input className="craft-input" type="number" min="0" placeholder="e.g. 800" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div>
                <div><label style={labelStyle}>WhatsApp Number</label><input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              </div>
              <div><label style={labelStyle}>Email *</label><input className="craft-input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <ImageUpload
                label="Reference Image (optional)"
                value={form.fileUrl}
                onChange={url => setForm(f => ({ ...f, fileUrl: url }))}
                hint="Upload a sketch or example of what you want."
              />

              <button type="submit" className="btn-primary" disabled={loading || !user} style={{ justifyContent: "center", fontSize: 14, padding: "14px", opacity: (!user || loading) ? 0.6 : 1 }}>
                {loading ? "Submitting..." : "Submit Custom Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
