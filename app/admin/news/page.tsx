"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Plus, Trash2, X, Check, Newspaper } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";

const emptyForm = { title: "", excerpt: "", content: "", author: "Craft Verse Team", tags: "", coverImage: "", published: true };
const LBL = ({ children }: { children: string }) => <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#3E2F2F", marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{children}</label>;

function NewsModal({ onClose, onSave, token }: { onClose: () => void; onSave: () => void; token: string | null }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...form, tags: typeof form.tags === "string" ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : form.tags };
      const res = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("Post published!");
      onSave();
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(62,47,47,0.3)", backdropFilter: "blur(4px)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 580, background: "#FAF3E8", borderRadius: 20, padding: "32px", border: "1px solid rgba(62,47,47,0.10)", boxShadow: "0 16px 48px rgba(62,47,47,0.15)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#3E2F2F", margin: 0 }}>New Post</h2>
          <button onClick={onClose} style={{ padding: 7, borderRadius: 8, border: "none", background: "rgba(180,60,60,0.08)", cursor: "pointer" }}><X size={15} color="#B43C3C" /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <div><LBL>Title *</LBL><input className="craft-input" required value={form.title} onChange={e => set("title", e.target.value)} placeholder="Post title" /></div>
          <div><LBL>Excerpt *</LBL><textarea className="craft-input" required rows={2} style={{ resize: "vertical" }} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary shown in listings..." /></div>
          <div><LBL>Content *</LBL><textarea className="craft-input" required rows={6} style={{ resize: "vertical" }} value={form.content} onChange={e => set("content", e.target.value)} placeholder="Full post content..." /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><LBL>Author</LBL><input className="craft-input" value={form.author} onChange={e => set("author", e.target.value)} /></div>
            <div><LBL>Tags (comma separated)</LBL><input className="craft-input" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="DIY, Tips, News" /></div>
          </div>
          <div><LBL>Cover Image URL</LBL><input className="craft-input" value={form.coverImage} onChange={e => set("coverImage", e.target.value)} placeholder="https://..." /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" id="pub" checked={form.published} onChange={e => set("published", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#C97B63" }} />
            <label htmlFor="pub" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", cursor: "pointer" }}>Publish immediately</label>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
              <Check size={14} />{loading ? "Publishing..." : "Publish Post"}
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
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/news", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      const slug = posts.find(p => p._id === id)?.slug;
      if (slug) await fetch(`/api/news/${slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      toast.success("Post deleted");
      fetchPosts();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>News</h1>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>{posts.length} posts published</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary"><Plus size={15} /> New Post</button>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 14 }} />)}</div>
      ) : posts.length === 0 ? (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <Newspaper size={40} color="#EAD8C0" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#3E2F2F", marginBottom: 6 }}>No Posts Yet</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", marginBottom: 18, fontSize: 13 }}>Create your first news post.</p>
          <button onClick={() => setModalOpen(true)} className="btn-primary"><Plus size={14} /> New Post</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {posts.map((post, i) => (
            <div key={post._id} style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{post.title}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: "3px 0 0" }}>
                  {post.author} · {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {post.tags?.length > 0 && ` · ${post.tags.join(", ")}`}
                </p>
              </div>
              <span style={{ fontFamily: "'Poppins',sans-serif", padding: "3px 10px", borderRadius: 50, fontSize: 10, fontWeight: 600, background: post.published ? "rgba(76,100,68,0.12)" : "#EAD8C0", color: post.published ? "#4C6444" : "#A89080", letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>
                {post.published ? "Published" : "Draft"}
              </span>
              <button onClick={() => handleDelete(post._id)} style={{ padding: "6px 9px", borderRadius: 8, border: "none", background: "rgba(180,60,60,0.08)", cursor: "pointer", color: "#B43C3C", flexShrink: 0 }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
      {modalOpen && <NewsModal token={token} onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); fetchPosts(); }} />}
    </div>
  );
}
