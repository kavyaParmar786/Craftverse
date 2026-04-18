"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Shirt, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

const clothesTypes = ["T-Shirt", "Hoodie", "Polo Shirt", "Sweatshirt", "Jacket", "Other"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const labelStyle = { display: "block" as const, fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 as const, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

function CustomOrderForm() {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", budget: "", phone: "", email: user?.email || "", clothesType: "T-Shirt", size: "M", quantity: "1", color: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login first"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...form, type: "clothes", budget: Number(form.budget), description: `Type: ${form.clothesType}, Size: ${form.size}, Qty: ${form.quantity}, Color: ${form.color}\n\n${form.description}` }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setSubmitted(true);
      toast.success("Clothes order request submitted!");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 24px", background: "#FAF3E8", borderRadius: 22, border: "1px solid rgba(62,47,47,0.08)" }}>
      <CheckCircle2 size={52} color="#C97B63" style={{ marginBottom: 16 }} />
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>Order Request Submitted!</h3>
      <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 24, fontSize: 13 }}>We'll confirm your design and pricing within 24 hours.</p>
      <Link href="/" className="btn-primary">Back to Home <ArrowRight size={14} /></Link>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ background: "#FAF3E8", borderRadius: 22, padding: "40px", border: "1px solid rgba(62,47,47,0.08)" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#3E2F2F", display: "flex", alignItems: "center", gap: 10 }}>
          <Shirt size={20} color="#C97B63" /> Order Custom Apparel
        </h2>
        <div style={{ width: 40, height: 2.5, background: "#C97B63", borderRadius: 2, marginTop: 10 }} />
      </div>
      {!user && (
        <div style={{ padding: "12px 16px", borderRadius: 10, background: "#EAD8C0", border: "1px solid rgba(62,47,47,0.10)", marginBottom: 24 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", textAlign: "center" }}>
            <Link href="/login" style={{ color: "#C97B63", fontWeight: 600, textDecoration: "none" }}>Login</Link> required to place an order request.
          </p>
        </div>
      )}
      <div style={{ display: "grid", gap: 18 }}>
        <div><label style={labelStyle}>Design Title *</label><input className="craft-input" required placeholder="e.g. Class reunion tee with batch logo" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div><label style={labelStyle}>Type</label><select className="craft-input" value={form.clothesType} onChange={e => setForm(f => ({ ...f, clothesType: e.target.value }))}>{clothesTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          <div><label style={labelStyle}>Size</label><select className="craft-input" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))}>{sizes.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label style={labelStyle}>Quantity</label><input className="craft-input" type="number" min="1" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} /></div>
        </div>
        <div><label style={labelStyle}>Preferred Color</label><input className="craft-input" placeholder="e.g. Navy blue, black, white..." value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} /></div>
        <div><label style={labelStyle}>Design Description *</label><textarea className="craft-input" required rows={4} placeholder="Describe your design — text, logo, placement, colours..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div><label style={labelStyle}>Budget (₹)</label><input className="craft-input" type="number" placeholder="e.g. 399" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div>
          <div><label style={labelStyle}>WhatsApp Number</label><input className="craft-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
        </div>
        <div><label style={labelStyle}>Email *</label><input className="craft-input" type="email" required value={form.email} placeholder="your@email.com" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
        <button type="submit" className="btn-primary" disabled={loading || !user} style={{ justifyContent: "center", fontSize: 14, padding: "14px", opacity: (!user || loading) ? 0.6 : 1 }}>
          <Shirt size={15} />{loading ? "Submitting..." : "Submit Order Request"}
        </button>
      </div>
    </form>
  );
}

export default function CustomClothesPage() {
  return (
    <div style={{ background: "#F5E9DA" }}>
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "60px 24px 56px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 16 }}>Wearable Art</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>Custom <span style={{ color: "#C97B63", fontStyle: "italic" }}>Clothes</span></h1>
          <div className="divider" />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 480, margin: "20px auto 0", lineHeight: 1.7 }}>Express yourself with unique custom apparel. T-shirts, hoodies, polos — designed just for you.</p>
        </div>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#3E2F2F", marginBottom: 6 }}>Want Something Custom?</h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>Tell us your design and we'll make it happen.</p>
        </div>
        <CustomOrderForm />
      </div>
    </div>
  );
}
