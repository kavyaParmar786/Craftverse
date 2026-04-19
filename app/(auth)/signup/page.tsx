"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuth(data.user, data.token);
      toast.success("Welcome to Craft Verse!");
      router.push("/");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background: "#FAF3E8", borderRadius: 24, padding: "40px 36px", border: "1px solid rgba(62,47,47,0.10)", boxShadow: "0 8px 40px rgba(62,47,47,0.10)" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#C97B63", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: "white" }}>CV</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 19, color: "#3E2F2F" }}>Craft Verse</span>
        </Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#3E2F2F", marginTop: 24, marginBottom: 6 }}>Create your account</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060" }}>Join our creative community</p>
      </div>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
          { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</label>
            <input type={type} required className="craft-input" placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
          </div>
        ))}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} required className="craft-input" placeholder="Min 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} style={{ paddingRight: 44 }} />
            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A89080" }}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "13px", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Creating account..." : <><span>Create Account</span><ArrowRight size={15} /></>}
        </button>
      </form>
      <p style={{ fontFamily: "'Poppins',sans-serif", textAlign: "center", fontSize: 13, color: "#7A6060", marginTop: 24 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#C97B63", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
      </p>
    </div>
  );
}
