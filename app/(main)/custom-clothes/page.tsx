"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Shirt, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/authStore";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";
import ProductListingPage from "@/components/sections/ProductListingPage";

const clothesTypes = ["T-Shirt", "Hoodie", "Polo Shirt", "Sweatshirt", "Jacket", "Other"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

function CustomOrderForm() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", budget: "", phone: "", email: user?.email || "", clothesType: "T-Shirt", size: "M", quantity: "1", color: "", fileUrl: "" });
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
        body: JSON.stringify({ ...form, type: "clothes", budget: Number(form.budget), description: `Type: ${form.clothesType}, Size: ${form.size}, Qty: ${form.quantity}, Color: ${form.color}\n\n${form.description}` }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("Clothes order request submitted! 👕");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(255,241,242,0.8)", borderRadius: 24, border: "1px solid rgba(251,113,133,0.2)" }}>
      <CheckCircle2 size={56} color="#fb7185" style={{ marginBottom: 16 }} />
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#1a1a2e", marginBottom: 8 }}>Order Request Submitted!</h3>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>We'll confirm your design and pricing within 24 hours.</p>
      <Link href="/" className="btn-primary" style={{ background: "linear-gradient(135deg, #fb7185, #f43f5e)" }}>Back to Home <ArrowRight size={15} /></Link>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "40px", borderRadius: 24 }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#1a1a2e", marginBottom: 28 }}>
        <Shirt size={22} color="#fb7185" style={{ display: "inline", marginRight: 8 }} />
        Order Custom Apparel
      </h2>

      {!user && (
        <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)", marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#e11d48", textAlign: "center" }}>
            <Link href="/login" style={{ color: "#8b5cf6", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to place an order request.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: 18 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Design Title *</label>
          <input className="craft-input" required placeholder="e.g. Class reunion tee with batch logo" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Type</label>
            <select className="craft-input" value={form.clothesType} onChange={e => setForm(f => ({ ...f, clothesType: e.target.value }))}>
              {clothesTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Size</label>
            <select className="craft-input" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))}>
              {sizes.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Quantity</label>
            <input className="craft-input" type="number" min="1" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Preferred Color</label>
          <input className="craft-input" placeholder="e.g. Navy blue, black, white..." value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Design Description *</label>
          <textarea className="craft-input" required rows={4} placeholder="Describe your design — text, logo, placement, colors, reference images (you can share on WhatsApp after submission)..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Budget (₹)</label>
            <input className="craft-input" type="number" placeholder="e.g. 399" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>WhatsApp Number</label>
            <input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email *</label>
          <input className="craft-input" type="email" required value={form.email} placeholder="your@email.com" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>

        <ImageUpload
          label="Design Reference (optional)"
          value={form.fileUrl}
          onChange={url => setForm(f => ({ ...f, fileUrl: url }))}
          hint="Upload your logo, design mockup, or reference image."
        />

        <button type="submit" className="btn-primary" disabled={loading || !user}
          style={{ justifyContent: "center", fontSize: 15, padding: "14px", opacity: (!user || loading) ? 0.6 : 1, background: "linear-gradient(135deg, #fb7185, #f43f5e)" }}>
          <Shirt size={16} />
          {loading ? "Submitting..." : "Submit Order Request"}
        </button>
      </div>
    </form>
  );
}

export default function CustomClothesPage() {
  return (
    <div style={{ background: "#fdfcfb" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)", borderBottom: "1px solid #fecdd340", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>👕</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>
            Custom <span style={{ color: "#fb7185" }}>Clothes</span>
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 540, margin: "0 auto", lineHeight: 1.65 }}>
            Express yourself with unique custom apparel. T-shirts, hoodies, polos — designed just for you.
          </p>
        </div>
      </div>

      {/* Ready-made clothes listing */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Ready-made Designs</h2>
        <p style={{ color: "#6b7280", marginBottom: 32 }}>Browse our existing collection or request a custom design below.</p>
      </div>
      <div style={{ padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Inline mini listing */}
        </div>
      </div>

      {/* Custom order section */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Want Something Custom?</h2>
          <p style={{ color: "#6b7280" }}>Tell us your design and we'll make it happen.</p>
        </div>
        <CustomOrderForm />
      </div>
    </div>
  );
}
