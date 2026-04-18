"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { user, token } = useAuth();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [addr, setAddr] = useState({ name: user?.name || "", street: "", city: "", state: "", pincode: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!user) { toast.error("Please login to place an order"); return; }
    if (!addr.street || !addr.city || !addr.pincode || !addr.phone) { toast.error("Fill all address fields"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.price })),
          shippingAddress: addr,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      clearCart();
      setStep("success");
      toast.success("Order placed successfully! 🎉");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
        <CheckCircle2 size={56} color="#8b5cf6" style={{ marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#1a1a2e", marginBottom: 12 }}>Order Placed!</h2>
        <p style={{ color: "#6b7280", marginBottom: 32, lineHeight: 1.6 }}>Thank you for your order! We'll confirm it via email and WhatsApp soon.</p>
        <Link href="/" className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>Continue Shopping <ArrowRight size={16} /></Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#1a1a2e", marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "#6b7280", marginBottom: 28 }}>Add some amazing products to get started!</p>
        <Link href="/diy-charts" className="btn-primary">Browse Products <ArrowRight size={16} /></Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdfcfb", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
          {step === "cart" ? "Your Cart" : "Checkout"}
        </h1>
        <p style={{ color: "#6b7280", marginBottom: 40 }}>
          {step === "cart" ? `${items.length} item${items.length !== 1 ? "s" : ""} in your cart` : "Enter your delivery details"}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
          {/* Left panel */}
          <div>
            {step === "cart" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {items.map(({ product, quantity }) => (
                  <div key={product._id} className="glass-card" style={{ padding: "20px 24px", borderRadius: 18, display: "flex", gap: 16, alignItems: "center" }}>
                    {/* Image */}
                    <div style={{ width: 72, height: 72, borderRadius: 12, background: "linear-gradient(135deg, #f5f3ff, #e0f2fe)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                      {product.category === "charts" ? "📊" : product.category === "models" ? "🏛️" : product.category === "3d-printing" ? "🖨️" : "👕"}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#1a1a2e", marginBottom: 4 }}>{product.name}</h3>
                      <p style={{ fontSize: 18, fontWeight: 700, color: "#7c3aed" }}>₹{product.price.toLocaleString("en-IN")}</p>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(139,92,246,0.06)", borderRadius: 12, padding: "4px 8px" }}>
                      <button onClick={() => updateQuantity(product._id, quantity - 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{quantity}</span>
                      <button onClick={() => updateQuantity(product._id, quantity + 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", minWidth: 80, textAlign: "right" }}>
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </p>

                    <button onClick={() => removeItem(product._id)} style={{ padding: 8, borderRadius: 10, border: "none", background: "rgba(251,113,133,0.08)", cursor: "pointer", color: "#fb7185" }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Address form */
              <div className="glass-card" style={{ padding: "32px", borderRadius: 20 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#1a1a2e", marginBottom: 24 }}>Delivery Address</h3>
                <div style={{ display: "grid", gap: 16 }}>
                  {[
                    { label: "Full Name", key: "name", placeholder: "Recipient name" },
                    { label: "Street Address", key: "street", placeholder: "House no, street, area" },
                    { label: "City", key: "city", placeholder: "City" },
                    { label: "State", key: "state", placeholder: "State" },
                    { label: "Pincode", key: "pincode", placeholder: "6-digit pincode" },
                    { label: "Phone", key: "phone", placeholder: "+91 98765 43210" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label} *</label>
                      <input className="craft-input" required placeholder={placeholder}
                        value={(addr as any)[key]}
                        onChange={e => setAddr(a => ({ ...a, [key]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="glass-card" style={{ padding: "28px", borderRadius: 20, position: "sticky", top: 88 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#1a1a2e", marginBottom: 20 }}>Order Summary</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {items.map(({ product, quantity }) => (
                <div key={product._id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280" }}>
                  <span>{product.name} × {quantity}</span>
                  <span style={{ fontWeight: 600, color: "#374151" }}>₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(139,92,246,0.1)", paddingTop: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#6b7280" }}>
                <span>Subtotal</span><span>₹{total().toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#6b7280" }}>
                <span>Shipping</span><span style={{ color: "#10b981", fontWeight: 600 }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginTop: 12 }}>
                <span>Total</span><span style={{ color: "#7c3aed" }}>₹{total().toLocaleString("en-IN")}</span>
              </div>
            </div>

            {step === "cart" ? (
              <button onClick={() => { if (!user) { toast.error("Please login first"); return; } setStep("checkout"); }}
                className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px" }}>
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleOrder} disabled={loading} className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px", opacity: loading ? 0.7 : 1 }}>
                <ShoppingBag size={16} />
                {loading ? "Placing order..." : "Place Order"}
              </button>
            )}

            {step === "checkout" && (
              <button onClick={() => setStep("cart")} className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "10px", marginTop: 10 }}>
                Back to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
