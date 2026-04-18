"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = async () => {
    setAdding(true);
    addItem(product);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdding(false), 600);
  };

  const categoryColor: Record<string, string> = {
    charts: "#8b5cf6",
    models: "#0ea5e9",
    "3d-printing": "#10b981",
    clothes: "#fb7185",
  };

  const categoryLabel: Record<string, string> = {
    charts: "DIY Charts",
    models: "DIY Models",
    "3d-printing": "3D Printing",
    clothes: "Clothes",
  };

  return (
    <div className="product-card" style={{
      borderRadius: 20,
      background: "rgba(255,255,255,0.9)",
      border: "1px solid rgba(139,92,246,0.1)",
      boxShadow: "0 4px 20px rgba(139,92,246,0.07)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Image */}
      <div style={{ position: "relative", height: 220, background: "linear-gradient(135deg, #f5f3ff, #e0f2fe)", overflow: "hidden" }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 56 }}>
              {product.category === "charts" ? "📊" : product.category === "models" ? "🏛️" : product.category === "3d-printing" ? "🖨️" : "👕"}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute", top: 12, right: 12,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)", border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
          }}
        >
          <Heart size={16} fill={liked ? "#fb7185" : "none"} color={liked ? "#fb7185" : "#9ca3af"} />
        </button>

        {/* Category badge */}
        {showCategory && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            padding: "4px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.9)",
            fontSize: 11, fontWeight: 600,
            color: categoryColor[product.category] || "#8b5cf6",
            letterSpacing: "0.05em",
          }}>
            {categoryLabel[product.category]}
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <div style={{
            position: "absolute", bottom: 12, left: 12,
            padding: "3px 10px", borderRadius: 6,
            background: "linear-gradient(135deg, #8b5cf6, #0ea5e9)",
            fontSize: 10, fontWeight: 700, color: "white", letterSpacing: "0.08em",
          }}>★ FEATURED</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3, margin: 0 }}>
            {product.name}
          </h3>
        </div>

        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, margin: "0 0 14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>

        {/* Rating (mock) */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={12} fill={i <= 4 ? "#fbbf24" : "none"} color={i <= 4 ? "#fbbf24" : "#d1d5db"} />
          ))}
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>(24)</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#7c3aed" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAdd}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 12, border: "none",
              background: adding ? "rgba(139,92,246,0.15)" : "linear-gradient(135deg, #8b5cf6, #0ea5e9)",
              color: adding ? "#7c3aed" : "white",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
              transition: "all 0.3s", transform: adding ? "scale(0.95)" : "scale(1)",
              boxShadow: adding ? "none" : "0 4px 12px rgba(139,92,246,0.3)",
            }}
          >
            <ShoppingCart size={14} />
            {adding ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
