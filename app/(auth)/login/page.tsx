"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Feather } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm]     = useState({ email:"", password:"" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/login", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuth(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}! 👋`);
      router.push(data.user.role==="admin" ? "/admin/dashboard" : "/");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background:"rgba(253,246,238,0.88)",backdropFilter:"blur(12px)",borderRadius:24,padding:"40px 36px",border:"1px solid rgba(201,123,99,0.18)",boxShadow:"0 16px 48px rgba(44,26,14,0.1)" }}>
      <div style={{ textAlign:"center",marginBottom:32 }}>
        <Link href="/" style={{ textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10 }}>
          <div style={{ width:44,height:44,borderRadius:14,background:"linear-gradient(135deg,#C97B63,#A85E48)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(201,123,99,0.35)" }}>
            <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,color:"#FDF6EE" }}>CV</span>
          </div>
          <span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,color:"#2C1A0E" }}>Craft Verse</span>
        </Link>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:"#2C1A0E",marginTop:24,marginBottom:6 }}>Welcome back</h1>
        <p style={{ fontSize:14,color:"#8B6F5E" }}>Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Email</label>
          <input type="email" required className="craft-input" placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Password</label>
          <div style={{ position:"relative" }}>
            <input type={showPw?"text":"password"} required className="craft-input" placeholder="••••••••" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={{ paddingRight:44 }}/>
            <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#B89080" }}>
              {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ width:"100%",justifyContent:"center",fontSize:15,padding:"13px",opacity:loading?0.7:1 }}>
          {loading ? "Signing in..." : <>Sign In <ArrowRight size={16}/></>}
        </button>
      </form>

      <p style={{ textAlign:"center",fontSize:14,color:"#8B6F5E",marginTop:24 }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color:"#C97B63",fontWeight:600,textDecoration:"none" }}>Sign up free</Link>
      </p>

      <div style={{ marginTop:20,padding:"12px 16px",borderRadius:12,background:"rgba(201,123,99,0.06)",border:"1px solid rgba(201,123,99,0.15)" }}>
        <p style={{ fontSize:12,color:"#A85E48",textAlign:"center",margin:0 }}>
          <Feather size={12} style={{ display:"inline",marginRight:4 }}/>
          Admin: admin@craftverse.in / Admin@123
        </p>
      </div>
    </div>
  );
}
