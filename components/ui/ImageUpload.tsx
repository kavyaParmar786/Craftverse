"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, X, CheckCircle2, ImageIcon } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label, hint }: ImageUploadProps) {
  const { token } = useAuth();
  const [dragging,  setDragging]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res  = await fetch("/api/upload", { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body:form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onChange(data.url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally { setUploading(false); }
  }, [token, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  return (
    <div style={{ marginBottom: 4 }}>
      {label && (
        <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--text)", marginBottom:8, fontFamily:"var(--font-sans)" }}>
          {label}
        </label>
      )}

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !value && !uploading && inputRef.current?.click()}
        style={{
          borderRadius:"var(--radius)",
          border:`2px dashed ${dragging ? "var(--accent)" : value ? "rgba(201,123,99,0.35)" : "var(--border)"}`,
          background: dragging ? "rgba(201,123,99,0.05)" : "var(--paper)",
          transition:"all 0.22s ease",
          cursor: value||uploading ? "default" : "pointer",
          overflow:"hidden", position:"relative",
          minHeight:160, display:"flex", alignItems:"center", justifyContent:"center",
        }}
      >
        {uploading ? (
          <div style={{ textAlign:"center", padding:32 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", border:"3px solid var(--bg-soft)", borderTop:"3px solid var(--accent)", margin:"0 auto 12px", animation:"imgSpin 0.8s linear infinite" }}/>
            <p style={{ fontSize:13, color:"var(--accent)", fontWeight:500, fontFamily:"var(--font-sans)" }}>Uploading…</p>
          </div>

        ) : value ? (
          <div style={{ width:"100%", position:"relative" }}>
            <img src={value} alt="Preview" style={{ width:"100%", height:200, objectFit:"cover", display:"block" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(62,47,47,0.55)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, opacity:0, transition:"opacity 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.opacity="1")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="0")}
            >
              <button type="button" onClick={e=>{e.stopPropagation();inputRef.current?.click();}}
                style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:50,background:"var(--paper)",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,color:"var(--accent)",fontFamily:"var(--font-sans)" }}>
                <Upload size={13}/> Replace
              </button>
              <button type="button" onClick={e=>{e.stopPropagation();onChange("");}}
                style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:50,background:"rgba(62,47,47,0.85)",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,color:"#FAF3E8",fontFamily:"var(--font-sans)" }}>
                <X size={13}/> Remove
              </button>
            </div>
            <div style={{ position:"absolute",top:10,right:10,display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:50,background:"rgba(201,123,99,0.92)" }}>
              <CheckCircle2 size={11} color="#FAF3E8"/>
              <span style={{ fontSize:11,color:"#FAF3E8",fontWeight:600,fontFamily:"var(--font-sans)" }}>Uploaded</span>
            </div>
          </div>

        ) : (
          <div style={{ textAlign:"center", padding:"32px 24px" }}>
            <div style={{ width:52,height:52,borderRadius:16,background:"var(--bg-soft)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
              <ImageIcon size={22} color="var(--accent)"/>
            </div>
            <p style={{ fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:4,fontFamily:"var(--font-sans)" }}>
              {dragging ? "Drop it here!" : "Drop image here"}
            </p>
            <p style={{ fontSize:12,color:"var(--text-light)",marginBottom:16,fontFamily:"var(--font-sans)" }}>or click to browse</p>
            <div className="btn-primary" style={{ fontSize:13,padding:"9px 20px",pointerEvents:"none" }}>
              <Upload size={13}/> Choose File
            </div>
            <p style={{ fontSize:11,color:"var(--text-light)",marginTop:12,fontFamily:"var(--font-sans)" }}>JPEG · PNG · WEBP · GIF · Max 5MB</p>
          </div>
        )}
      </div>

      {hint && !value && !uploading && (
        <p style={{ fontSize:11,color:"var(--text-light)",marginTop:6,fontFamily:"var(--font-sans)" }}>{hint}</p>
      )}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display:"none" }} onChange={handleFile}/>
      <style>{`@keyframes imgSpin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
