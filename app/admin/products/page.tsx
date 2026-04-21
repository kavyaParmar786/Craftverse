"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { Plus, Pencil, Trash2, X, Check, Package } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";
import toast from "react-hot-toast";
import { Product } from "@/types";

type FormState = { name: string; price: string; category: string; description: string; stock: string; featured: boolean; image: string; };
const emptyForm: FormState = { name: "", price: "", category: "charts", description: "", stock: "10", featured: false, image: "" };
const LBL = ({ children }: { children: string }) => <label style={{ display: "block", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#3E2F2F", marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{children}</label>;
const TH = ({ children }: { children: string }) => <th style={{ padding: "10px 18px", textAlign: "left", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: "#7A6060", textTransform: "uppercase" as const, letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{children}</th>;

function ProductModal({ product, onClose, onSave, token }: { product: Product | null; onClose: () => void; onSave: () => void; token: string | null; }) {
  const [form, setForm] = useState<FormState>(
    product ? { name: product.name, price: String(product.price), category: product.category, description: product.description, stock: String(product.stock), featured: product.featured, image: product.image } : { ...emptyForm }
  );
  const [loading, setLoading] = useState(false);
  const set = (k: keyof FormState, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch(product?._id ? `/api/products/${product._id}` : "/api/products", {
        method: product?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success(product?._id ? "Product updated!" : "Product created!");
      onSave();
    } catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(62,47,47,0.3)", backdropFilter: "blur(4px)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520, background: "#FAF3E8", borderRadius: 20, padding: "32px", border: "1px solid rgba(62,47,47,0.10)", boxShadow: "0 16px 48px rgba(62,47,47,0.15)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#3E2F2F", margin: 0 }}>{product?._id ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} style={{ padding: 7, borderRadius: 8, border: "none", background: "rgba(180,60,60,0.08)", cursor: "pointer" }}><X size={15} color="#B43C3C" /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <div><LBL>Product Name *</LBL><input className="craft-input" required value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Solar System Model" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><LBL>Price (₹) *</LBL><input className="craft-input" required type="number" min="0" value={form.price} onChange={e => set("price", e.target.value)} placeholder="299" /></div>
            <div><LBL>Stock</LBL><input className="craft-input" type="number" min="0" value={form.stock} onChange={e => set("stock", e.target.value)} placeholder="10" /></div>
          </div>
          <div><LBL>Category *</LBL>
            <select className="craft-input" value={form.category} onChange={e => set("category", e.target.value)}>
              <option value="charts">DIY Charts</option><option value="models">DIY Models</option><option value="3d-printing">3D Printing</option><option value="clothes">Custom Clothes</option>
            </select>
          </div>
          <ImageUpload label="Product Image" value={form.image} onChange={url => set("image", url)} hint="Drag & drop or click — shown on product cards." />
          <div><LBL>Description *</LBL><textarea className="craft-input" required rows={3} style={{ resize: "vertical" }} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the product..." /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#C97B63" }} />
            <label htmlFor="featured" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#7A6060", cursor: "pointer" }}>Mark as Featured</label>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
              <Check size={14} />{loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setProducts(d.products || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try { await fetch(`/api/products/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); toast.success("Product deleted"); fetchProducts(); }
    catch { toast.error("Delete failed"); }
  };

  const catLabel: Record<string, string> = { charts: "DIY Charts", models: "DIY Models", "3d-printing": "3D Printing", clothes: "Clothes" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#3E2F2F", marginBottom: 4 }}>Products</h1>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#7A6060", fontSize: 13 }}>{products.length} products in catalog</p>
        </div>
        <button onClick={() => setModal({ open: true, product: null })} className="btn-primary"><Plus size={15} /> Add Product</button>
      </div>

      {loading ? (
        <div style={{ display: "grid", gap: 10 }}>{[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 12 }} />)}</div>
      ) : products.length === 0 ? (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, padding: "60px 24px", textAlign: "center" }}>
          <Package size={40} color="#EAD8C0" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#3E2F2F", marginBottom: 6 }}>No Products Yet</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#A89080", marginBottom: 18, fontSize: 13 }}>Add your first product to get started.</p>
          <button onClick={() => setModal({ open: true, product: null })} className="btn-primary"><Plus size={14} /> Add Product</button>
        </div>
      ) : (
        <div style={{ background: "#FAF3E8", border: "1px solid rgba(62,47,47,0.09)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#EAD8C0" }}><TH>Product</TH><TH>Category</TH><TH>Price</TH><TH>Stock</TH><TH>Featured</TH><TH>Actions</TH></tr></thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p._id} style={{ borderTop: "1px solid rgba(62,47,47,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(234,216,192,0.18)" }}>
                    <td style={{ padding: "12px 18px" }}>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, color: "#3E2F2F", margin: 0 }}>{p.name}</p>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#A89080", margin: "2px 0 0", maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.description}</p>
                    </td>
                    <td style={{ padding: "12px 18px" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", padding: "3px 10px", borderRadius: 50, fontSize: 10, fontWeight: 600, background: "#EAD8C0", color: "#7A6060", letterSpacing: "0.06em", textTransform: "uppercase" }}>{catLabel[p.category] || p.category}</span>
                    </td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: "#C97B63" }}>₹{p.price.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "12px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: p.stock < 5 ? "#B43C3C" : "#3E2F2F", fontWeight: p.stock < 5 ? 700 : 400 }}>{p.stock}</td>
                    <td style={{ padding: "12px 18px" }}>
                      {p.featured ? <span style={{ fontFamily: "'Poppins',sans-serif", padding: "3px 10px", borderRadius: 50, background: "rgba(201,123,99,0.12)", color: "#C97B63", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}>✦ YES</span> : <span style={{ color: "#EAD8C0", fontSize: 13 }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ display: "flex", gap: 7 }}>
                        <button onClick={() => setModal({ open: true, product: p })} style={{ padding: "6px 9px", borderRadius: 8, border: "none", background: "#EAD8C0", cursor: "pointer", color: "#7A6060" }}><Pencil size={13} /></button>
                        <button onClick={() => handleDelete(p._id)} style={{ padding: "6px 9px", borderRadius: 8, border: "none", background: "rgba(180,60,60,0.08)", cursor: "pointer", color: "#B43C3C" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal.open && <ProductModal product={modal.product} token={token} onClose={() => setModal({ open: false, product: null })} onSave={() => { setModal({ open: false, product: null }); fetchProducts(); }} />}
    </div>
  );
}
