"use client";
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, BarChart3, Package, Sparkles, Printer, Shirt, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";

/* ─────────────────── DATA ─────────────────── */
const categories = [
  { icon: BarChart3, label: "DIY Charts", desc: "Hand-crafted charts for school & college projects, beautifully made", href: "/diy-charts", emoji: "📊", rot: -2 },
  { icon: Package, label: "DIY Models", desc: "Working 3D models for science & geography — built with care", href: "/diy-models", emoji: "📦", rot: 1 },
  { icon: Sparkles, label: "Custom Projects", desc: "Your idea, our hands. We build it from scratch, just for you", href: "/custom-models", emoji: "✦", rot: -1 },
  { icon: Printer, label: "3D Printing", desc: "Upload your design — we print it with precision and craft", href: "/3d-printing", emoji: "🖨", rot: 2 },
  { icon: Shirt, label: "Custom Clothes", desc: "Wearable art — apparel designed exactly as you imagine it", href: "/custom-clothes", emoji: "✂", rot: -2 },
];

/* ─────────── CATEGORY CARD (FIXED) ─────────── */
function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={cat.href}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          background: "#FAF3E8",
          border: `1px solid ${hov ? "rgba(201,123,99,0.35)" : "rgba(62,47,47,0.1)"}`,
          borderRadius: 22,
          boxShadow: hov
            ? "0 20px 50px rgba(62,47,47,0.15)"
            : "0 2px 12px rgba(62,47,47,0.07)",
          padding: "30px 26px",
          height: "100%",
          transition: "all 0.25s",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <cat.icon size={24} color="#C97B63" />
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 18,
            fontWeight: 600,
            color: hov ? "#C97B63" : "#3E2F2F",
            marginBottom: 10,
            transition: "color 0.2s",
          }}
        >
          {cat.label}
        </h3>

        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: 13,
            color: "#7A6060",
            lineHeight: 1.7,
          }}
        >
          {cat.desc}
        </p>
      </div>
    </Link>
  );
}

/* ─────────── MAIN PAGE ─────────── */
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=4")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#F5E9DA", padding: 40 }}>
      <h1 style={{ fontSize: 42, marginBottom: 40 }}>Craft Verse</h1>

      {/* Categories */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {categories.map((cat, i) => (
          <CategoryCard key={i} cat={cat} index={i} />
        ))}
      </div>

      {/* Products */}
      <div style={{ marginTop: 60 }}>
        <h2>Featured Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
