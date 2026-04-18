"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Upload, Printer, CheckCircle2, ArrowRight, FileBox } from "lucide-react";
import { useAuth } from "@/store/authStore";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

const features = [
  { icon: "🎯", title: "Precise Printing", desc: "Layer resolution as fine as 0.1mm for incredibly detailed prints" },
  { icon: "🧪", title: "Multiple Materials", desc: "PLA, PETG, Resin — choose the right material for your project" },
  { icon: "🎨", title: "Any Color", desc: "Wide range of filament colors to match your vision" },
  { icon: "📦", title: "Safe Delivery", desc: "Each print is carefully packaged and delivered to your door" },
];

export default function PrintingPage() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", material: "PLA", color: "White", budget: "", phone: "", email: user?.email || "", fileUrl: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to submit a request"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, type: "3d-printing", budget: Number(form.budget), fileUrl: form.fileUrl }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("3D print request submitted! We'll contact you soon.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", borderBottom: "1px solid #fde68a40", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🖨️</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>
            3D Printing <span style={{ color: "#f59e0b" }}>Service</span>
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>
            Have a design file? We print it. Upload your STL or describe your idea — we handle the rest with professional-grade printers.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 72 }}>
          {features.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: 24, borderRadius: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#1a1a2e", marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Request form */}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", textAlign: "center", marginBottom: 8 }}>
            Submit a Print Request
          </h2>
          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 40 }}>Fill out the form and we'll get back to you with a quote within 24 hours.</p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(245,243,255,0.6)", borderRadius: 24, border: "1px solid rgba(139,92,246,0.15)" }}>
              <CheckCircle2 size={56} color="#8b5cf6" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#1a1a2e", marginBottom: 8 }}>Request Submitted!</h3>
              <p style={{ color: "#6b7280", marginBottom: 24 }}>Our team will review your request and contact you within 24 hours with pricing and timeline.</p>
              <Link href="/" className="btn-primary">Back to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "36px", borderRadius: 24 }}>
              {!user && (
                <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)", marginBottom: 24 }}>
                  <p style={{ fontSize: 13, color: "#e11d48", textAlign: "center" }}>
                    <Link href="/login" style={{ color: "#8b5cf6", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to submit a request.
                  </p>
                </div>
              )}

              <div style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Project Title *</label>
                  <input className="craft-input" required placeholder="e.g. Custom trophy stand" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Description *</label>
                  <textarea className="craft-input" required rows={4} placeholder="Describe your design, dimensions, purpose..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Material</label>
                    <select className="craft-input" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))}>
                      {["PLA", "PETG", "ABS", "Resin", "Flexible TPU"].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Color</label>
                    <select className="craft-input" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}>
                      {["White", "Black", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Natural"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Budget (₹)</label>
                    <input className="craft-input" type="number" placeholder="e.g. 500" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Phone</label>
                    <input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email *</label>
                  <input className="craft-input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>

                <ImageUpload
                  label="Reference Image (optional)"
                  value={form.fileUrl}
                  onChange={url => setForm(f => ({ ...f, fileUrl: url }))}
                  hint="Upload a reference photo or sketch of what you want printed."
                />

                <button type="submit" className="btn-primary" disabled={loading || !user}
                  style={{ justifyContent: "center", fontSize: 15, padding: "14px", opacity: (!user || loading) ? 0.6 : 1 }}>
                  <Printer size={16} />
                  {loading ? "Submitting..." : "Submit Print Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
