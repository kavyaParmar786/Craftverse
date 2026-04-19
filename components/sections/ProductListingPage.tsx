"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
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
    <div style={{ minHeight: "100vh", background: "#F5E9DA" }}>
      {/* Hero */}
      <div style={{ background: "#EAD8C0", borderBottom: "1px solid rgba(62,47,47,0.10)", padding: "60px 24px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="badge" style={{ marginBottom: 16 }}>{emoji} {category.charAt(0).toUpperCase() + category.slice(1)}</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,50px)", fontWeight: 700, color: "#3E2F2F", marginBottom: 10 }}>{title}</h1>
          <div style={{ width: 48, height: 3, background: "#C97B63", borderRadius: 2, marginBottom: 16 }} />
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, color: "#7A6060", maxWidth: 520, lineHeight: 1.7 }}>{subtitle}</p>
          {/* Search */}
          <div style={{ marginTop: 28, position: "relative", maxWidth: 400 }}>
            <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#A89080" }} />
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

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : filtered.length > 0 ? (
          <>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#A89080", marginBottom: 24, letterSpacing: "0.04em" }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {filtered.map(p => <ProductCard key={p._id} product={p} showCategory={false} />)}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, color: "#C97B63", opacity: 0.3, marginBottom: 16 }}>✦</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#3E2F2F", marginBottom: 8 }}>
              {search ? "No results found" : "Coming Soon!"}
            </h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>
              {search ? `No products match "${search}"` : "We're adding products to this category. Check back soon!"}
            </p>
            {search && <button onClick={() => setSearch("")} className="btn-secondary" style={{ marginTop: 16 }}>Clear Search</button>}
          </div>
        )}
      </div>
    </div>
  );
}
