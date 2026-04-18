"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { NewsPost } from "@/types";

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <div className="paper-card product-card" style={{ borderRadius: 18, overflow: "hidden" }}>
      <div style={{ height: 160, background: "#EAD8C0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, color: "#C97B63", opacity: 0.4 }}>
          {post.tags?.includes("3D Printing") ? "◈" : post.tags?.includes("DIY") ? "✦" : post.tags?.includes("Clothes") ? "◎" : "→"}
        </div>
      </div>
      <div style={{ padding: "22px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {post.tags?.slice(0, 2).map(tag => (
            <span key={tag} style={{ fontFamily: "'Poppins',sans-serif", padding: "3px 10px", borderRadius: 50, background: "#EAD8C0", fontSize: 10, fontWeight: 600, color: "#C97B63", letterSpacing: "0.06em", textTransform: "uppercase" }}>{tag}</span>
          ))}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: "#3E2F2F", marginBottom: 9, lineHeight: 1.35 }}>{post.title}</h3>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", lineHeight: 1.65, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid rgba(62,47,47,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Poppins',sans-serif", color: "#A89080", fontSize: 11 }}>
            <Calendar size={11} />
            <span>{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#C97B63" }}>{post.author}</span>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news").then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "72px 24px 64px", textAlign: "center" }}>
        <div className="badge" style={{ marginBottom: 16 }}>Latest from Us</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 12 }}>News & Updates</h1>
        <div className="divider" />
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 460, margin: "20px auto 0" }}>Stay up to date with the latest from Craft Verse — new products, tips, and stories.</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(62,47,47,0.08)" }}>
                <div className="skeleton" style={{ height: 160 }} />
                <div style={{ padding: 22, background: "#FAF3E8" }}>
                  <div className="skeleton" style={{ height: 12, width: "40%", marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 18, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 13, marginBottom: 4 }} />
                  <div className="skeleton" style={{ height: 13, width: "70%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {posts.map(p => <NewsCard key={p._id} post={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, color: "#C97B63", opacity: 0.3, marginBottom: 16 }}>→</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>No posts yet</h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>We're writing our first articles. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
