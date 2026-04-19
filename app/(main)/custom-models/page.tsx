"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/authStore";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

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
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, type: "model", budget: Number(form.budget) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("Custom request submitted! 🎉");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      <div style={{ background: "linear-gradient(135deg, #FDF6EE 0%, #EDD9C5 100%)", borderBottom: "1px solid #bbf7d040", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✨</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#2C1A0E", marginBottom: 16 }}>
            Custom <span style={{ color: "#C97B63" }}>Models</span> & Projects
          </h1>
          <p style={{ fontSize: 17, color: "#8B6F5E", maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
            Have a unique idea? Tell us what you need and our craftsmen will build it from scratch — exactly the way you imagine it.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(240,253,244,0.8)", borderRadius: 24, border: "1px solid rgba(201,123,99,0.2)" }}>
            <CheckCircle2 size={56} color="#C97B63" style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#2C1A0E", marginBottom: 8 }}>Request Submitted!</h3>
            <p style={{ color: "#8B6F5E", marginBottom: 24 }}>We'll review your project and get back within 24 hours with a quote.</p>
            <Link href="/" className="btn-primary">Back to Home <ArrowRight size={15} /></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "40px", borderRadius: 24 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#2C1A0E", marginBottom: 28 }}>
              <Sparkles size={22} color="#C97B63" style={{ display: "inline", marginRight: 8 }} />
              Tell Us Your Vision
            </h2>

            {!user && (
              <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(201,123,99,0.08)", border: "1px solid rgba(201,123,99,0.2)", marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: "#e11d48", textAlign: "center" }}>
                  <Link href="/login" style={{ color: "#C97B63", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to submit a request.
                </p>
              </div>
            )}

            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>Project Category</label>
                <select className="craft-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {["Science Model", "Geography Model", "Engineering Project", "Art & Craft", "Architecture", "Other"].map(c => <option key={c} value={c.toLowerCase().replace(/ /g, "-")}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>Project Title *</label>
                <input className="craft-input" required placeholder="e.g. Working water pump model for school" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>Detailed Description *</label>
                <textarea className="craft-input" required rows={5} placeholder="Describe your project in detail — size, materials, functionality, colors, purpose..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>Budget (₹)</label>
                  <input className="craft-input" type="number" min="0" placeholder="e.g. 800" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>WhatsApp Number</label>
                  <input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 6 }}>Email *</label>
                <input className="craft-input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <ImageUpload
                label="Reference Image (optional)"
                value={form.fileUrl}
                onChange={url => setForm(f => ({ ...f, fileUrl: url }))}
                hint="Upload a sketch, reference photo, or example of what you want."
              />

              <button type="submit" className="btn-primary" disabled={loading || !user}
                style={{ justifyContent: "center", fontSize: 15, padding: "14px", opacity: (!user || loading) ? 0.6 : 1, background: "linear-gradient(135deg, #C97B63, #D4906E)" }}>
                <Sparkles size={16} />
                {loading ? "Submitting..." : "Submit Custom Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
