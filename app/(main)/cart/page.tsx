"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

const labelStyle = { display: "block" as const, fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 as const, color: "#3E2F2F", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" as const };

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
      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ items: items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.price })), shippingAddress: addr }) });
      if (!res.ok) throw new Error((await res.json()).error);
      clearCart(); setStep("success");
      toast.success("Order placed successfully!");
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  if (step === "success") return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <CheckCircle2 size={64} color="#C97B63" style={{ marginBottom: 20 }} />
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "#3E2F2F", marginBottom: 12 }}>Order Placed!</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 32, lineHeight: 1.7, fontSize: 14 }}>Thank you for your order! We'll confirm it via email and WhatsApp soon.</p>
        <Link href="/" className="btn-primary">Continue Shopping <ArrowRight size={15} /></Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 64, color: "#C97B63", opacity: 0.3, marginBottom: 16 }}>◎</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "#3E2F2F", marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 28, fontSize: 13 }}>Add some amazing products to get started!</p>
        <Link href="/diy-charts" className="btn-primary">Browse Products <ArrowRight size={15} /></Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F5E9DA", padding: "48px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 700, color: "#3E2F2F", marginBottom: 6 }}>{step === "cart" ? "Your Cart" : "Checkout"}</h1>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", marginBottom: 36, fontSize: 13 }}>{step === "cart" ? `${items.length} item${items.length !== 1 ? "s" : ""} in your cart` : "Enter your delivery details"}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
          <div>
            {step === "cart" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map(({ product, quantity }) => (
                  <div key={product._id} style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.08)", borderRadius: 16, padding: "18px 22px", display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: "#EAD8C0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#C97B63", opacity: 0.6 }}>✦</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, color: "#3E2F2F", marginBottom: 3 }}>{product.name}</h3>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16, fontWeight: 700, color: "#C97B63" }}>₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#EAD8C0", borderRadius: 10, padding: "4px 8px" }}>
                      <button onClick={() => updateQuantity(product._id, quantity - 1)} style={{ width: 26, height: 26, borderRadius: 8, border: "none", background: "#FAF3E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={11} /></button>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, minWidth: 18, textAlign: "center" }}>{quantity}</span>
                      <button onClick={() => updateQuantity(product._id, quantity + 1)} style={{ width: 26, height: 26, borderRadius: 8, border: "none", background: "#FAF3E8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={11} /></button>
                    </div>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15, fontWeight: 700, color: "#3E2F2F", minWidth: 72, textAlign: "right" }}>₹{(product.price * quantity).toLocaleString("en-IN")}</p>
                    <button onClick={() => removeItem(product._id)} style={{ padding: 8, borderRadius: 10, border: "none", background: "rgba(201,123,99,0.10)", cursor: "pointer", color: "#C97B63" }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: "#FAF3E8", borderRadius: 18, padding: "32px", border: "1px solid rgba(62,47,47,0.08)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#3E2F2F", marginBottom: 22 }}>Delivery Address</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  {[{ label: "Full Name", key: "name", placeholder: "Recipient name" }, { label: "Street Address", key: "street", placeholder: "House no, street, area" }, { label: "City", key: "city", placeholder: "City" }, { label: "State", key: "state", placeholder: "State" }, { label: "Pincode", key: "pincode", placeholder: "6-digit pincode" }, { label: "Phone", key: "phone", placeholder: "+91 98765 43210" }].map(({ label, key, placeholder }) => (
                    <div key={key}><label style={labelStyle}>{label} *</label><input className="craft-input" required placeholder={placeholder} value={(addr as any)[key]} onChange={e => setAddr(a => ({ ...a, [key]: e.target.value }))} /></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ background: "#FAF3E8", borderRadius: 18, padding: "26px", border: "1px solid rgba(62,47,47,0.08)", position: "sticky", top: 88 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#3E2F2F", marginBottom: 18 }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {items.map(({ product, quantity }) => (
                <div key={product._id} style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060" }}>
                  <span>{product.name} × {quantity}</span>
                  <span style={{ fontWeight: 600, color: "#3E2F2F" }}>₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(62,47,47,0.08)", paddingTop: 14, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", marginBottom: 6 }}><span>Subtotal</span><span>₹{total().toLocaleString("en-IN")}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#7A6060", marginBottom: 10 }}><span>Shipping</span><span style={{ color: "#C97B63", fontWeight: 600 }}>Free</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700, color: "#3E2F2F" }}><span>Total</span><span style={{ color: "#C97B63" }}>₹{total().toLocaleString("en-IN")}</span></div>
            </div>
            {step === "cart" ? (
              <button onClick={() => { if (!user) { toast.error("Please login first"); return; } setStep("checkout"); }} className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px" }}>Proceed to Checkout <ArrowRight size={14} /></button>
            ) : (
              <button onClick={handleOrder} disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px", opacity: loading ? 0.7 : 1 }}>
                <ShoppingBag size={15} />{loading ? "Placing order..." : "Place Order"}
              </button>
            )}
            {step === "checkout" && <button onClick={() => setStep("cart")} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "10px", marginTop: 10 }}>Back to Cart</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
