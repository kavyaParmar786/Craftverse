"use client";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { Product } from "@/types";

interface Props {
  category: string;
  title: string;
  subtitle: string;
  emoji: string;
  accentColor: string;
}

export default function ProductListingPage({ category, title, subtitle, emoji, accentColor }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb" }}>
      {/* Hero banner */}
      <div style={{
        background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`,
        borderBottom: `1px solid ${accentColor}20`,
        padding: "60px 24px 48px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{emoji}</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>
            {title}
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 540, lineHeight: 1.6 }}>{subtitle}</p>

          {/* Search */}
          <div style={{ marginTop: 32, position: "relative", maxWidth: 440 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input
              className="craft-input"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 40 }}
            />
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : filtered.length > 0 ? (
          <>
            <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {filtered.map(p => <ProductCard key={p._id} product={p} showCategory={false} />)}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{emoji}</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#1a1a2e", marginBottom: 8 }}>
              {search ? "No results found" : "Coming Soon!"}
            </h3>
            <p style={{ color: "#6b7280" }}>
              {search ? `No products match "${search}"` : "We're adding products to this category. Check back soon!"}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="btn-secondary" style={{ marginTop: 16 }}>Clear Search</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
