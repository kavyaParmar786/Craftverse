"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Plus, Trash2, X, Check, Newspaper } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

const emptyForm = { title: "", excerpt: "", content: "", author: "Craft Verse Team", tags: "", coverImage: "", published: true };

function NewsModal({ post, onClose, onSave, token }: { post: any; onClose: () => void; onSave: () => void; token: string | null }) {
  const [form, setForm] = useState(post || { ...emptyForm });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, tags: typeof form.tags === "string" ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : form.tags };
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("Post published!");
      onSave();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)", padding: 24 }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: 600, borderRadius: 24, padding: "36px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>New Post</h2>
          <button onClick={onClose} style={{ padding: 8, borderRadius: 10, border: "none", background: "rgba(239,68,68,0.08)", cursor: "pointer" }}><X size={16} color="#ef4444" /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Title *</label>
            <input className="craft-input" required value={form.title} onChange={e => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Post title" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Excerpt *</label>
            <textarea className="craft-input" required rows={2} style={{ resize: "vertical" }} value={form.excerpt} onChange={e => setForm((f: any) => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary shown in listings..." />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Content *</label>
            <textarea className="craft-input" required rows={6} style={{ resize: "vertical" }} value={form.content} onChange={e => setForm((f: any) => ({ ...f, content: e.target.value }))} placeholder="Full post content..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Author</label>
              <input className="craft-input" value={form.author} onChange={e => setForm((f: any) => ({ ...f, author: e.target.value }))} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Tags (comma-separated)</label>
              <input className="craft-input" value={typeof form.tags === "object" ? form.tags.join(", ") : form.tags} onChange={e => setForm((f: any) => ({ ...f, tags: e.target.value }))} placeholder="DIY, Education, Tips" />
            </div>
          </div>
          <ImageUpload
            label="Cover Image"
            value={form.coverImage}
            onChange={url => setForm((f: any) => ({ ...f, coverImage: url }))}
            hint="Optional cover image for the blog post."
          />
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
              <Check size={15} /> {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminNewsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const fetchPosts = () => {
    fetch("/api/news", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>News & Blog</h1>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{posts.length} published posts</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary"><Plus size={16} /> New Post</button>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 12 }}>
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card" style={{ padding: "72px 24px", borderRadius: 22, textAlign: "center" }}>
          <Newspaper size={48} color="#e5e7eb" style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#1a1a2e", marginBottom: 8 }}>No Posts Yet</h3>
          <p style={{ color: "#9ca3af", marginBottom: 20 }}>Publish your first article.</p>
          <button onClick={() => setModal(true)} className="btn-primary"><Plus size={15} /> Write Post</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.map((post, i) => (
            <div key={post._id} className="glass-card" style={{ padding: "20px 24px", borderRadius: 18, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0" }}>{post.author} · {new Date(post.createdAt).toLocaleDateString("en-IN")} · {post.tags?.join(", ")}</p>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: "rgba(16,185,129,0.1)", color: "#059669" }}>Published</span>
            </div>
          ))}
        </div>
      )}

      {modal && <NewsModal post={null} token={token} onClose={() => setModal(false)} onSave={() => { setModal(false); fetchPosts(); }} />}
    </div>
  );
}
