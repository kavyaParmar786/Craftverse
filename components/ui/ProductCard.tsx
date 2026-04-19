"use client";
import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

const categoryLabel: Record<string, string> = {
  charts: "DIY Charts",
  models: "DIY Models",
  "3d-printing": "3D Printing",
  clothes: "Clothes",
};

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    setAdding(true);
    addItem(product);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="product-card" style={{
      borderRadius: 18,
      background: "#FAF3E8",
      border: "1px solid rgba(62,47,47,0.09)",
      boxShadow: "0 2px 14px rgba(62,47,47,0.07)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Image area */}
      <div style={{ position: "relative", height: 210, background: "#EAD8C0", overflow: "hidden" }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 56, color: "#C97B63", opacity: 0.3 }}>✦</span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute", top: 12, right: 12,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(250,243,232,0.92)", border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(62,47,47,0.12)",
            transition: "all 0.2s",
          }}
        >
          <Heart size={14} fill={liked ? "#C97B63" : "none"} color={liked ? "#C97B63" : "#A89080"} />
        </button>

        {/* Category badge */}
        {showCategory && (
          <div style={{
            position: "absolute", top: 12, left: 12,
            padding: "3px 10px", borderRadius: 50,
            background: "rgba(250,243,232,0.92)",
            fontFamily: "'Poppins',sans-serif",
            fontSize: 10, fontWeight: 600, color: "#C97B63",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {categoryLabel[product.category] || product.category}
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <div style={{
            position: "absolute", bottom: 10, left: 12,
            padding: "3px 10px", borderRadius: 50,
            background: "#C97B63",
            fontFamily: "'Poppins',sans-serif",
            fontSize: 10, fontWeight: 700, color: "white", letterSpacing: "0.1em",
          }}>✦ FEATURED</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 16, fontWeight: 600, color: "#3E2F2F",
          lineHeight: 1.3, margin: "0 0 6px",
        }}>{product.name}</h3>

        <p style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 12.5, color: "#7A6060", lineHeight: 1.55,
          margin: "0 0 12px",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{product.description}</p>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 14 }}>
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={11} fill={i <= 4 ? "#C97B63" : "none"} color={i <= 4 ? "#C97B63" : "#EAD8C0"} />
          ))}
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", marginLeft: 4 }}>(24)</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#C97B63" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAdd}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 50, border: "none",
              background: adding ? "#EAD8C0" : "#C97B63",
              color: adding ? "#C97B63" : "white",
              cursor: "pointer",
              fontFamily: "'Poppins',sans-serif",
              fontSize: 12, fontWeight: 600,
              transition: "all 0.25s",
              transform: adding ? "scale(0.96)" : "scale(1)",
            }}
          >
            <ShoppingCart size={13} />
            {adding ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
