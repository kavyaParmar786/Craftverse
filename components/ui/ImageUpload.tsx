"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, CheckCircle2, Loader } from "lucide-react";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label = "Image", hint }: ImageUploadProps) {
  const { token } = useAuth();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onChange(data.url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [token, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div>
      {label && (
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5C3D2E", marginBottom: 8 }}>
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !value && !uploading && inputRef.current?.click()}
        style={{
          borderRadius: 16,
          border: `2px dashed ${dragging ? "#C97B63" : value ? "rgba(201,123,99,0.3)" : "rgba(201,123,99,0.2)"}`,
          background: dragging
            ? "rgba(201,123,99,0.06)"
            : value
            ? "rgba(253,246,238,0.4)"
            : "rgba(249,248,255,0.6)",
          transition: "all 0.25s ease",
          cursor: value || uploading ? "default" : "pointer",
          overflow: "hidden",
          position: "relative",
          minHeight: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {uploading ? (
          /* Uploading state */
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "3px solid rgba(201,123,99,0.15)",
              borderTop: "3px solid #C97B63",
              margin: "0 auto 12px",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontSize: 14, color: "#C97B63", fontWeight: 500 }}>Uploading...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

        ) : value ? (
          /* Preview state */
          <div style={{ width: "100%", position: "relative" }}>
            <img
              src={value}
              alt="Preview"
              style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
            />
            {/* Overlay on hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 10, opacity: 0, transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >
              <button
                type="button"
                onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "#FDF6EE", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#A85E48" }}
              >
                <Upload size={14} /> Replace
              </button>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); onChange(""); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(239,68,68,0.9)", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#FDF6EE" }}
              >
                <X size={14} /> Remove
              </button>
            </div>

            {/* Success badge */}
            <div style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", borderRadius: 8, background: "rgba(201,123,99,0.9)", display: "flex", alignItems: "center", gap: 5 }}>
              <CheckCircle2 size={12} color="#FDF6EE" />
              <span style={{ fontSize: 11, color: "#FDF6EE", fontWeight: 600 }}>Uploaded</span>
            </div>
          </div>

        ) : (
          /* Empty state */
          <div style={{ textAlign: "center", padding: 32 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: "linear-gradient(135deg, rgba(201,123,99,0.12), rgba(201,123,99,0.08))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
            }}>
              <ImageIcon size={22} color="#C97B63" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#5C3D2E", marginBottom: 4 }}>
              Drop image here
            </p>
            <p style={{ fontSize: 12, color: "#B89080", marginBottom: 14 }}>
              or click to browse
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 10,
              background: "linear-gradient(135deg, #C97B63, #D4906E)",
              fontSize: 13, fontWeight: 600, color: "#FDF6EE",
              boxShadow: "0 4px 12px rgba(201,123,99,0.25)",
            }}>
              <Upload size={14} /> Upload Image
            </div>
            <p style={{ fontSize: 11, color: "#E8C4A8", marginTop: 12 }}>
              JPEG · PNG · WEBP · GIF · Max 5MB
            </p>
          </div>
        )}
      </div>

      {hint && !value && !uploading && (
        <p style={{ fontSize: 11, color: "#B89080", marginTop: 6 }}>{hint}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
