"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm]     = useState({ name:"", email:"", password:"" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/register", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuth(data.user, data.token);
      toast.success("Account created! Welcome to Craft Verse 🎉");
      router.push("/");
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
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:"#2C1A0E",marginTop:24,marginBottom:6 }}>Create your account</h1>
        <p style={{ fontSize:14,color:"#8B6F5E" }}>Join thousands of creators</p>
      </div>

      <form onSubmit={handleSubmit}>
        {[
          { label:"Full Name", key:"name",     type:"text",  placeholder:"Your name" },
          { label:"Email",     key:"email",    type:"email", placeholder:"you@example.com" },
        ].map(({ label,key,type,placeholder }) => (
          <div key={key} style={{ marginBottom:16 }}>
            <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>{label}</label>
            <input type={type} required className="craft-input" placeholder={placeholder} value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/>
          </div>
        ))}
        <div style={{ marginBottom:24 }}>
          <label style={{ display:"block",fontSize:13,fontWeight:600,color:"#5C3D2E",marginBottom:6 }}>Password</label>
          <div style={{ position:"relative" }}>
            <input type={showPw?"text":"password"} required className="craft-input" placeholder="Min 6 characters" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={{ paddingRight:44 }}/>
            <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#B89080" }}>
              {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ width:"100%",justifyContent:"center",fontSize:15,padding:"13px",opacity:loading?0.7:1 }}>
          {loading ? "Creating account..." : <>Create Account <ArrowRight size={16}/></>}
        </button>
      </form>

      <p style={{ textAlign:"center",fontSize:14,color:"#8B6F5E",marginTop:24 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color:"#C97B63",fontWeight:600,textDecoration:"none" }}>Sign in</Link>
      </p>
    </div>
  );
}
