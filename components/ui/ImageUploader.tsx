"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  value: string;           // current image URL
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string[]>(value ? [value] : []);
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "craftverse";

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      const all = [...preview, ...urls];
      setPreview(all);
      setIndex(all.length - 1);
      onChange(all[all.length - 1]); // set last uploaded as value
    } catch {
      // fallback: show local preview without upload
      const url = URL.createObjectURL(files[0]);
      setPreview(p => [...p, url]);
      onChange(url);
    } finally {
      setUploading(false);
    }
  }, [preview, onChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const remove = (i: number) => {
    const next = preview.filter((_, idx) => idx !== i);
    setPreview(next);
    const newIdx = Math.min(index, next.length - 1);
    setIndex(newIdx < 0 ? 0 : newIdx);
    onChange(next[newIdx] || "");
  };

  const prev = () => { const n = (index - 1 + preview.length) % preview.length; setIndex(n); onChange(preview[n]); };
  const next = () => { const n = (index + 1) % preview.length; setIndex(n); onChange(preview[n]); };

  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#3E2F2F", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </label>

      {/* Top buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button type="button" onClick={() => inputRef.current?.click()}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 8, border: "none", background: "#C97B63", color: "white", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          <Upload size={13} /> {uploading ? "Uploading..." : "Upload Files"}
        </button>
        {preview.length > 0 && (
          <button type="button" onClick={() => { setPreview([]); onChange(""); setIndex(0); }}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 8, border: "none", background: "rgba(201,123,99,0.15)", color: "#C97B63", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Drop zone + carousel */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
        {/* Prev arrow */}
        <button type="button" onClick={prev} disabled={preview.length <= 1}
          style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", cursor: preview.length > 1 ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ChevronLeft size={18} color={preview.length > 1 ? "#C97B63" : "#EAD8C0"} />
        </button>

        {/* Main drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            flex: 1,
            minHeight: 140,
            borderRadius: 12,
            border: `2px dashed ${dragging ? "#C97B63" : "rgba(201,123,99,0.3)"}`,
            background: dragging ? "rgba(201,123,99,0.06)" : "#FAF3E8",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
          onClick={() => !preview.length && inputRef.current?.click()}
        >
          {uploading ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid #EAD8C0", borderTopColor: "#C97B63", animation: "spin 0.8s linear infinite", margin: "0 auto 8px" }} />
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080" }}>Uploading...</p>
            </div>
          ) : preview.length > 0 ? (
            <>
              <img src={preview[index]} alt="Preview" style={{ width: "100%", height: 140, objectFit: "cover" }} />
              {/* Remove current */}
              <button type="button" onClick={e => { e.stopPropagation(); remove(index); }}
                style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderRadius: "50%", border: "none", background: "rgba(62,47,47,0.6)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={12} color="white" />
              </button>
              {/* Dot indicators */}
              {preview.length > 1 && (
                <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                  {preview.map((_, i) => (
                    <div key={i} onClick={e => { e.stopPropagation(); setIndex(i); onChange(preview[i]); }}
                      style={{ width: i === index ? 16 : 6, height: 6, borderRadius: 3, background: i === index ? "#C97B63" : "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.2s" }} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 24px" }}>
              <Upload size={22} color="#EAD8C0" style={{ marginBottom: 8 }} />
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#C97B63", fontWeight: 500, margin: 0 }}>Drop Your Files Here</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: "4px 0 0" }}>or click Upload Files above</p>
            </div>
          )}
        </div>

        {/* Next arrow */}
        <button type="button" onClick={next} disabled={preview.length <= 1}
          style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", cursor: preview.length > 1 ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ChevronRight size={18} color={preview.length > 1 ? "#C97B63" : "#EAD8C0"} />
        </button>
      </div>

      {/* Hidden file input */}
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }}
        onChange={e => handleFiles(e.target.files)} />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
