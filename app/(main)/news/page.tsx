"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { NewsPost } from "@/types";

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <div className="product-card glass-card" style={{ borderRadius: 20, overflow: "hidden" }}>
      {/* Cover */}
      <div style={{ height: 180, background: "linear-gradient(135deg, #ede9fe, #bae6fd, #fecdd3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
        {post.tags?.includes("3D Printing") ? "🖨️" : post.tags?.includes("DIY") ? "🛠️" : post.tags?.includes("Clothes") ? "👕" : "📰"}
      </div>

      <div style={{ padding: "24px" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {post.tags?.slice(0, 2).map(tag => (
            <span key={tag} style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(139,92,246,0.08)", fontSize: 11, fontWeight: 600, color: "#7c3aed" }}>
              {tag}
            </span>
          ))}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 10, lineHeight: 1.35 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9ca3af", fontSize: 12 }}>
            <Calendar size={12} />
            <span>{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6" }}>{post.author}</span>
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
    <div style={{ minHeight: "100vh", background: "#fdfcfb" }}>
      <div style={{ background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)", borderBottom: "1px solid #fecdd330", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📰</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>
          News & <span style={{ color: "#fb7185" }}>Updates</span>
        </h1>
        <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto" }}>Stay up to date with the latest from Craft Verse — new products, tips, and stories.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(139,92,246,0.08)" }}>
                <div className="skeleton" style={{ height: 180 }} />
                <div style={{ padding: 24 }}>
                  <div className="skeleton" style={{ height: 14, width: "40%", marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 20, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, marginBottom: 4 }} />
                  <div className="skeleton" style={{ height: 14, width: "70%" }} />
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
            <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#1a1a2e", marginBottom: 8 }}>No posts yet</h3>
            <p style={{ color: "#6b7280" }}>We're writing our first articles. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
